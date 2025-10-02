import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { howItWorksSteps } from "@/lib/const";
import StepCard from "./step-card";
import Headings from "./headings";

const HowItWorksSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  return (
    <section
      id="how-it-works"
      className="min-h-screen py-20 px-4 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* done: need to create reusable component for headings */}
          <Headings
            heading="How It Works"
            subHeading="Get started in minutes and transform your scheduling experience"
          />
        </motion.div>

        <div className="relative">
          {/* desktop vertical line background  */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-40 w-1 bottom-40 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 -translate-x-0.5 rounded-full"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />
          {howItWorksSteps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
