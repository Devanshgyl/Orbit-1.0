import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'events', label: 'EVENTS' },
  { id: 'timeline', label: 'TIMELINE' },
  { id: 'team', label: 'TEAM' },
  { id: 'sponsors', label: 'SPONSORS' },
  { id: 'faq', label: 'FAQ' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for glass effect
      setIsScrolled(currentScrollY > 20);

      // Hide/show navbar on scroll direction
      if (currentScrollY > 100) {
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 140;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileOpen]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileOpen(false);
    setActiveSection(targetId);

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'site-header--scrolled' : ''} ${!isVisible ? 'site-header--hidden' : ''}`}
      >
        <div className="header-container">
          {/* Brand Logo */}
          <a
            href="#home"
            className="brand"
            onClick={(e) => handleNavClick(e, 'home')}
            aria-label="Orbit home"
          >
            <div className="brand-logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="16" stroke="url(#logo-grad-1)" strokeWidth="1.5" opacity="0.6" />
                <ellipse cx="20" cy="20" rx="18" ry="6" stroke="url(#logo-grad-2)" strokeWidth="1.8" transform="rotate(-30 20 20)" />
                <circle cx="20" cy="20" r="4" fill="#a78bfa" className="pulse-core" />
                <circle cx="31" cy="14" r="2" fill="#7c3aed" />
                <defs>
                  <linearGradient id="logo-grad-1" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  <linearGradient id="logo-grad-2" x1="0" y1="40" x2="40" y2="0">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-name">ORBIT</span>
          </a>

          {/* Desktop Navigation Links (7 Tabs) */}
          <nav className="desktop-nav" aria-label="Main navigation">
            <ul className="nav-list">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="nav-item">
                    <a
                      href={`#${item.id}`}
                      className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                    >
                      {item.label}
                      {isActive && <span className="active-indicator" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Drawer Toggle Button */}
          <button
            className={`mobile-toggle ${isMobileOpen ? 'mobile-toggle--open' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            <span className="hamburger-bar bar-1" />
            <span className="hamburger-bar bar-2" />
            <span className="hamburger-bar bar-3" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-drawer-backdrop ${isMobileOpen ? 'mobile-drawer-backdrop--open' : ''}`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`mobile-drawer ${isMobileOpen ? 'mobile-drawer--open' : ''}`}
        aria-label="Mobile navigation drawer"
      >
        <div className="drawer-header">
          <a
            href="#home"
            className="brand brand--drawer"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <div className="brand-logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="16" stroke="url(#drawer-logo-grad)" strokeWidth="1.5" />
                <ellipse cx="20" cy="20" rx="18" ry="6" stroke="#c084fc" strokeWidth="1.8" transform="rotate(-30 20 20)" />
                <circle cx="20" cy="20" r="4" fill="#a78bfa" />
                <defs>
                  <linearGradient id="drawer-logo-grad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-name">ORBIT</span>
          </a>

          <button
            className="drawer-close-btn"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu drawer"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav className="drawer-nav">
          <ul className="drawer-nav-list">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <li
                  key={item.id}
                  className="drawer-nav-item"
                  style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                >
                  <a
                    href={`#${item.id}`}
                    className={`drawer-nav-link ${isActive ? 'drawer-nav-link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    <span className="drawer-item-number">0{index + 1}</span>
                    <span className="drawer-item-label">{item.label}</span>
                    {isActive && <span className="drawer-active-dot" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="drawer-footer">
          <a
            href="#register"
            className="drawer-cta-btn"
            onClick={(e) => handleNavClick(e, 'about')}
          >
            JOIN ORBIT 2026
          </a>
        </div>
      </aside>
    </>
  );
}