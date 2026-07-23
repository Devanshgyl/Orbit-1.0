import React, { useRef, useEffect, useState, useCallback } from 'react';

// ====== LAYER CONFIGURATIONS ======
const STAR_LAYERS = [
  { count: 150, sizeRange: [0.8, 1.5], opacityRange: [0.25, 0.6], twinkleChance: 0.3, colorSet: ['#ffffff', '#d8b4fe', '#a78bfa'], speed: 0.3 },
  { count: 100, sizeRange: [1.2, 2.5], opacityRange: [0.2, 0.5], twinkleChance: 0.5, colorSet: ['#ffffff', '#c084fc', '#818cf8'], speed: 0.6 },
  { count: 60,  sizeRange: [2, 3.5], opacityRange: [0.15, 0.4], twinkleChance: 0.7, colorSet: ['#e2d9ff', '#a78bfa', '#6366f1'], speed: 1.0 },
  { count: 30,  sizeRange: [3, 5], opacityRange: [0.1, 0.3], twinkleChance: 0.85, colorSet: ['#c084fc', '#818cf8', '#6366f1'], speed: 1.5 },
];

const SHOOTING_STAR_COUNT = 4;
const PARTICLE_COUNT = 50;

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateStars() {
  const all = [];
  STAR_LAYERS.forEach((layer, li) => {
    const rng = seededRand(li * 9999 + 1);
    for (let i = 0; i < layer.count; i++) {
      const size = layer.sizeRange[0] + rng() * (layer.sizeRange[1] - layer.sizeRange[0]);
      const color = layer.colorSet[Math.floor(rng() * layer.colorSet.length)];
      all.push({
        id: `s-${li}-${i}`,
        layer: li,
        x: rng() * 100,
        y: rng() * 100,
        size,
        opacity: layer.opacityRange[0] + rng() * (layer.opacityRange[1] - layer.opacityRange[0]),
        duration: 2 + rng() * 4,
        delay: -rng() * 8,
        color,
        twinkles: rng() < layer.twinkleChance,
      });
    }
  });
  return all;
}

function generateShootingStars() {
  const rng = seededRand(7777);
  return Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => ({
    id: `shoot-${i}`,
    x: rng() * 100,
    y: rng() * 30,
    duration: 3 + rng() * 4,
    delay: rng() * 15,
    angle: -30 + rng() * 15,
    length: 60 + rng() * 100,
    width: 1 + rng() * 1.5,
  }));
}

function generateParticles() {
  const rng = seededRand(8888);
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: `p-${i}`,
    x: rng() * 100,
    y: rng() * 100,
    size: 1.5 + rng() * 3,
    duration: 15 + rng() * 25,
    delay: -rng() * 30,
    driftX: -10 + rng() * 20,
    driftY: 10 + rng() * 30,
    opacity: 0.02 + rng() * 0.06,
  }));
}

const stars = generateStars();
const shootingStars = generateShootingStars();
const particles = generateParticles();

// ====== NEBULA SVG COMPONENT ======
function Nebula() {
  return (
    <div className="nebula-layer" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="nebula-svg">
        <defs>
          <filter id="nebula-blur"><feGaussianBlur stdDeviation="40" /></filter>
          <filter id="nebula-blur-2"><feGaussianBlur stdDeviation="80" /></filter>
          <filter id="nebula-blur-3"><feGaussianBlur stdDeviation="120" /></filter>
          <radialGradient id="nebula-glow-1" cx="30%" cy="25%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#6366f1" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula-glow-2" cx="70%" cy="70%" r="45%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#818cf8" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula-glow-3" cx="55%" cy="35%" r="40%">
            <stop offset="0%" stopColor="#e879f9" stopOpacity="0.08" />
            <stop offset="40%" stopColor="#c084fc" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula-glow-4" cx="20%" cy="80%" r="35%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#nebula-glow-1)" filter="url(#nebula-blur-2)" />
        <rect width="100%" height="100%" fill="url(#nebula-glow-2)" filter="url(#nebula-blur-2)" />
        <rect width="100%" height="100%" fill="url(#nebula-glow-3)" filter="url(#nebula-blur)" />
        <rect width="100%" height="100%" fill="url(#nebula-glow-4)" filter="url(#nebula-blur-3)" />
      </svg>
    </div>
  );
}

// ====== FLOATING PARTICLE (CSS driven) ======
function FloatingParticle({ particle, mousePos }) {
  return (
    <div
      className="floating-particle"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        opacity: particle.opacity,
        animationDuration: `${particle.duration}s`,
        animationDelay: `${particle.delay}s`,
        '--drift-x': `${particle.driftX}px`,
        '--drift-y': `${particle.driftY}px`,
      }}
    />
  );
}

// ====== MAIN COMPONENT ======
export default function StarField({ mousePos = { x: 0, y: 0 } }) {
  const trailRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced && trailRef.current) {
      trailRef.current.style.display = 'none';
    }
  }, []);

  return (
    <>
      <Nebula />
      <div className="star-field" aria-hidden="true" ref={trailRef}>
        {/* Deep layer stars */}
        {stars.map((star) => (
          <i
            key={star.id}
            className={`star${star.twinkles ? ' star--twinkle' : ''}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              backgroundColor: star.color,
              color: star.color,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              zIndex: star.layer,
            }}
          />
        ))}

        {/* Shooting stars */}
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="shooting-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              '--shoot-angle': `${star.angle}deg`,
              '--shoot-length': `${star.length}px`,
              '--shoot-width': `${star.width}px`,
            }}
          />
        ))}

        {/* Floating particles (respond to mouse gently) */}
        {particles.map((p) => (
          <FloatingParticle key={p.id} particle={p} mousePos={mousePos} />
        ))}

        {/* Cosmic dust overlay */}
        <div className="space-dust" />
      </div>
    </>
  );
}