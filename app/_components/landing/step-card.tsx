import { howItWorksSteps } from "@/lib/const";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const StepCard = ({
  step,
  index,
}: {
  step: (typeof howItWorksSteps)[0];
  index: number;
}) => {
  const stepRef = useRef(null);
  const stepInView = useInView(stepRef, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  return (
    <div ref={stepRef} className="relative">
      {/* desktop layout  */}
      <div className="hidden md:block">
        {index !== 0 && (
          <div className="absolute left-1/2  -top-40 w-1 h-full bg-emerald-300/20 -translate-x-0.5" />
        )}

        {/*  line  */}

        {index !== 0 ||
          (index < howItWorksSteps.length - 1 && (
            <motion.svg
              className="absolute left-1/2 -translate-x-1/2 top-80 w-32 h-32 z-0"
              viewBox="0 0 128 128"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                stepInView
                  ? { pathLength: 1, opacity: 0.3 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              <motion.path
                d="M 64 0 Q 64 32 64 64 Q 64 96 64 128"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
              />
            </motion.svg>
          ))}

        <div
          className={`flex items-center min-h-[400px] ${
            isEven ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {/* white carrd  */}

          <motion.div
            className={`w-5/12 ${isEven ? "pr-16" : "pl-16"}`}
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            animate={
              stepInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isEven ? -100 : 100 }
            }
            transition={{ duration: 0.8, delay: index * 0.3 }}
          >
            <div className="bg-gray-50/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-100/50">
              {/* Icon */}
              <motion.div
                className="mb-6 inline-flex p-4 bg-emerald-100 rounded-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={
                  stepInView
                    ? { scale: 1, rotate: 0 }
                    : { scale: 0, rotate: -180 }
                }
                transition={{ duration: 0.6, delay: index * 0.3 + 0.2 }}
              >
                <step.icon className="w-8 h-8 text-emerald-600" />
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  stepInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
              >
                {step.title}
              </motion.h3>

              <motion.p
                className="text-gray-600 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  stepInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>

          {/* center circle  */}
          <motion.div
            className="w-2/12 flex justify-center z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              stepInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.6, delay: index * 0.3 + 0.1 }}
          >
            <motion.div
              className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {step.number}
            </motion.div>
          </motion.div>

          {/* <div className="w-5/12" /> */}
        </div>
      </div>

      {/* mobile layout  */}

      <div className="block md:hidden">
        <div className="flex flex-col items-center">
          {/* Number circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              stepInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 relative">
              {step.number}
            </div>
          </motion.div>

          {/* Connecting line from circle to content */}
          <motion.div
            className="w-0.5 h-8 bg-emerald-600"
            initial={{ scaleY: 0 }}
            animate={stepInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            style={{ transformOrigin: "top" }}
          />

          {/* Content Block */}
          <motion.div
            className="w-full max-w-sm mx-4"
            initial={{ opacity: 0, y: 30 }}
            animate={stepInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
          >
            <div className="bg-gray-100/90 backdrop-blur-sm rounded-lg p-6 shadow-md border border-emerald-100/50 relative text-pink-500">
              {/* Icon */}
              <motion.div
                className="mb-4 inline-flex p-2 bg-emerald-100 rounded-md"
                initial={{ scale: 0 }}
                animate={stepInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.6 }}
              >
                <step.icon className="w-5 h-5 text-emerald-600" />
              </motion.div>

              <motion.h3
                className="text-lg font-bold text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                animate={stepInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
              >
                {step.title}
              </motion.h3>

              <motion.p
                className="text-gray-600 text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={stepInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>

          {/* connecting line from content to next step */}
          {index < howItWorksSteps.length - 1 && (
            <motion.div
              className="w-0.5 h-12 bg-emerald-600"
              initial={{ scaleY: 0 }}
              animate={stepInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.9 }}
              style={{ transformOrigin: "top" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StepCard;
