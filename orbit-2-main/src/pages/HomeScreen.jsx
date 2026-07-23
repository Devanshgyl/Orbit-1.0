import React, { useState, useCallback } from 'react';
import StarField from '../components/StarField';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EventsSection from '../components/EventsSection';
import TimelineSection from '../components/TimelineSection';
import TeamSection from '../components/TeamSection';
import SponsorsSection from '../components/SponsorsSection';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';

export default function HomeScreen() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    setMousePos({ x, y });
  }, []);

  return (
    <main className="orbit-page" onMouseMove={handleMouseMove}>
      <StarField mousePos={mousePos} />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <TimelineSection />
      <TeamSection />
      <SponsorsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}