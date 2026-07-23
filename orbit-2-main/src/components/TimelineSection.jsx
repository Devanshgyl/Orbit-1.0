import React, { useEffect, useRef, useState } from 'react';

const DAY_1_EVENTS = [
  {
    code: 'SCHED // 01',
    time: '09:30 AM',
    title: 'Opening Ceremony & Inauguration',
    venue: 'Main Auditorium',
    category: 'CEREMONY',
    desc: 'Keynote addresses from tech visionaries and formal declaration of ORBIT summit.'
  },
  {
    code: 'SCHED // 02',
    time: '11:00 AM',
    title: 'AdWar: Pitch Battle Kickoff',
    venue: 'Seminar Hall A',
    category: 'DESIGN & MARKETING',
    desc: 'High-converting ad strategy war and 5-minute rapid pitch presentations.'
  },
  {
    code: 'SCHED // 03',
    time: '12:00 PM',
    title: 'Spin2Build: Hackathon 24H Sprint',
    venue: 'Tech Innovation Lab',
    category: 'DEVELOPMENT',
    desc: '24-hour overnight hackathon kickoff with random tech stack assignment.'
  },
  {
    code: 'SCHED // 04',
    time: '02:00 PM',
    title: 'Product Forge: Design Sprint',
    venue: 'Digital Design Studio',
    category: 'DESIGN & MARKETING',
    desc: '12-hour intensive UI/UX design sprint in Figma and Penpot.'
  },
  {
    code: 'SCHED // 05',
    time: '04:30 PM',
    title: 'Battlegrid: Esports Arena',
    venue: 'Cyber Gaming Hub',
    category: 'GAMING & CYBER',
    desc: 'Tactical shooter and battle royale championship qualifying rounds.'
  }
];

const DAY_2_EVENTS = [
  {
    code: 'SCHED // 06',
    time: '10:00 AM',
    title: 'Data Dive: AI Predictive Hack',
    venue: 'AI Research Center',
    category: 'DEVELOPMENT',
    desc: 'Machine learning model evaluation and high-dimensional data analytics.'
  },
  {
    code: 'SCHED // 07',
    time: '01:00 PM',
    title: 'Escape Room: Mainframe Breakout',
    venue: 'Cyber Security Lab',
    category: 'GAMING & CYBER',
    desc: 'Decipher encrypted ciphers and bypass simulated cyber mainframes.'
  },
  {
    code: 'SCHED // 08',
    time: '03:30 PM',
    title: 'Inkspire: Sci-Fi Lore Hackathon',
    venue: 'Library Lounge',
    category: 'CREATIVE',
    desc: 'Speculative science-fiction universe lore and creative world-building.'
  },
  {
    code: 'SCHED // 09',
    time: '05:00 PM',
    title: 'Hackathon Project Judging',
    venue: 'Tech Innovation Lab',
    category: 'EVALUATION',
    desc: 'Final demo submissions and 1-on-1 VC jury evaluations.'
  },
  {
    code: 'SCHED // 10',
    time: '06:30 PM',
    title: 'Grand Closing Ceremony & Awards',
    venue: 'Main Auditorium',
    category: 'CEREMONY',
    desc: 'Fireside closing keynote, $100k+ prize distribution, and valedictory.'
  }
];

export default function TimelineSection() {
  const [dayFilter, setDayFilter] = useState('ALL'); // 'ALL', 'DAY1', 'DAY2'
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

    setVisibleCards(new Set());

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
  }, [dayFilter, isMobile]);

  const isCardVisible = (cardId) => !isMobile || visibleCards.has(cardId);

  return (
    <section className="orbit-section timeline-section-darkened" id="timeline">
      <div className="timeline-bg-overlay" />
      <div className="section-container">
        {/* Header Title */}
        <div className="timeline-header-row">
          <div>
            <h2 className="section-title">2-DAY SCHEDULE TIMELINE</h2>
            <p className="section-description">
              Side-by-side chronological itinerary for Day 1 (Ignition) and Day 2 (Conquest).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="category-filter-bar">
            <button
              className={`filter-chip ${dayFilter === 'ALL' ? 'filter-chip--active' : ''}`}
              onClick={() => setDayFilter('ALL')}
            >
              BOTH DAYS
            </button>
            <button
              className={`filter-chip ${dayFilter === 'DAY1' ? 'filter-chip--active' : ''}`}
              onClick={() => setDayFilter('DAY1')}
            >
              DAY 1 (IGNITION)
            </button>
            <button
              className={`filter-chip ${dayFilter === 'DAY2' ? 'filter-chip--active' : ''}`}
              onClick={() => setDayFilter('DAY2')}
            >
              DAY 2 (CONQUEST)
            </button>
          </div>
        </div>

        {/* Dual Column Timeline Grid Container */}
        <div className="dual-timeline-container">
          {/* LEFT COLUMN: DAY 1 */}
          {(dayFilter === 'ALL' || dayFilter === 'DAY1') && (
            <div className="timeline-day-col">
              <div className="day-col-header">
                <div className="day-badge-wrap">
                  <span className="day-badge-num">DAY 01</span>
                  <span className="day-badge-title">IGNITION SPRINT</span>
                </div>
                <span className="day-date-tag">DAY 1 • IGNITION</span>
              </div>

              {/* Laser Track & Items */}
              <div className="timeline-track-wrapper">
                <div className="downward-laser-track">
                  <div className="laser-pulse-beam" />
                </div>

                <div className="timeline-cards-list">
                  {DAY_1_EVENTS.map((item, idx) => {
                    const cardId = `day1-${idx}`;
                    return (
                      <div
                        className={`dual-timeline-card ${isCardVisible(cardId) ? 'dual-timeline-card--visible' : ''}`}
                        key={cardId}
                        data-card-id={cardId}
                        ref={(node) => {
                          cardRefs.current[cardId] = node;
                        }}
                      >
                        {/* Pointer Circle Node that glows when downward laser passes it */}
                        <div className="track-node-circle" style={{ animationDelay: `${idx * 0.58 + 0.15}s` }} />

                        <div className="card-top-row">
                          <span className="time-chip">⏱️ {item.time}</span>
                          <span className="cat-chip">{item.category}</span>
                        </div>
                        <h3 className="card-event-title">{item.title}</h3>
                        <p className="card-event-desc">{item.desc}</p>
                        <div className="card-bottom-row">
                          <span className="venue-tag">📍 {item.venue}</span>
                          <span className="item-code">{item.code}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* RIGHT COLUMN: DAY 2 */}
          {(dayFilter === 'ALL' || dayFilter === 'DAY2') && (
            <div className="timeline-day-col">
              <div className="day-col-header">
                <div className="day-badge-wrap day-badge-wrap--alt">
                  <span className="day-badge-num">DAY 02</span>
                  <span className="day-badge-title">CONQUEST FINALE</span>
                </div>
                <span className="day-date-tag">DAY 2 • CONQUEST</span>
              </div>

              {/* Laser Track & Items */}
              <div className="timeline-track-wrapper">
                <div className="downward-laser-track">
                  <div className="laser-pulse-beam" />
                </div>

                <div className="timeline-cards-list">
                  {DAY_2_EVENTS.map((item, idx) => {
                    const cardId = `day2-${idx}`;
                    return (
                      <div
                        className={`dual-timeline-card ${isCardVisible(cardId) ? 'dual-timeline-card--visible' : ''}`}
                        key={cardId}
                        data-card-id={cardId}
                        ref={(node) => {
                          cardRefs.current[cardId] = node;
                        }}
                      >
                        {/* Pointer Circle Node that glows when downward laser passes it */}
                        <div className="track-node-circle" style={{ animationDelay: `${idx * 0.58 + 0.15}s` }} />

                        <div className="card-top-row">
                          <span className="time-chip">⏱️ {item.time}</span>
                          <span className="cat-chip">{item.category}</span>
                        </div>
                        <h3 className="card-event-title">{item.title}</h3>
                        <p className="card-event-desc">{item.desc}</p>
                        <div className="card-bottom-row">
                          <span className="venue-tag">📍 {item.venue}</span>
                          <span className="item-code">{item.code}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
