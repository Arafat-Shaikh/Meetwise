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
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600 via-blue-600 to-cyan-500" />

      {/* Subtle wave patter */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: wave_image,
          backgroundSize: "cover",
          y: useTransform(smoothScrollProgress, [0, 1], ["0%", "-20%"]),
        }}
      />
    </div>
  );
};

export default BackgroundStyles;
