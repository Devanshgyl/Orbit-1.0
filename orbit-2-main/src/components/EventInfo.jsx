import React from 'react';

export default function EventInfo() {
  return (
    <div className="event-info">
      <div className="event-info-item">
        <span className="event-info-icon" aria-hidden="true">📅</span>
        <span className="event-info-text">1–2 September 2026</span>
      </div>
      <div className="event-info-divider" aria-hidden="true" />
      <div className="event-info-item">
        <span className="event-info-icon" aria-hidden="true">📍</span>
        <span className="event-info-text">Venue: TBA</span>
      </div>
      <div className="event-info-divider" aria-hidden="true" />
      <div className="event-info-item">
        <span className="event-info-icon" aria-hidden="true">👥</span>
        <span className="event-info-text">Open for All Students</span>
      </div>
    </div>
  );
}