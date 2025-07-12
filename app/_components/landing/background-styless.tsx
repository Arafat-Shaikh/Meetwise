import React from "react";
import { useTransform, motion, useSpring, useScroll } from "framer-motion";
import { wave_image } from "@/lib/const";

const BackgroundStyles = () => {
  const { scrollYProgress } = useScroll();

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div className="fixed inset-0 -z-10">
      {/* main gradient background  */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900 via-violet-800 to-violet-950" />
      <div className="absolute bg-[#151a1d] inset-0" />

      {/* Static White Particles - Top Left Area */}

      {/* Additional smaller particles for depth - Top Left Area */}
      {/* {[...Array(90)].map((_, i) => (
        <div
          key={`small-${i}`}
          className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 50}%`,
            top: `${Math.random() * 50}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
        />
      ))} */}

      {/* Larger accent particles - Top Left Area */}
      {/* {[...Array(40)].map((_, i) => (
        <div
          key={`large-${i}`}
          className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 55}%`,
            top: `${Math.random() * 55}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
        />
      ))} */}

      {/* <div className="absolute inset-0 pointer-events-none blur-2xl">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(110,231,183,0.2),_transparent_20%)]"></div>
      </div> */}

      {/* Subtle wave patter */}
      {/* <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: wave_image,
          backgroundSize: "cover",
          y: useTransform(smoothScrollProgress, [0, 1], ["0%", "-20%"]),
        }}
      /> */}
    </div>
  );
};

export default BackgroundStyles;
