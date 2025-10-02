"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";
import BackgroundStyles from "./_components/landing/background-styless";
import Navigation from "./_components/landing/navigation";
import HeroSection from "./_components/landing/hero-section";
import FeaturesSection from "./_components/landing/features-section";
import HowItWorksSection from "./_components/landing/how-it-works-section";
import PricingSection from "./_components/landing/pricing-section";
import TestimonialsSection from "./_components/landing/testimonials-section";
import CtaSection from "./_components/landing/cta-section";
import Footer from "./_components/landing/footer";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  // const featuresRef = useRef(null);
  // const heroRef = useRef(null);
  // const howItWorksRef = useRef(null);

  // const [hideNav, setHideNav] = useState(false);
  // const lastScrollYRef = useRef(0);

  // const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);
  const x = useRef(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeed(window.innerWidth < 768 ? 0.5 : 1);
    }
  }, []);

  useAnimationFrame((t, delta) => {
    if (!scrollContentRef.current) return;

    const scrollWidth = scrollContentRef.current.scrollWidth / 2;

    x.current += (delta * speed) / 16;
    const offset = x.current % scrollWidth;

    scrollContentRef.current.style.transform = `translateX(-${offset}px)`;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* background animation and styles */}
      <BackgroundStyles />
      {/* Navigation */}
      <Navigation scrolled={scrolled} />

      <main className="flex-1 pt-20">
        {/* Hero Section  */}
        <HeroSection />

        {/* Powerful features section */}

        <FeaturesSection />

        {/* how it works section  */}

        <HowItWorksSection />

        {/* pricing section  */}

        <PricingSection />

        {/* testimonials  */}

        <TestimonialsSection />

        {/* cta section  */}

        <CtaSection />
      </main>

      {/* Footer  */}

      <Footer />
    </div>
  );
};

export default Home;
