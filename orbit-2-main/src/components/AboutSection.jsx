import React, { useState } from 'react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('mission');

  const scrollToEvents = (e) => {
    e.preventDefault();
    const eventsElement = document.getElementById('events');
    if (eventsElement) {
      const headerOffset = 80;
      const elementPosition = eventsElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const cardsData = {
    mission: {
      badge: 'PILLAR // 01',
      headline: 'Empowering Next-Gen Tech Leaders',
      nodes: [
        {
          code: 'NODE.01',
          tag: 'INTERDISCIPLINARY',
          title: 'Cross-Domain Challenges',
          desc: 'Uniting global minds to engineer solutions spanning artificial intelligence, autonomous robotics, and web architecture.'
        },
        {
          code: 'NODE.02',
          tag: 'MENTORSHIP',
          title: 'Direct Industry Mentorship',
          desc: '1-on-1 guidance from tech pioneers, VC investors, and founder mentors shaping the future of deep tech.'
        },
        {
          code: 'NODE.03',
          tag: 'INCUBATION',
          title: 'National Talent Accelerator',
          desc: 'Catalyzing open-source breakthroughs with direct pipelines into the IITM Tech Hub incubator program.'
        },
        {
          code: 'NODE.04',
          tag: 'EXPOS',
          title: 'Robotics & Web3 Showcase',
          desc: 'Interactive demonstrations of autonomous hardware, AR/VR spatial rigs, and decentralized smart contracts.'
        }
      ]
    },
    vision: {
      badge: 'PILLAR // 02',
      headline: 'Shaping the Horizon of Innovation',
      nodes: [
        {
          code: 'NODE.01',
          tag: 'PARTICIPANTS',
          title: '2,500+ National Student Coders',
          desc: 'Uniting elite coders, designers, and visionaries from over 100+ top universities across India under one cosmic roof.'
        },
        {
          code: 'NODE.02',
          tag: 'PARTNERS',
          title: '50+ Tech Ecosystem Partners',
          desc: 'Backed by global technology leaders, developer collectives, research institutions, and media powerhouses.'
        },
        {
          code: 'NODE.03',
          tag: 'OPEN SOURCE',
          title: '100% Transparent Innovation',
          desc: 'Championing accessible digital assets, collaborative codebases, and open-source solutions for planetary impact.'
        },
        {
          code: 'NODE.04',
          tag: 'INFRASTRUCTURE',
          title: 'State-of-the-Art Prototyping Labs',
          desc: 'Full access to high-performance GPU clusters, 3D printing stations, server racks, and AI compute nodes.'
        }
      ]
    },
    why: {
      badge: 'PILLAR // 03',
      headline: 'Beyond Ordinary Tech Festivals',
      nodes: [
        {
          code: 'NODE.01',
          tag: 'REWARDS',
          title: '$100,000+ Prize Pool & Grants',
          desc: 'Compete for massive cash rewards, cloud infrastructure credits, hardware prototyping kits, and seed grants.'
        },
        {
          code: 'NODE.02',
          tag: 'MAINFRAME',
          title: '24-Hour Non-Stop Hackathon',
          desc: 'High-voltage coding sprints powered by midnight food trucks, cyber lounge gaming breaks, and live synthwave music.'
        },
        {
          code: 'NODE.03',
          tag: 'VISIONARIES',
          title: 'Live Keynotes & Founder Panels',
          desc: 'Fireside chats with founder legends, chief architects, and tech pioneers defining the next decade of technology.'
        },
        {
          code: 'NODE.04',
          tag: 'CAREERS',
          title: 'Instant Hiring & Credentials',
          desc: 'Direct recruitment pipelines, exclusive internship offers, and blockchain-verified digital certificates of accomplishment.'
        }
      ]
    }
  };

  const currentPillar = cardsData[activeTab] || cardsData.mission;

  return (
    <section className="orbit-section about-section-combined" id="about">
      <div className="section-container">
        {/* Header with clear spacing */}
        <div className="about-header-row">
          <h2 className="section-title">ABOUT US</h2>
          <p className="about-subtitle">
            REACHING FOR THE STARS <span className="subtitle-accent">together</span>
          </p>
        </div>

        {/* Unique Cyber Console Interface Container */}
        <div className="cyber-console-container">
          {/* Top HUD Laser Status Bar */}
          <div className="hud-status-bar">
            <div className="hud-status-left">
              <span className="hud-beacon-dot" />
              <span className="hud-beacon-text">ORBIT.SYS // SUMMIT OVERVIEW</span>
            </div>
            <div className="hud-status-right">
              <span className="hud-pill-tag">{currentPillar.badge}</span>
            </div>
          </div>

          {/* Console Grid Layout */}
          <div className="console-main-layout">
            {/* Left Control Column */}
            <div className="console-nav-col">
              <div className="console-headline">
                <h3>{currentPillar.headline}</h3>
              </div>

              <div className="console-tab-group">
                <button
                  className={`console-tab-btn ${activeTab === 'mission' ? 'console-tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('mission')}
                >
                  <span className="tab-num">01</span>
                  <span className="tab-text">OUR MISSION</span>
                  <span className="tab-arrow">→</span>
                </button>
                <button
                  className={`console-tab-btn ${activeTab === 'vision' ? 'console-tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('vision')}
                >
                  <span className="tab-num">02</span>
                  <span className="tab-text">OUR VISION</span>
                  <span className="tab-arrow">→</span>
                </button>
                <button
                  className={`console-tab-btn ${activeTab === 'why' ? 'console-tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('why')}
                >
                  <span className="tab-num">03</span>
                  <span className="tab-text">WHY ORBIT?</span>
                  <span className="tab-arrow">→</span>
                </button>
              </div>

              <div className="console-stats-card">
                <div className="stat-block">
                  <span className="stat-num">2,500+</span>
                  <span className="stat-lbl">Participants</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-block">
                  <span className="stat-num">$100K+</span>
                  <span className="stat-lbl">Prize Pool</span>
                </div>
              </div>

              <a href="#events" className="cta-button-glowing console-cta" onClick={scrollToEvents}>
                EXPLORE EVENTS →
              </a>
            </div>

            {/* Right Node Bento Grid */}
            <div className="console-node-grid">
              {currentPillar.nodes.map((node, idx) => (
                <div className="cyber-node-card" key={idx}>
                  <div className="node-hud-corner hud-tl" />
                  <div className="node-hud-corner hud-tr" />
                  <div className="node-hud-corner hud-bl" />
                  <div className="node-hud-corner hud-br" />

                  <div className="node-header">
                    <span className="node-code">{node.code}</span>
                    <span className="node-tag">{node.tag}</span>
                  </div>

                  <h4 className="node-title">{node.title}</h4>
                  <p className="node-desc">{node.desc}</p>

                  <div className="node-bottom-beam" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
