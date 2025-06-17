import React from "react";
import { motion } from "framer-motion";
import { howItWorksSteps } from "@/lib/const";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl mb-4">
            How It Works
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
            Get started in minutes and transform your scheduling experience
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
          {/* connection line  */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hidden md:block "></div>
          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.step}
              className="text-center relative"
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <motion.div
                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-2xl font-bold shadow-lg relative z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {step.step}
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-blue-100 max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
