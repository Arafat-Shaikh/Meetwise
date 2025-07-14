import { testimonials } from "@/lib/const";
import { AnimatePresence, easeIn, motion } from "framer-motion";
import { Quote, Star, TestTube2 } from "lucide-react";
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
import Headings from "./headings";

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
      }, 3500);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const getCurrentTestimonial = (offset: number = 0) => {
    const index =
      (currentIndex + offset + testimonials.length) % testimonials.length;
    return testimonials[index];
  };

  return (
    <div id="testimonials" className="min-h-screen">
      <motion.section
        className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/4 rounded-full bg-emerald-300 blur-2xl opacity-30"></div>
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
            <Headings
              heading="What Our Clients Say"
              subHeading="Don't just take our word for it. Here's what real customers have to say about their experience."
            />
          </motion.div>

          {/* testimonial layout  */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center text-white"
          >
            <>
              <motion.div
                className="absolute left-0 w-80 opacity-60 pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex} // ← use index instead of name
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      opacity: { duration: 0.8, ease: "easeOut" },
                      x: { duration: 0.8, ease: "easeOut" },
                    }}
                    className={`bg-white/8 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/20 ${""}`}
                  >
                    {true && (
                      <Quote className="w-6 h-6 text-emerald-300 mb-3" />
                    )}
                    <p
                      className={`text-white/70 ${"text-base"} leading-relaxed mb-4 line-clamp-3`}
                    >
                      {getCurrentTestimonial(1).text}
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src={getCurrentTestimonial(1).avatar}
                        alt={getCurrentTestimonial(1).name}
                        className={`${"w-12 h-12"} rounded-full object-cover ring-2 ring-emerald-400/50`}
                      />
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          {getCurrentTestimonial(1).name}
                        </h4>
                        <p className="text-emerald-200 text-xs">
                          {getCurrentTestimonial(1).role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div
                className="absolute right-0 w-80 opacity-60 pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex} // ← use index instead of name
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      opacity: { duration: 0.8, ease: "easeOut" },
                      x: { duration: 0.8, ease: "easeOut" },
                    }}
                    className={`bg-white/8 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/20 ${""}`}
                  >
                    {true && (
                      <Quote className="w-6 h-6 text-emerald-300 mb-3" />
                    )}
                    <p
                      className={`text-white/70 ${"text-base"} leading-relaxed mb-4 line-clamp-3`}
                    >
                      {getCurrentTestimonial(1).text}
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src={getCurrentTestimonial(1).avatar}
                        alt={getCurrentTestimonial(1).name}
                        className={`${"w-12 h-12"} rounded-full object-cover ring-2 ring-emerald-400/50`}
                      />
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          {getCurrentTestimonial(1).name}
                        </h4>
                        <p className="text-emerald-200 text-xs">
                          {getCurrentTestimonial(1).role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full max-w-2xl"
            >
              {/* next testimonial  */}
              <motion.div
                variants={backgroundCardVariants}
                className="absolute inset-0 transform translate-y-12 translate-x-2"
                style={{ zIndex: 2 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-emerald-400/20">
                  <div className="h-full opacity-50">
                    <Quote className="w-8 h-8 text-emerald-300 mb-4" />
                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                      {getCurrentTestimonial(4).text}
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={getCurrentTestimonial(4).avatar}
                        alt={getCurrentTestimonial(4).name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-400/50"
                      />
                      <div>
                        <h4 className="text-white font-semibold">
                          {getCurrentTestimonial(4).name}
                        </h4>
                        <p className="text-emerald-200 text-sm">
                          {getCurrentTestimonial(4).role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* main testimonial card  */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="relative z-10"
                  variants={mainCardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-emerald-400/30 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-teal-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      <Quote className="w-10 h-10 text-emerald-300 mb-6" />

                      <blockquote className="text-white text-xl md:text-2xl leading-relaxed mb-8 font-light">
                        "{getCurrentTestimonial().text}"
                      </blockquote>

                      <div className="flex items-center gap-4">
                        <motion.img
                          src={getCurrentTestimonial().avatar}
                          alt={getCurrentTestimonial().name}
                          className="w-16 h-16 rounded-full object-cover ring-3 ring-emerald-400/60"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        />
                        <div>
                          <h4 className="text-white text-lg font-semibold mb-1">
                            {getCurrentTestimonial().name}
                          </h4>
                          <p className="text-emerald-200">
                            {getCurrentTestimonial().role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="absolute transform bottom-0 left-1/2 -translate-x-1/2 translate-y-16 flex gap-3"
            >
              {Array.from({ length: testimonials.length }, (_, index) => (
                <motion.button
                  onClick={() => setCurrentIndex(index)}
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default TestimonialsSection;
