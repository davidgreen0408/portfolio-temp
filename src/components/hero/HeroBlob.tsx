"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero 3D blob using vanilla Three.js (no R3F).
 * React Three Fiber uses a second reconciler and can hit "ReactCurrentOwner" errors
 * when multiple React copies exist or with React 19 + @react-three/fiber v8.
 */
export function HeroBlob() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.IcosahedronGeometry(1, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      metalness: 0.8,
      roughness: 0.18,
      emissive: 0xbe185d,
      emissiveIntensity: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(2.25);
    scene.add(mesh);

    const ringGeometry = new THREE.TorusGeometry(2.6, 0.045, 24, 140);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xf9a8d4,
      metalness: 0.92,
      roughness: 0.16,
      transparent: true,
      opacity: 0.7,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI * 0.24;
    ring.rotation.y = Math.PI * 0.12;
    scene.add(ring);

    const ring2 = ring.clone();
    ring2.scale.setScalar(0.88);
    ring2.material = ringMaterial.clone();
    (ring2.material as THREE.MeshStandardMaterial).opacity = 0.45;
    ring2.rotation.x = -Math.PI * 0.2;
    ring2.rotation.y = Math.PI * 0.38;
    scene.add(ring2);

    const ambient = new THREE.AmbientLight(0xffffff, 0.42);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.25);
    dir.position.set(4.5, 3.2, 4.8);
    scene.add(dir);
    const pinkPoint = new THREE.PointLight(0xec4899, 1.15, 24, 2);
    pinkPoint.position.set(-3.8, -2, 2.8);
    scene.add(pinkPoint);
    const accentPoint = new THREE.PointLight(0xfb7185, 0.9, 24, 2);
    accentPoint.position.set(3.2, 1.6, 2.2);
    scene.add(accentPoint);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: MouseEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    resize();
    mount.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mesh.rotation.x = t * 0.11 + pointer.y * 0.12;
      mesh.rotation.y = t * 0.19 + pointer.x * 0.18;
      mesh.rotation.z = Math.sin(t * 0.65) * 0.08;
      mesh.position.y = Math.sin(t * 1.15) * 0.13;
      mesh.scale.setScalar(2.2 + Math.sin(t * 1.2) * 0.07);
      ring.rotation.z += 0.0042;
      ring2.rotation.z -= 0.0034;
      ring.position.y = Math.sin(t * 1.25) * 0.08;
      ring2.position.y = -Math.sin(t * 1.1) * 0.09;
      pinkPoint.position.x = -3.8 + Math.cos(t * 1.2) * 0.9;
      pinkPoint.position.y = -2 + Math.sin(t * 1.55) * 0.75;
      pinkPoint.intensity = 0.95 + 0.45 * Math.sin(t * 1.8);
      accentPoint.position.x = 3.2 + Math.sin(t * 1.35) * 0.85;
      accentPoint.position.y = 1.6 + Math.cos(t * 1.45) * 0.6;
      accentPoint.intensity = 0.75 + 0.35 * Math.cos(t * 1.7);
      material.emissiveIntensity = 0.38 + 0.24 * Math.sin(t * 2.1);
      camera.position.x += (pointer.x * 0.45 - camera.position.x) * 0.055;
      camera.position.y += (-pointer.y * 0.3 - camera.position.y) * 0.055;
      camera.position.z = 5.3 + Math.sin(t * 0.85) * 0.18;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      (ring2.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div
        ref={mountRef}
        className="h-[min(70vw,520px)] w-[min(70vw,520px)] opacity-80 dark:opacity-100"
      />
    </div>
  );
}
