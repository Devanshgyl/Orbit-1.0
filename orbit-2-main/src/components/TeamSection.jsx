import React, { useEffect, useMemo, useRef, useState } from 'react';

// Import team member images from assets
import komalImg from '../assets/komal-sharma.jpg';
import aditiImg from '../assets/aditi.jpg';
import falakImg from '../assets/teams/falak-ali.jpg';
import tanishImg from '../assets/teams/tanish.jpg';
import muskanImg from '../assets/teams/muskan.jpg';
import suhaniImg from '../assets/teams/suhani.jpg';
import lakshayImg from '../assets/teams/lakshay.jpeg';
import ashmeetImg from '../assets/teams/ashmeet.jpg';
import avniImg from '../assets/teams/avni.jpg';
import prakharImg from '../assets/teams/prakhar.jpg';
import shreyaImg from '../assets/teams/shreya.jpg';
import maninderImg from '../assets/teams/maninder.jpg';

const FACULTY = [
  { name: 'Ms. Komal Sharma', role: 'Faculty Coordinator', dept: 'Computer Science, IITM', code: 'FAC-01', accent: '#7c3aed', photo: komalImg },
  { name: 'Ms. Aditi Sharma', role: 'Faculty Coordinator', dept: 'Computer Science, IITM', code: 'FAC-02', accent: '#6366f1', photo: aditiImg },
];

const EXEC = [
  {
    name: 'Falak Ali',
    role: 'President',
    dept: 'Leadership Command',
    code: 'EXC-01',
    accent: '#c084fc',
    photo: falakImg,
    photoStyle: { transform: 'scale(1.5) translateX(0px)', transformOrigin: 'center 25%' }
  },
  {
    name: 'Tanish',
    role: 'Vice President',
    dept: 'Executive Command',
    code: 'EXC-02',
    accent: '#e879f9',
    photo: tanishImg,
    photoStyle: { transform: 'scale(1.35)', transformOrigin: 'center 80%' }
  },
];

const DEPT_HEADS = [
  {
    name: 'Muskan Kushwaha',
    role: 'Tech Head',
    dept: 'Technical & Web',
    code: 'DH-01',
    accent: '#818cf8',
    photo: muskanImg,
    photoStyle: { transform: 'scale(2.3) translateX(-3px)', transformOrigin: 'center 20%' }
  },
  {
    name: 'Lakshay',
    role: 'Graphics Head',
    dept: 'UI/UX & Brand Identity',
    code: 'DH-02',
    accent: '#6366f1',
    photo: lakshayImg,
    photoStyle: { transform: 'scale(1.35)', transformOrigin: 'center 20%' }
  },
  {
    name: 'Suhani',
    role: 'Content Head',
    dept: 'Copywriting & Creative',
    code: 'DH-03',
    accent: '#7c3aed',
    photo: suhaniImg,
    photoStyle: { transform: 'scale(1.35)', transformOrigin: 'center 60%' }
  },
  {
    name: 'Ashmeet',
    role: 'Social Media Head',
    dept: 'Digital Campaigns',
    code: 'DH-04',
    accent: '#e879f9',
    photo: ashmeetImg,
    photoStyle: { transform: 'scale(1.5)', transformOrigin: 'center 50%' }
  },
  {
    name: 'Avani',
    role: 'Event Management Head',
    dept: 'Events & Operations',
    code: 'DH-05',
    accent: '#a78bfa',
    photo: avniImg,
    photoStyle: { transform: 'scale(1.35)', transformOrigin: 'center 20%' }
  },
  {
    name: 'Prakhar',
    role: 'Management Head',
    dept: 'Logistics & Ops',
    code: 'DH-06',
    accent: '#c084fc',
    photo: prakharImg,
    photoStyle: { transform: 'scale(1.35)', transformOrigin: 'center 20%' }
  },
  {
    name: 'Shreya',
    role: 'Marketing Head',
    dept: 'Outreach & Brand',
    code: 'DH-07',
    accent: '#e879f9',
    photo: shreyaImg,
    photoStyle: { transform: 'scale(1.35)', transformOrigin: 'center 20%' }
  },
  {
    name: 'Maninder',
    role: 'Video Head',
    dept: 'Cinematics & Motion',
    code: 'DH-08',
    accent: '#818cf8',
    photo: maninderImg,
    photoStyle: { transform: 'scale(1.25)', transformOrigin: 'center 50%' }
  },
];

/* ── Orbit-themed Vertical Card Component ── */
function OrbitTeamCard({ member, cornerOrbit = 'right', isVisible = true, cardRef }) {
  return (
    <div
      ref={cardRef}
      className={`orbit-team-card ${isVisible ? 'orbit-team-card--visible' : ''}`}
      style={{ '--ha': member.accent }}
    >
      {/* Glossy Glass Reflection Overlay */}
      <div className="orbit-card-gloss-shine" />

      {/* Corner Orbit Lines SVG Graphic (Corner-anchored Partial Arcs with Neon Glow) */}
      <div className={`corner-orbit-lines corner-orbit-lines--${cornerOrbit}`}>
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="120" cy="120" r="110" stroke="currentColor" strokeWidth="1.8" strokeDasharray="8 6" opacity="0.65" />
          <circle cx="120" cy="120" r="80" stroke="currentColor" strokeWidth="2" opacity="0.8" />
          <circle cx="120" cy="120" r="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.55" />
          <circle cx="230" cy="120" r="5.5" fill="currentColor" opacity="1" className="orbit-node-dot" />
          <circle cx="120" cy="40" r="5" fill="currentColor" opacity="0.95" className="orbit-node-dot" />
          <circle cx="40" cy="120" r="5.5" fill="currentColor" opacity="1" className="orbit-node-dot" />
          <circle cx="176.5" cy="176.5" r="4.5" fill="currentColor" opacity="0.9" className="orbit-node-dot" />
        </svg>
      </div>

      {/* Top glowing laser line */}
      <div className="orbit-card-laser-top" />

      {/* Header Row: Code & Role badge */}
      <div className="orbit-card-top-row">
        <span className="orbit-card-code">{member.code}</span>
        <span className="orbit-card-role-badge">{member.role}</span>
      </div>

      {/* Profile Photo Box */}
      <div className="orbit-card-photo-box">
        <div className="orbit-card-photo-frame">
          <img
            src={member.photo}
            alt={member.name}
            className="orbit-card-photo-img"
            style={member.photoStyle}
          />
          <div className="orbit-card-photo-overlay" />
        </div>
      </div>

      {/* Card Info Box (Centered text for vertical cards) */}
      <div className="orbit-card-info-box">
        <h3 className="orbit-card-name">{member.name}</h3>

        <p className="orbit-card-dept">
          <span className="orbit-card-dept-icon">◈</span>
          {member.dept}
        </p>
      </div>

      {/* Bottom accent glow edge */}
      <div className="orbit-card-glow-edge" />
    </div>
  );
}

export default function TeamSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef({});

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)');
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener?.('change', handleChange);

    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setVisibleCards(new Set());
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const cardId = entry.target.dataset.cardId;
          setVisibleCards((prev) => {
            if (prev.has(cardId)) return prev;
            const next = new Set(prev);
            next.add(cardId);
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    Object.values(cardRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  const allMembers = useMemo(() => [...FACULTY, ...EXEC, ...DEPT_HEADS], []);

  return (
    <section className="orbit-section orbit-section--alt" id="team">
      <div className="section-container">
        <h2 className="section-title">COMMAND CREW</h2>
        <p className="section-description">
          The minds steering ORBIT 2026 — faculty board, executive command, and department leads.
        </p>

        {/* Faculty Advisory Board */}
        <div className="crew-tier">
          <div className="crew-tier-header">
            <div className="crew-tier-line" />
            <span className="crew-tier-label">FACULTY COORDINATOR</span>
            <div className="crew-tier-line" />
          </div>
          <div className="orbit-card-grid orbit-card-grid--2col">
            {FACULTY.map((m, i) => {
              const cardId = `faculty-${i}`;
              return (
                <div
                  key={cardId}
                  data-card-id={cardId}
                  ref={(node) => {
                    cardRefs.current[cardId] = node;
                  }}
                >
                  <OrbitTeamCard
                    member={m}
                    cornerOrbit={i % 2 === 0 ? 'right' : 'left'}
                    isVisible={!isMobile || visibleCards.has(cardId)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Executive Command */}
        <div className="crew-tier">
          <div className="crew-tier-header">
            <div className="crew-tier-line" />
            <span className="crew-tier-label">LEADERSHIP COMMAND</span>
            <div className="crew-tier-line" />
          </div>
          <div className="orbit-card-grid orbit-card-grid--2col">
            {EXEC.map((m, i) => {
              const cardId = `exec-${i}`;
              return (
                <div
                  key={cardId}
                  data-card-id={cardId}
                  ref={(node) => {
                    cardRefs.current[cardId] = node;
                  }}
                >
                  <OrbitTeamCard
                    member={m}
                    cornerOrbit={i % 2 === 0 ? 'left' : 'right'}
                    isVisible={!isMobile || visibleCards.has(cardId)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Department & Event Command */}
        <div className="crew-tier">
          <div className="crew-tier-header">
            <div className="crew-tier-line" />
            <span className="crew-tier-label">DEPARTMENT HEADS</span>
            <div className="crew-tier-line" />
          </div>
          <div className="orbit-card-grid orbit-card-grid--heads">
            {DEPT_HEADS.map((m, i) => {
              const cardId = `dept-${i}`;
              return (
                <div
                  key={cardId}
                  data-card-id={cardId}
                  ref={(node) => {
                    cardRefs.current[cardId] = node;
                  }}
                >
                  <OrbitTeamCard
                    member={m}
                    cornerOrbit={i % 2 === 0 ? 'right' : 'left'}
                    isVisible={!isMobile || visibleCards.has(cardId)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
