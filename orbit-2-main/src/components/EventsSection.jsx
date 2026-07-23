import React, { useState, useEffect, useRef } from 'react';

// Import event assets
import adwarImg from '../assets/adwar.jpg';
import spin2buildImg from '../assets/spin2build.png';
import productImg from '../assets/product.webp';
import battlegridImg from '../assets/battlegrid.jpeg';
import escapeImg from '../assets/escape.jpeg';
import datadiveImg from '../assets/datadive.webp';
import inkspireImg from '../assets/inkspire.jpg';

const EVENTS_DATA = [
  {
    id: 'adwar',
    code: 'EVT // 01',
    title: 'ADWAR',
    tagline: 'Advertising & Marketing War',
    category: 'DESIGN & MARKETING',
    teamSize: '2 – 4 Members',
    duration: '6 Hours',
    prizePool: '₹20,000',
    schedule: 'Day 1 • 11:00 AM - 5:00 PM',
    venue: 'Seminar Hall A',
    coordinator: 'AdWar Lead',
    email: 'adwar@orbit-iitm.ac.in',
    image: adwarImg,
    description: 'Craft high-converting pitch strategies, creative ad banners, and marketing campaigns under time constraints.',
    rules: ['Original assets only', 'Pitch presentation strictly 5 mins', 'Problem statement revealed on spot']
  },
  {
    id: 'spin2build',
    code: 'EVT // 02',
    title: 'SPIN2BUILD',
    tagline: 'Random Tech Stack Hackathon',
    category: 'DEVELOPMENT',
    teamSize: '1 – 4 Members',
    duration: '24 Hours',
    prizePool: '₹35,000',
    schedule: 'Day 1 • 12:00 PM to Day 2 • 12:00 PM',
    venue: 'Tech Innovation Lab',
    coordinator: 'Hackathon Lead',
    email: 'spin2build@orbit-iitm.ac.in',
    image: spin2buildImg,
    description: 'Spin the wheel of technology stacks! Build a functional prototype using randomly assigned tech stacks.',
    rules: ['Assigned stack must be strictly used', 'Open source code submission on GitHub', 'Live working demo required']
  },
  {
    id: 'product-forge',
    code: 'EVT // 03',
    title: 'PRODUCT FORGE',
    tagline: 'UI/UX & Product Design Sprint',
    category: 'DESIGN & MARKETING',
    teamSize: '1 – 3 Members',
    duration: '12 Hours',
    prizePool: '₹20,000',
    schedule: 'Day 1 • 10:00 AM - 10:00 PM',
    venue: 'Digital Design Studio',
    coordinator: 'Design Lead',
    email: 'forge@orbit-iitm.ac.in',
    image: productImg,
    description: 'Redesign complex product workflows into intuitive, futuristic digital user experiences using Figma.',
    rules: ['Figma / Penpot submission link required', 'Include design system & interactive prototype', 'Design rationale presentation']
  },
  {
    id: 'battlegrid',
    code: 'EVT // 04',
    title: 'BATTLEGRID',
    tagline: 'Esports & Gaming Championship',
    category: 'GAMING & CYBER',
    teamSize: '4 Members',
    duration: '1 Day',
    prizePool: '₹25,000',
    schedule: 'Day 1 • 10:30 AM onwards',
    venue: 'Cyber Gaming Hub',
    coordinator: 'Esports Lead',
    email: 'battlegrid@orbit-iitm.ac.in',
    image: battlegridImg,
    description: 'Battle out in intense tactical shooter & battle royale tournaments for ultimate gaming supremacy.',
    rules: ['BYOD or venue gaming rigs provided', 'Strict anti-cheat protocols', 'Single elimination bracket stage']
  },
  {
    id: 'escape-room',
    code: 'EVT // 05',
    title: 'ESCAPE ROOM',
    tagline: 'Cryptic Puzzles & Cyber Breakout',
    category: 'GAMING & CYBER',
    teamSize: '2 – 3 Members',
    duration: '3 Hours',
    prizePool: '₹15,000',
    schedule: 'Day 2 • 11:00 AM - 2:00 PM',
    venue: 'Cyber Security Lab',
    coordinator: 'Cyber Lead',
    email: 'escape@orbit-iitm.ac.in',
    image: escapeImg,
    description: 'Decipher encrypted ciphers, bypass simulated mainframes, and solve steganographic clues before time runs out.',
    rules: ['Internet access restricted to designated tools', 'No external devices allowed inside lab', 'Time-based leaderboard ranking']
  },
  {
    id: 'data-dive',
    code: 'EVT // 06',
    title: 'DATA DIVE',
    tagline: 'AI & Data Science Predictive Hack',
    category: 'DEVELOPMENT',
    teamSize: '1 – 3 Members',
    duration: '18 Hours',
    prizePool: '₹25,000',
    schedule: 'Day 1 • 2:00 PM to Day 2 • 8:00 AM',
    venue: 'AI Research Center',
    coordinator: 'AI Lead',
    email: 'datadive@orbit-iitm.ac.in',
    image: datadiveImg,
    description: 'Analyze real-world high-dimensional datasets, engineer machine learning pipelines, and predict trend vectors.',
    rules: ['Jupyter Notebook / Python codebase required', 'Model accuracy & F1 score evaluation', 'Clear data visualization dashboard']
  },
  {
    id: 'inkspire',
    code: 'EVT // 07',
    title: 'INKSPIRE',
    tagline: 'Sci-Fi Creative Writing & Lore',
    category: 'CREATIVE',
    teamSize: '1 – 2 Members',
    duration: '4 Hours',
    prizePool: '₹15,000',
    schedule: 'Day 2 • 2:00 PM - 6:00 PM',
    venue: 'Library Lounge',
    coordinator: 'Creative Lead',
    email: 'inkspire@orbit-iitm.ac.in',
    image: inkspireImg,
    description: 'Weave compelling cybernetic stories, futuristic universe lores, and speculative science-fiction narratives.',
    rules: ['Maximum 2,500 words', 'Theme prompt given at the venue', 'Evaluated on originality and world-building']
  }
];

// Inline dropdown detail panel for mobile
function MobileEventDropdown({ event }) {
  return (
    <div className="mobile-event-dropdown">
      <div className="mobile-dropdown-banner">
        <img src={event.image} alt={event.title} className="mobile-dropdown-img" />
        <div className="mobile-dropdown-overlay" />
        <span className="mobile-dropdown-prize">🏆 {event.prizePool} PRIZE</span>
      </div>
      <div className="mobile-dropdown-body">
        <p className="mobile-dropdown-desc">{event.description}</p>
        <div className="mobile-dropdown-specs">
          <span>👥 {event.teamSize}</span>
          <span>⏳ {event.duration}</span>
          <span>📅 {event.schedule}</span>
          <span>📍 {event.venue}</span>
        </div>
        <div className="mobile-dropdown-rules">
          <h5>KEY RULES</h5>
          <ul>
            {event.rules.map((rule, i) => (
              <li key={i}><span className="rule-bullet">›</span> {rule}</li>
            ))}
          </ul>
        </div>
        <a
          href={`mailto:${event.email}?subject=Register%20for%20${event.title}`}
          className="event-card-reg-btn mobile-dropdown-reg-btn"
        >
          <span>REGISTER NOW</span>
        </a>
      </div>
    </div>
  );
}

export default function EventsSection() {
  const [eventFilter, setEventFilter] = useState('ALL');
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [viewMode, setViewMode] = useState('deck'); // 'deck' or 'grid'
  const [selectedModalEvent, setSelectedModalEvent] = useState(null);

  // Mobile-only: which card index is expanded (-1 = none, auto-cycle resumes)
  const [mobileExpanded, setMobileExpanded] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const autoCycleRef = useRef(null);
  const followUpCycleRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileCycleIndexRef = useRef(0);

  const filteredEvents = eventFilter === 'ALL'
    ? EVENTS_DATA
    : EVENTS_DATA.filter(ev => ev.category === eventFilter);

  const currentEvent = filteredEvents[activeEventIndex] || filteredEvents[0] || EVENTS_DATA[0];

  const clearAutoCycleTimers = () => {
    if (autoCycleRef.current) {
      clearTimeout(autoCycleRef.current);
      clearInterval(autoCycleRef.current);
      autoCycleRef.current = null;
    }
    if (followUpCycleRef.current) {
      clearTimeout(followUpCycleRef.current);
      followUpCycleRef.current = null;
    }
  };

  const handleFilterChange = (cat) => {
    clearAutoCycleTimers();
    mobileCycleIndexRef.current = 0;
    setEventFilter(cat);
    setActiveEventIndex(0);
    setMobileExpanded(-1);
  };

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 720);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auto-cycle logic
  useEffect(() => {
    if (!isMobile) {
      clearAutoCycleTimers();
      autoCycleRef.current = setInterval(() => {
        setActiveEventIndex(prev => (prev + 1) % filteredEvents.length);
      }, 3000);

      return () => {
        clearAutoCycleTimers();
      };
    }

    if (mobileExpanded !== -1) {
      clearAutoCycleTimers();
      return;
    }

    const runCycle = (currentIdx) => {
      mobileCycleIndexRef.current = currentIdx;
      setActiveEventIndex(currentIdx);
      setMobileExpanded(currentIdx);

      autoCycleRef.current = setTimeout(() => {
        setMobileExpanded(-1);

        followUpCycleRef.current = setTimeout(() => {
          const nextIdx = (currentIdx + 1) % filteredEvents.length;
          mobileCycleIndexRef.current = nextIdx;
          runCycle(nextIdx);
        }, 600);
      }, 2500);
    };

    clearAutoCycleTimers();
    autoCycleRef.current = setTimeout(() => runCycle(mobileCycleIndexRef.current), 500);

    return () => {
      clearAutoCycleTimers();
    };
  }, [isMobile, mobileExpanded, eventFilter, filteredEvents.length]);

  // Handle mobile chip card click: toggle expand, pause auto-cycle
  const handleMobileChipClick = (idx) => {
    if (!isMobile) {
      setActiveEventIndex(idx);
      return;
    }
    clearAutoCycleTimers();
    const isOpening = mobileExpanded !== idx;
    if (isOpening) {
      setMobileExpanded(idx);
      setActiveEventIndex(idx);
      mobileCycleIndexRef.current = idx;
    } else {
      setMobileExpanded(-1);
      setActiveEventIndex(idx);
      mobileCycleIndexRef.current = (idx + 1) % filteredEvents.length;
    }
    // Scroll dropdown into view after it renders
    if (isOpening) {
      setTimeout(() => {
        if (dropdownRef.current) {
          dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  };

  return (
    <section className="orbit-section orbit-section--alt" id="events">
      <div className="section-container">
        {/* Header Title Row */}
        <div className="events-header-row">
          <div>
            <h2 className="section-title">FLAGSHIP EVENTS</h2>
            <p className="section-description">
              Select an event from the command deck or filter by domain.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="view-mode-bar">
            <button
              className={`mode-btn ${viewMode === 'deck' ? 'mode-btn--active' : ''}`}
              onClick={() => setViewMode('deck')}
            >
              🛰️ COMMAND DECK
            </button>
            <button
              className={`mode-btn ${viewMode === 'grid' ? 'mode-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⚡ BENTO MATRIX
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="category-filter-bar">
          {['ALL', 'DEVELOPMENT', 'DESIGN & MARKETING', 'GAMING & CYBER', 'CREATIVE'].map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${eventFilter === cat ? 'filter-chip--active' : ''}`}
              onClick={() => handleFilterChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* VIEW MODE 1: COMPACT HOLOGRAPHIC COMMAND DECK */}
        {viewMode === 'deck' && (
          <div className="holographic-deck-container">
            {/* Left Event Selector Rail */}
            <div className="deck-selector-rail">
              {filteredEvents.map((event, idx) => {
                const isActive = idx === activeEventIndex;
                const isMobileOpen = isMobile && mobileExpanded === idx;
                return (
                  <React.Fragment key={event.id}>
                    <div
                      className={`deck-chip-card ${isActive ? 'deck-chip-card--active' : ''} ${isMobileOpen ? 'deck-chip-card--mobile-open' : ''}`}
                      onClick={() => handleMobileChipClick(idx)}
                    >
                      <div className="chip-thumb-wrap">
                        <img src={event.image} alt={event.title} className="chip-thumb-img" />
                      </div>
                      <div className="chip-info">
                        <div className="chip-header">
                          <span className="chip-code">{event.code}</span>
                          <span className="chip-prize">🏆 {event.prizePool}</span>
                        </div>
                        <h4 className="chip-title">{event.title}</h4>
                        <p className="chip-category">{event.category}</p>
                      </div>
                      {isActive && <div className="chip-active-beam" />}
                    </div>

                    {/* Mobile dropdown: inline below the clicked card */}
                    {isMobile && isMobileOpen && (
                      <div ref={dropdownRef}>
                        <MobileEventDropdown event={event} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Right Stage (hidden on mobile, shown on desktop) */}
            <div className="deck-main-stage deck-main-stage--compact">

              {/* Banner Image Frame */}
              <div className="stage-banner-frame stage-banner-frame--compact">
                <img src={currentEvent.image} alt={currentEvent.title} className="stage-banner-img" />
                <div className="stage-banner-overlay" />
                <div className="stage-banner-badge">{currentEvent.category}</div>
                <div className="stage-prize-pill">🏆 {currentEvent.prizePool} PRIZE</div>
              </div>

              {/* Title & Tagline */}
              <div className="compact-title-row">
                <h3 className="stage-event-title">{currentEvent.title}</h3>
                <p className="stage-event-tagline">{currentEvent.tagline}</p>
              </div>

              <p className="stage-description">{currentEvent.description}</p>

              {/* Compact Inline Specs Bar */}
              <div className="stage-specs-strip">
                <div className="spec-item">
                  <span className="spec-icon">👥</span>
                  <span className="spec-val">{currentEvent.teamSize}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-icon">⏳</span>
                  <span className="spec-val">{currentEvent.duration}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-icon">📅</span>
                  <span className="spec-val">{currentEvent.schedule}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-icon">📍</span>
                  <span className="spec-val">{currentEvent.venue}</span>
                </div>
              </div>

              {/* Key Rules List */}
              <div className="stage-rules-box stage-rules-box--compact">
                <h5 className="rules-heading">KEY RULES</h5>
                <ul className="rules-list rules-list--compact">
                  {currentEvent.rules.map((rule, idx) => (
                    <li key={idx}>
                      <span className="rule-bullet">›</span> {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="stage-footer-actions">
                <a href={`mailto:${currentEvent.email}?subject=Register%20for%20${currentEvent.title}`} className="event-card-reg-btn stage-reg-btn">
                  <span>REGISTER NOW</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: BENTO MATRIX */}
        {viewMode === 'grid' && (
          <div className="bento-matrix-grid">
            {filteredEvents.map((event) => (
              <div className="bento-event-card" key={event.id}>

                <div className="bento-card-image-wrap">
                  <img src={event.image} alt={event.title} className="bento-card-img" />
                  <div className="bento-image-gradient" />
                  <div className="bento-card-top-badges">
                    <span className="bento-code">{event.code}</span>
                    <span className="bento-prize">🏆 {event.prizePool}</span>
                  </div>
                </div>

                <div className="bento-card-body">
                  <span className="bento-cat">{event.category}</span>
                  <h3 className="bento-title">{event.title}</h3>
                  <p className="bento-tagline">{event.tagline}</p>

                  <div className="bento-mini-specs">
                    <span>👥 {event.teamSize}</span>
                    <span>⏳ {event.duration}</span>
                    <span>📍 {event.venue}</span>
                  </div>

                  <div className="bento-footer">
                    <a
                      href={`mailto:${event.email}?subject=Register%20for%20${event.title}`}
                      className="event-card-reg-btn bento-reg-btn"
                    >
                      <span>REGISTER NOW</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Popup */}
      {selectedModalEvent && (
        <div className="modal-backdrop" onClick={() => setSelectedModalEvent(null)}>
          <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedModalEvent(null)}>
              ✕
            </button>
            <div className="modal-banner-wrap">
              <img src={selectedModalEvent.image} alt={selectedModalEvent.title} className="modal-banner-img" />
              <div className="modal-banner-gradient" />
            </div>
            <div className="modal-header">
              <span className="event-tag">{selectedModalEvent.category}</span>
              <h2>{selectedModalEvent.title}</h2>
              <p className="modal-tagline">{selectedModalEvent.tagline}</p>
            </div>
            <div className="modal-body">
              <p className="modal-desc">{selectedModalEvent.description}</p>
              <div className="modal-stats-grid">
                <div>
                  <strong>Prize Pool:</strong> {selectedModalEvent.prizePool}
                </div>
                <div>
                  <strong>Team Size:</strong> {selectedModalEvent.teamSize}
                </div>
                <div>
                  <strong>Duration:</strong> {selectedModalEvent.duration}
                </div>
                <div>
                  <strong>Schedule:</strong> {selectedModalEvent.schedule}
                </div>
                <div>
                  <strong>Venue:</strong> {selectedModalEvent.venue}
                </div>
                <div>
                  <strong>Coordinator:</strong> {selectedModalEvent.coordinator} ({selectedModalEvent.email})
                </div>
              </div>
              <div className="modal-rules">
                <h4>Rules & Guidelines:</h4>
                <ul>
                  {selectedModalEvent.rules.map((rule, idx) => (
                    <li key={idx}>✦ {rule}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <a href={`mailto:${selectedModalEvent.email}?subject=Register%20for%20${selectedModalEvent.title}`} className="event-card-reg-btn modal-reg-btn">
                <span>REGISTER NOW FOR {selectedModalEvent.title}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
