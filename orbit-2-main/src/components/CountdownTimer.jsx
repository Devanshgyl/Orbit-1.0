import React, { useState, useEffect } from 'react';

// Event: 1 September 2026, 9:00 AM IST
const EVENT_START = new Date(2026, 8, 1, 9, 0, 0);
const EVENT_END = new Date(2026, 8, 2, 23, 59, 59);

function getTimeRemaining(now) {
  const diff = EVENT_START - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, expired: false };
}

function isEventLive(now) {
  return now >= EVENT_START && now <= EVENT_END;
}

function isEventEnded(now) {
  return now > EVENT_END;
}

const TimeUnit = ({ value, label }) => {
  const [flip, setFlip] = useState(false);
  const prevValue = React.useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlip(true);
      const timer = setTimeout(() => setFlip(false), 300);
      prevValue.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="countdown-unit">
      <div className={`countdown-value ${flip ? 'countdown-value--flip' : ''}`}>
        <span className="countdown-number" aria-live="polite" aria-label={`${value} ${label}`}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );
};

export default function CountdownTimer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeLeft = getTimeRemaining(now);
  const eventLive = isEventLive(now);
  const eventEnded = isEventEnded(now);

  if (eventEnded) {
    return (
      <div className="countdown-container countdown-container--ended">
        <div className="countdown-ended-message">
          <span className="countdown-ended-icon" aria-hidden="true">🎉</span>
          <span>Thank you for attending Orbit 1.0</span>
        </div>
      </div>
    );
  }

  if (eventLive) {
    return (
      <div className="countdown-container countdown-container--live">
        <div className="countdown-live-badge">
          <span className="countdown-live-dot" />
          <span>🚀 Orbit 1.0 is Live!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-container">
      <div className="countdown-header">
        <span className="countdown-header-dot" aria-hidden="true" />
        <span className="countdown-header-label">Event starts in</span>
      </div>
      <div className="countdown-grid">
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="countdown-separator" aria-hidden="true">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className="countdown-separator" aria-hidden="true">:</span>
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <span className="countdown-separator" aria-hidden="true">:</span>
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
}