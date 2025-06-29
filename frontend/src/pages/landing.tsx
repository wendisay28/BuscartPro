import { useEffect, useRef } from 'react';
import {
  CustomCursor,
  Navigation,
  HeroSection,
  Universe,
  ArtistCategories,
  ArtistsCarousel,
  CounterOffers,
  InteractiveMapSection,
  Footer,
  Gallery,
  HowItWorks,
  LandingCarousel
} from '@/components/landing';

export default function Home() {
  const artistsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
  }, []);

  const scrollToArtists = () => {
    if (artistsRef.current) {
      const rect = artistsRef.current.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        return; // Ya está visible
      }
    }
    artistsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white overflow-x-hidden font-space">
      <CustomCursor />
      <div className="scroll-progress"></div>
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Artists Carousel with How It Works */}
      <ArtistsCarousel />

      {/* Interactive Map Section */}
      <InteractiveMapSection />

      {/* Gallery Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <Gallery />
        </div>
      </section>

      {/* Counter Offers */}
      <section className="py-20 bg-gray-900">
        <CounterOffers />
      </section>

      {/* Universe Section with Impact Numbers */}
      <Universe />

      {/* Artist Categories */}
      <section ref={artistsRef} className="pb-0 bg-black">
        <ArtistCategories 
          onViewArtists={scrollToArtists}
        />
      </section>

      {/* Landing Carousel */}
      <section className="relative">
        <LandingCarousel />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
