import React from 'react';

const FOOTER_STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${(i * 17 + 5) % 92}%`,
  left: `${(i * 23 + 11) % 96}%`,
  size: `${(i % 3) * 0.8 + 1.2}px`,
  delay: `${(i * 0.35) % 3}s`,
  opacity: 0.3 + (i % 5) * 0.12,
}));

export default function Footer() {
  return (
    <footer className="orbit-footer">
      {/* Background Twinkling Footer Stars */}
      <div className="footer-star-field" aria-hidden="true">
        {FOOTER_STARS.map((star) => (
          <span
            key={star.id}
            className="footer-star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="brand">
              <div className="brand-logo-icon">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="16" stroke="url(#f-logo-1)" strokeWidth="1.5" />
                  <ellipse cx="20" cy="20" rx="18" ry="6" stroke="#c084fc" strokeWidth="1.8" transform="rotate(-30 20 20)" />
                  <circle cx="20" cy="20" r="4" fill="#a78bfa" />
                  <defs>
                    <linearGradient id="f-logo-1" x1="0" y1="0" x2="40" y2="40">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="brand-name">ORBIT</span>
            </div>
            <p className="footer-summary">
              ORBIT 2026 is India's premier cosmic technical & innovation summit hosted at IITM Janakpuri. Where ideas evolve into reality.
            </p>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
              <a href="https://discord.gg" target="_blank" rel="noreferrer" aria-label="Discord">Discord</a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-heading">QUICK NAVIGATION</h4>
            <ul className="footer-nav-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#timeline">Timeline</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#sponsors">Sponsors</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Location & Contact Column */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">CAMPUS LOCATION</h4>
            <p className="campus-address">
              📍 <strong>IITM Janakpuri Campus</strong><br />
              Institutional Area, D-Block, Janakpuri,<br />
              New Delhi - 110058
            </p>
            <p className="campus-contact">
              ✉️ <a href="mailto:orbit@orbit-iitm.ac.in">orbit@orbit-iitm.ac.in</a><br />
              📞 <a href="tel:+919876543210">+91 98765 43210</a>
            </p>
          </div>

          {/* Map Frame Column */}
          <div className="footer-col map-col">
            <h4 className="footer-heading">FIND US ON MAP</h4>
            <div className="map-wrapper">
              <iframe
                title="IITM Janakpuri Map"
                src="https://maps.google.com/maps?q=IITM+Janakpuri+New+Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="160"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="status-indicator">
            <span className="pulse-dot" />
            <span>SYS.STATUS // OPERATIONAL 🟢</span>
          </div>
          <div className="copyright-text">
            © 2026 ORBIT IITM Janakpuri. All Rights Reserved.
          </div>
          <a href="#home" className="back-to-top-btn">
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
