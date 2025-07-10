import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { howItWorksSteps } from "@/lib/const";
import StepCard from "./step-card";

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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <motion.div
            className="w-24 h-1 bg-emerald-400 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={headerInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Get started in minutes and transform your scheduling experience
          </p>
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
