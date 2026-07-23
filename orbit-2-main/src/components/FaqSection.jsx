import React, { useState } from 'react';

const FAQS_DATA = [
  { code: '01', tag: 'GENERAL', q: 'What is ORBIT 2026 and who can participate?', a: 'ORBIT 2026 is a national-level cosmic technical & innovation summit hosted at IITM Janakpuri. It is open to all undergraduate, postgraduate, and diploma students across India.' },
  { code: '02', tag: 'REGISTRATION', q: 'Are there any registration fees?', a: 'Registration for ORBIT 2026 is completely free for all events, hackathons, workshops, and speaker sessions.' },
  { code: '03', tag: 'TEAMS', q: 'How does team formation work?', a: 'You can register solo or in teams based on the event format. Solo participants can also find teammates through the official ORBIT Discord channels.' },
  { code: '04', tag: 'LOGISTICS', q: 'What facilities are provided on campus?', a: 'Participants in 24-hour hackathons receive meals, snacks, high-speed Wi-Fi, rest lounges, and power support throughout the event.' },
  { code: '05', tag: 'PRIZES', q: 'How are prizes and certificates awarded?', a: 'Winners receive rewards from the ₹2,00,000+ prize pool and sponsor grants, while verified participants receive digital certificates.' },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="orbit-section orbit-section--alt" id="faq">
      <div className="faq-cosmic-blob faq-blob-1"></div>
      <div className="faq-cosmic-blob faq-blob-2"></div>

      <div className="section-container">
        <div className="faq-shell">
          <div className="faq-intro">
            <div className="faq-eyebrow">
              <span className="faq-eyebrow-dot" />
              <span>ORBIT 2026 // HELP DESK</span>
            </div>
            <h2 className="section-title faq-title">FAQ / NAV</h2>
            <p className="faq-subtitle">Quick answers for the event flow, registration, and campus experience.</p>
          </div>

          <div className="faq-stack">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = open === idx;
              return (
                <article key={idx} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                  <button
                    type="button"
                    className="faq-item-trigger"
                    onClick={() => setOpen(isOpen ? null : idx)}
                  >
                    <span className="faq-item-index">{faq.code}</span>
                    <span className="faq-item-main">
                      <span className="faq-item-tag">{faq.tag}</span>
                      <span className="faq-item-question">{faq.q}</span>
                    </span>
                    <span className={`faq-item-icon ${isOpen ? 'faq-item-icon--open' : ''}`}>+</span>
                  </button>

                  <div className={`faq-item-answer ${isOpen ? 'faq-item-answer--open' : ''}`}>
                    <p>{faq.a}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="faq-support-pill">
            <span className="faq-support-pill-dot" />
            <span>Still have questions?</span>
            <a href="mailto:support@orbit-iitm.ac.in">Contact the ORBIT crew</a>
          </div>
        </div>
      </div>
    </section>
  );
}
