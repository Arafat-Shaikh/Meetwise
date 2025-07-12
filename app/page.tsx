"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import {
  hover,
  motion,
  useAnimationFrame,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  FileText,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import { howItWorksSteps, testimonials } from "@/lib/const";
import BackgroundStyles from "./_components/landing/background-styless";
import Navigation from "./_components/landing/navigation";
import HeroSection from "./_components/landing/hero-section";
import FeaturesSection from "./_components/landing/features-section";
import HowItWorksSection from "./_components/landing/how-it-works-section";
import PricingSection from "./_components/landing/pricing-section";
import TestimonialsSection from "./_components/landing/testimonials-section";
import CtaSection from "./_components/landing/cta-section";
import Footer from "./_components/landing/footer";
import AnimatedFeatureCards from "./background/_components/black-card";

const Home = () => {
  const session = useSession();

  const [scrolled, setScrolled] = useState(false);
  // const featuresRef = useRef(null);
  // const heroRef = useRef(null);
  // const howItWorksRef = useRef(null);

  const [hovered, setHovered] = useState(false);
  const testimonialsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const ctaRef = useRef(null);
  const [hideNav, setHideNav] = useState(false);
  const lastScrollYRef = useRef(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);
  const x = useRef(0);
  const speed =
    typeof window !== "undefined" && window.innerWidth < 768 ? 0.5 : 1;

  useAnimationFrame((t, delta) => {
    if (!scrollContentRef.current) return;

    const scrollWidth = scrollContentRef.current.scrollWidth / 2;

    x.current += (delta * speed) / 16;
    const offset = x.current % scrollWidth;

    scrollContentRef.current.style.transform = `translateX(-${offset}px)`;
  });

  // console.log(session.data?.user);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const lastY = lastScrollYRef.current;
          if (currentScrollY > lastY && currentScrollY > 100) {
            setHideNav(true);
          } else {
            setHideNav(false);
          }

          setScrolled(currentScrollY > 20);

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
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

        <TestimonialsSection
          setHovered={setHovered}
          testimonialsRef={testimonialsRef}
          scrollContentRef={scrollContentRef}
        />

        {/* cta section  */}

        <CtaSection />
      </main>

      {/* Footer  */}

      <Footer />
    </div>
  );
};

export default Home;
