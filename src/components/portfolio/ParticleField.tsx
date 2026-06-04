import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleField() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current; if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    // Particle galaxy
    const count = 3500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00fff0");
    const ivory = new THREE.Color("#f0ede6");
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 1.6) * 8;
      const theta = Math.random() * Math.PI * 2;
      const branch = (i % 4) * ((Math.PI * 2) / 4);
      const spin = r * 0.6;
      positions[i * 3] = Math.cos(theta + branch + spin) * r + (Math.random() - 0.5) * 0.6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
      positions[i * 3 + 2] = Math.sin(theta + branch + spin) * r + (Math.random() - 0.5) * 0.6;
      const c = Math.random() > 0.5 ? cyan : ivory;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geom, mat);
    scene.add(points);

    // Floating wireframe icosahedron
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.4, 1),
      new THREE.MeshBasicMaterial({ color: "#00fff0", wireframe: true, transparent: true, opacity: 0.25 })
    );
    scene.add(ico);

    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.6;
      my = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0; const t0 = performance.now();
    const animate = () => {
      const t = (performance.now() - t0) * 0.001;
      points.rotation.y = t * 0.06;
      points.rotation.x = Math.sin(t * 0.2) * 0.1;
      ico.rotation.x = t * 0.3; ico.rotation.y = t * 0.4;
      camera.position.x += (mx * 2 - camera.position.x) * 0.04;
      camera.position.y += (-my * 2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geom.dispose(); mat.dispose(); ico.geometry.dispose(); (ico.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className="absolute inset-0 -z-10" />;
}