"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };

/** Canvas 2D particle drift — cheap complement to the 3D hero. */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas.parentElement ?? canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(80, Math.floor((clientWidth * clientHeight) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.5 + 0.15,
      }));
    };

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark ? "rgba(244,114,182,0.35)" : "rgba(236,72,153,0.2)";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
