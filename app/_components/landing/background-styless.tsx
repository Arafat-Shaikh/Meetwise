import React from "react";
import { useTransform, motion, useSpring, useScroll } from "framer-motion";
import { wave_image } from "@/lib/const";

const BackgroundStyles = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute pointer-events-none bg-neutral-950 inset-0" />
    </div>
  );
};

export default BackgroundStyles;
