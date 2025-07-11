import { testimonials } from "@/lib/const";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface TestimonialsSectionProps {
  testimonialsRef: RefObject<HTMLDivElement>;
  scrollContentRef: RefObject<HTMLDivElement>;
  setHovered: (value: boolean) => void;
}

import { Variants } from "framer-motion";

export const sideCardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 30,
  },
  visible: {
    opacity: 0.6,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const mainCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.9,
    rotateY: 15,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

export const backgroundCardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 20,
  },
  visible: {
    opacity: 0.3,
    scale: 0.9,
    y: 10,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const TestimonialsSection = ({
  testimonialsRef,
  scrollContentRef,
  setHovered,
}: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev: number) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const getCurrentTestimonial = (offset: number = 0) => {
    const index =
      (currentIndex + offset + testimonials.length) % testimonials.length;
    return testimonials[index];
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-emerald-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-teal-400 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-300 blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* heading  */}
        <motion.div
          className="text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-emerald-200 text-lg md:text-xl max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real customers have to
            say about their experience.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
