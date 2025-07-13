"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Calendar,
  MessageCircle,
  FileText,
  BarChart3,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";
import Headings from "./headings";

const cardVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 1 * 0.2 },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, y: 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 2 * 0.2 },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, y: 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 1 * 0.2 },
    },
  },
  slideRight: {
    hidden: { opacity: 0, y: 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 4 * 0.2 },
    },
  },
  rotateFromLeft: {
    hidden: { opacity: 0, y: 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 5 * 0.2 },
    },
  },
  rotateIn: {
    hidden: { opacity: 0, y: 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 4 * 0.2 },
    },
  },
};

const animationTypes = [
  "fadeUp",
  "scaleIn",
  "slideLeft",
  "slideRight",
  "rotateFromLeft",
  "rotateIn",
];

const features = [
  {
    id: 1,
    title: "Smart Scheduling",
    description:
      "Set your availability and let clients book appointments that work for both of you.",
    icon: Calendar,
  },
  {
    id: 2,
    title: "AI Assistant",
    description:
      "Our AI helps clients choose the right services and answers their questions instantly.",
    icon: MessageCircle,
  },
  {
    id: 3,
    title: "Document Intelligence",
    description:
      "Upload your documents and our AI will use them to better assist your clients.",
    icon: FileText,
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description:
      "Gain insights into your business with detailed analytics and AI-powered recommendations.",
    icon: BarChart3,
  },
  {
    id: 5,
    title: "Availability Management",
    description:
      "Easily set and update your availability for different types of services.",
    icon: Clock,
  },
  {
    id: 6,
    title: "Client Management",
    description:
      "Keep track of client information and history to provide personalized service.",
    icon: Users,
  },
];

const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white/80 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      x: [0, Math.random() * 120 - 60],
      y: [0, Math.random() * 120 - 60],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 1,
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const headingWords = "Premium Features".split(" ");

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Premium black background with subtle white glows */}
      <div className="absolute inset-0">
        {/* Subtle animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.20]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <Headings
            heading="Premium Features"
            subHeading="Enterprise-grade solutions crafted for sophisticated business management"
          />
        </motion.div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const animationType = animationTypes[
              index
            ] as keyof typeof cardVariants;
            return (
              <motion.div
                key={feature.id}
                custom={index}
                variants={cardVariants[animationType]}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="group relative h-full"
                onHoverStart={() => setHoveredCard(feature.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Main Premium Card - All Same White Theme */}
                {true && (
                  <motion.div
                    className="relative h-full p-8 rounded-3xl backdrop-blur-2xl border border-white/10 bg-gradient-to-br from-gray-900/80 via-gray-900/40 to-gray-800/80 shadow-2xl shadow-white/10 overflow-hidden"
                    whileHover={{
                      y: index === 1 ? 0 : -2,
                      boxShadow: `0 25px 50px -12px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.1)`,
                      borderColor: "rgba(255,255,255,0.2)",
                      transition: { duration: 0.4, ease: "easeOut" },
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Premium white gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/2 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                    {/* Card every card: White Particle Effect */}
                    {hoveredCard === feature.id && (
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <FloatingParticle key={i} delay={i * 0.08} />
                        ))}
                      </div>
                    )}

                    {/* Premium Card Content - All White Theme */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Premium White Icon Container */}

                      <div className="flex-1">
                        <motion.div
                          className="inline-flex p-4 rounded-2xl mb-6 shadow-2xl border border-white/20 backdrop-blur-sm bg-gradient-to-br from-emerald-400/10 to-white/5"
                          style={{
                            boxShadow: `0 10px 30px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)`,
                          }}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.8,
                          }}
                          viewport={{ once: true }}
                        >
                          <Icon className="w-6 h-6 text-emerald-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                        </motion.div>

                        {/* Premium Typography */}
                        <motion.h3
                          className="text-2xl font-bold text-white mb-2 leading-tight tracking-tight"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 1,
                          }}
                          viewport={{ once: true }}
                        >
                          {feature.title}
                        </motion.h3>

                        <motion.p
                          className="text-gray-300 mb-10 leading-relaxed text-base font-light"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 1.2,
                          }}
                          viewport={{ once: true }}
                        >
                          {feature.description}
                        </motion.p>
                      </div>

                      {/* Premium White Button */}
                      <motion.button
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 1,
                          type: "spring",
                          stiffness: 60,
                          damping: 10,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className="inline-flex w-fit items-center gap-3 text-xs text-white font-semibold px-4 py-2 rounded-lg border border-white/20 shadow-xl bg-gradient-to-br from-white/10 to-white/5"
                        style={{
                          boxShadow: `0 8px 25px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)`,
                        }}
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
                {/* <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="text-7xl bg-gradient-to-tr from-purple-500 to-emerald-500 p-8 py-24 text-center rounded-3xl "
                >
                  hello
                </motion.div> */}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
