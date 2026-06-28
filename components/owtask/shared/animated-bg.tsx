"use client";

import { useEffect, useRef } from "react";

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb-1 absolute -top-32 -left-32 w-125 h-125 rounded-full bg-linear-to-br from-amber-300/20 to-orange-400/10 blur-[100px]" />
      <div className="orb-2 absolute top-1/4 -right-20 w-100 h-100 rounded-full bg-linear-to-br from-emerald-300/15 to-teal-400/10 blur-[80px]" />
      <div className="orb-3 absolute -bottom-20 left-1/3 w-87.5 h-87.5 rounded-full bg-linear-to-br from-blue-300/10 to-violet-400/8 blur-[90px]" />
    </div>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient ring */}
      <svg
        className="float-slow absolute top-20 right-[15%] w-24 h-24 opacity-20"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="2"
          strokeDasharray="8 4"
        />
      </svg>

      {/* Dotted circle */}
      <svg
        className="float-medium absolute bottom-32 left-[10%] w-16 h-16 opacity-15"
        viewBox="0 0 60 60"
      >
        <circle
          cx="30"
          cy="30"
          r="25"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />
      </svg>

      {/* Small cross */}
      <svg
        className="float-fast absolute top-[40%] left-[5%] w-8 h-8 opacity-20"
        viewBox="0 0 24 24"
      >
        <line
          x1="12"
          y1="4"
          x2="12"
          y2="20"
          stroke="#F5A623"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="4"
          y1="12"
          x2="20"
          y2="12"
          stroke="#F5A623"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Triangle */}
      <svg
        className="float-slow absolute top-[60%] right-[8%] w-12 h-12 opacity-15"
        viewBox="0 0 40 40"
        style={{ animationDelay: "2s" }}
      >
        <polygon
          points="20,5 35,35 5,35"
          fill="none"
          stroke="#9C27B0"
          strokeWidth="1.5"
        />
      </svg>

      {/* Diamond */}
      <svg
        className="float-medium absolute top-[15%] left-[30%] w-6 h-6 opacity-20"
        viewBox="0 0 24 24"
        style={{ animationDelay: "1s" }}
      >
        <rect
          x="6"
          y="6"
          width="12"
          height="12"
          rx="1"
          fill="none"
          stroke="#2196F3"
          strokeWidth="1.5"
          transform="rotate(45 12 12)"
        />
      </svg>

      {/* Dots */}
      <svg
        className="float-fast absolute bottom-[20%] right-[25%] w-4 h-4 opacity-25"
        viewBox="0 0 16 16"
      >
        <circle cx="8" cy="8" r="3" fill="#F5A623" />
      </svg>
      <svg
        className="float-slow absolute top-[45%] right-[20%] w-3 h-3 opacity-20"
        viewBox="0 0 12 12"
        style={{ animationDelay: "3s" }}
      >
        <circle cx="6" cy="6" r="2.5" fill="#4CAF50" />
      </svg>
    </div>
  );
}

export function DotGrid() {
  return (
    <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
  );
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      const count = Math.min(
        40,
        Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 15000),
      );
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 166, 35, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245, 166, 35, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
