import React, { useEffect, useState, useRef, useCallback } from 'react';
import CountdownTimer from './CountdownTimer';
import EventInfo from './EventInfo';

// ====== ORBIT RINGS SVG ======
const OrbitRings = ({ className, front = false, mousePos = { x: 0, y: 0 } }) => (
  <svg
    className={className}
    aria-hidden="true"
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid meet"
    style={{
      transform: `rotate(-15deg) translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
      transition: 'transform 0.15s ease-out',
    }}
  >
    <defs>
      <linearGradient id="orbit-stroke-main" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#7d5cff" stopOpacity="0" />
        <stop offset="15%" stopColor="#8065ff" stopOpacity="0.3" />
        <stop offset="35%" stopColor="#a78bfa" stopOpacity="0.7" />
        <stop offset="50%" stopColor="#c084fc" stopOpacity="0.9" />
        <stop offset="65%" stopColor="#a78bfa" stopOpacity="0.7" />
        <stop offset="85%" stopColor="#8065ff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#7d5cff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="orbit-stroke-outer" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
        <stop offset="20%" stopColor="#818cf8" stopOpacity="0.2" />
        <stop offset="45%" stopColor="#a78bfa" stopOpacity="0.5" />
        <stop offset="50%" stopColor="#c084fc" stopOpacity="0.6" />
        <stop offset="55%" stopColor="#a78bfa" stopOpacity="0.5" />
        <stop offset="80%" stopColor="#818cf8" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
      </linearGradient>
      <filter id="orbit-glow"><feGaussianBlur stdDeviation="3" /></filter>
      <filter id="orbit-glow-soft"><feGaussianBlur stdDeviation="6" /></filter>
    </defs>
    <g fill="none">
      {/* Outer ring - slow continuous rotation simulated via CSS */}
      <ellipse cx="720" cy="465" rx="620" ry="180" stroke="url(#orbit-stroke-outer)" strokeWidth="1.2" opacity="0.5" className="orbit-ring orbit-ring--outer" />
      <ellipse cx="720" cy="465" rx="620" ry="180" stroke="#a78bfa" strokeWidth="4" opacity="0.08" filter="url(#orbit-glow-soft)" className="orbit-ring-glow" />
      {/* Middle ring */}
      <ellipse cx="720" cy="465" rx="510" ry="120" stroke="url(#orbit-stroke-main)" strokeWidth="1.8" opacity="0.8" className="orbit-ring orbit-ring--middle" />
      <ellipse cx="720" cy="465" rx="510" ry="120" stroke="#c084fc" strokeWidth="6" opacity="0.12" filter="url(#orbit-glow)" />
      {/* Inner ring */}
      <ellipse cx="720" cy="465" rx="380" ry="80" stroke="url(#orbit-stroke-outer)" strokeWidth="1" opacity="0.4" className="orbit-ring orbit-ring--inner" />
      <ellipse cx="720" cy="465" rx="380" ry="80" stroke="#818cf8" strokeWidth="3" opacity="0.06" filter="url(#orbit-glow-soft)" />
      {/* Orbiting satellite dots */}
      <circle cx="720" cy="465" r="3" fill="#c084fc" opacity="0.9" filter="url(#orbit-glow)">
        <animateMotion dur="12s" repeatCount="indefinite" path="M0,0 m-510,0 a510,120 0 1,1 1020,0 a510,120 0 1,1 -1020,0" />
      </circle>
      <circle cx="720" cy="465" r="2" fill="#818cf8" opacity="0.7" filter="url(#orbit-glow)">
        <animateMotion dur="18s" repeatCount="indefinite" path="M0,0 m-620,0 a620,180 0 1,0 1240,0 a620,180 0 1,0 -1240,0" />
      </circle>
      <circle cx="720" cy="465" r="1.5" fill="#a78bfa" opacity="0.6" filter="url(#orbit-glow)">
        <animateMotion dur="25s" repeatCount="indefinite" path="M0,0 m-380,0 a380,80 0 1,1 760,0 a380,80 0 1,1 -760,0" />
      </circle>
    </g>
  </svg>
);

// ====== REFINED PLANET ======
const Planet = () => (
  <div className="hero-planet-container" aria-hidden="true">
    <div className="hero-planet">
      <div className="planet-surface" />
      <div className="planet-atmosphere" />
      <div className="planet-core-glow" />
      <div className="planet-detail-ring ring-1" />
      <div className="planet-detail-ring ring-2" />
      <div className="planet-detail-ring ring-3" />
      <div className="planet-detail-ring ring-4" />
      <div className="planet-highlight" />
      <div className="planet-secondary-highlight" />
    </div>
  </div>
);

// ====== MINI SATELLITE ======
const Satellite = ({ className }) => (
  <div className={`satellite ${className}`} aria-hidden="true">
    <div className="satellite-body" />
    <div className="satellite-panel panel-1" />
    <div className="satellite-panel panel-2" />
    <div className="satellite-signal" />
  </div>
);

// ====== SCROLL INDICATOR ======
const ScrollIndicator = () => (
  <div className="scroll-indicator" aria-hidden="true">
    <div className="scroll-mouse">
      <div className="scroll-dot" />
    </div>
    <span className="scroll-label">SCROLL</span>
  </div>
);

// ====== MAGNETIC CTA BUTTON WITH RIPPLE ======
const CTAButton = ({ children, href, primary = false, onClick }) => {
  const btnRef = useRef(null);
  const [mouseInside, setMouseInside] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ripple, setRipple] = useState(null);

  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
    setOffset({ x, y });
  }, []);

  const handleClick = useCallback((e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y, id: Date.now() });
    setTimeout(() => setRipple(null), 600);
    if (onClick) onClick(e);
  }, [onClick]);

  return (
    <a
      ref={btnRef}
      href={href}
      className={`cta-button ${primary ? 'cta-button--primary' : 'cta-button--secondary'}`}
      onClick={handleClick}
      onMouseEnter={() => setMouseInside(true)}
      onMouseLeave={() => { setMouseInside(false); setOffset({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        transform: mouseInside ? `translate(${offset.x}px, ${offset.y}px) scale(1.02)` : '',
      }}
    >
      <span className="cta-button-text">{children}</span>
      <span className="cta-button-glow" />
      <span className="cta-button-border" aria-hidden="true" />
      {ripple && (
        <span
          className="cta-button-ripple"
          style={{ left: ripple.x, top: ripple.y }}
          aria-hidden="true"
        />
      )}
    </a>
  );
};

// ====== MAIN HERO SECTION ======
export default function HeroSection() {
  const [entered, setEntered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const planetRef = useRef(null);

  // Cinematic entrance sequence
  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  // Scroll handler for cinematic transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      const progress = Math.min(scrollY / heroHeight, 1);
      setScrolled(progress > 0.05);

      // Parallax on planet
      if (planetRef.current) {
        const moveY = -progress * 100;
        const scale = 1 - progress * 0.12;
        planetRef.current.style.transform = `translate(-50%, calc(-50% + ${moveY}px)) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEvents = (e) => {
    e.preventDefault();
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToAbout = (e) => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className={`hero-section ${scrolled ? 'hero-section--scrolled' : ''}`}
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background layers */}
      <div className="hero-bg-gradient" />
      <div className="hero-bg-radial" />

      {/* Orbit rings */}
      <OrbitRings className="orbit-rings orbit-rings--back" mousePos={mousePos} />
      <OrbitRings className="orbit-rings orbit-rings--front" mousePos={mousePos} front />

      {/* Planet */}
      <div
        className="planet-wrapper"
        ref={planetRef}
        style={{
          transform: `translate(-50%, -50%) translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
        }}
      >
        <Planet />
      </div>

      {/* Mini satellites */}
      <Satellite className="satellite-1" />
      <Satellite className="satellite-2" />

      {/* Hero content */}
      <div className={`hero-content ${entered ? 'hero-content--entered' : ''}`}>
        {/* Event badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span>AIEC Flagship Event 2026</span>
        </div>

        {/* Main title */}
        <h1 className="hero-title" aria-label="Orbit 1.0">
          <span className="hero-title-line">
            <span className="hero-title-word hero-title-word--orbit">Orbit</span>
            <span className="hero-title-word hero-title-word--version">1.0</span>
          </span>
        </h1>

        {/* Tagline */}
        <p className="hero-tagline">Where Ideas Evolve</p>

        {/* Description */}
        <p className="hero-description">
          A premier innovation and technology event where students, developers, designers,
          and creators converge to collaborate, compete, and build the future.
        </p>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Event Info */}
        <EventInfo />

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <CTAButton href="#register" primary onClick={scrollToEvents}>
            Register Now
          </CTAButton>
          <CTAButton href="#about" onClick={scrollToAbout}>
            Explore Events
          </CTAButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Ambient light rays */}
      <div className="light-rays" aria-hidden="true">
        <div className="light-ray ray-1" />
        <div className="light-ray ray-2" />
        <div className="light-ray ray-3" />
      </div>

      {/* Scroll transition gradient */}
      <div className="hero-scroll-transition" aria-hidden="true" />
    </section>
  );
}