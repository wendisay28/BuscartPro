'use client';

import { useEffect } from 'react';
import {
  CustomCursor,
  Navigation,
  HeroSection,
  Universe,
  CounterOffers,
  InteractiveMapSection,
  Gallery,
  HowItWorks
} from '@/components/landing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden font-space">
      <CustomCursor />
      <div className="scroll-progress"></div>
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Universe Section */}
      <Universe />
      
      {/* Counter Offers */}
      <CounterOffers />
      
      {/* Interactive Map */}
      <InteractiveMapSection />
      
      {/* Gallery */}
      <Gallery />
    </div>
  );
}
