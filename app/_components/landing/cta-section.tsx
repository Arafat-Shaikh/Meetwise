import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  const text = "Ready to Transform Your Scheduling Experience?";
  const words = text.split(" ");
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-5 lg:px-8 relative z-10">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-tight overflow-hidden"
          >
            {words.map((word, index) => (
              <span
                key={index}
                className="inline-block overflow-hidden mr-3 lg:mr-4"
              >
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          {/* Elegant line separator */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "12rem", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: words.length * 0.08 + 0.5,
              ease: "easeInOut",
            }}
            className="h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-8"
          />

          {/* Subtle accent text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: words.length * 0.08 + 1,
              ease: "easeOut",
            }}
            className="text-slate-300 text-lg mt-6 mb-32 font-light tracking-wide"
          >
            Experience the future of productivity
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              size="default"
              className="group bg-emerald-600 rounded-full hover:bg-emerald-700 transition-all duration-300 text-white  group relative text-lg h-14 px-8"
            >
              <span className="relative z-10">Start Free Trial</span>

              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                whileInView={{ x: 0 }}
                whileHover={undefined}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="block group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </motion.span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 rounded-full bg-white/10 transition-all hover:text-white duration-500 text-white hover:bg-white/20 text-lg h-14 px-8"
            >
              Schedule a Demo
            </Button>
          </motion.div>
          <motion.p
            className="mt-8 text-sm text-blue-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            No credit card required. 14-day free trial.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
