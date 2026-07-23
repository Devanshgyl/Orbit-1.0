import React, { useState, useEffect } from 'react';

const SPONSORS_DATA = [
  { name: 'Aether Dynamics', tier: 'TITLE SPONSOR', logo: '🌌' },
  { name: 'Cybernetix AI', tier: 'AI PARTNER', logo: '🤖' },
  { name: 'Nebula Labs', tier: 'VR & SPACE TECH', logo: '🛸' },
  { name: 'Quantum Core', tier: 'CYBERSECURITY', logo: '🔐' },
  { name: 'DevForge', tier: 'DEV TOOLS', logo: '🛠️' },
  { name: 'BlockWave', tier: 'WEB3 INFRASTRUCTURE', logo: '⛓️' },
  { name: 'SynthWave Media', tier: 'MEDIA PARTNER', logo: '📡' },
  { name: 'Nexus VR', tier: 'HARDWARE LABS', logo: '🥽' },
  { name: 'HackerEarth', tier: 'CODING PLATFORM', logo: '💻' },
  { name: 'DEV.to', tier: 'DEV COMMUNITY', logo: '👩‍💻' },
  { name: 'IITM Tech Hub', tier: 'INCUBATOR', logo: '🏛️' },
  { name: 'CodeChef', tier: 'PROGRAMMING PARTNER', logo: '⚡' },
];

export default function SponsorsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % SPONSORS_DATA.length);
    }, 1800); // Automatically highlights the next card every 1.8 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="orbit-section" id="sponsors">
      <div className="section-container">
        <h2 className="section-title">SPONSORS & TECH PARTNERS</h2>
        <p className="section-description">
          Backed by 12 industry leaders and technology visionaries empowering ORBIT 2026.
        </p>

        {/* Large outer showcase box containing small cards */}
        <div className="sponsors-showcase-box">
          <div className="sponsors-inner-grid">
            {SPONSORS_DATA.map((sponsor, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  className={`sponsor-stamp-tile ${isActive ? 'sponsor-stamp-tile--active' : ''}`}
                  key={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  {/* Background watermark emoji */}
                  <span className="stamp-watermark">{sponsor.logo}</span>
                  {/* Diagonal slash accent */}
                  <div className="stamp-slash-accent" />
                  {/* Content */}
                  <div className="stamp-content">
                    <span className="stamp-name">{sponsor.name}</span>
                    <span className="stamp-tier">{sponsor.tier}</span>
                  </div>
                  {/* Corner index */}
                  <span className="stamp-index">{String(idx + 1).padStart(2, '0')}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
