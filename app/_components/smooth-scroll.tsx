"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollSmoother);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2, // higher = slower scroll
      effects: true, // enable data-speed and other effects
    });

    return () => {
      smoother.kill(); // clean up on unmount
    };
  }, []);

  return null;
}
