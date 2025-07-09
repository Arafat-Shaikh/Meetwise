import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Clock } from "lucide-react";

// interface HeroSectionProps {
//   heroRef: RefObject<HTMLElement> | null;
// }

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28 relative z-10 ">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            className="flex flex-col sm:gap-y-10 justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-200 sm:text-6xl lg:text-7xl">
                Smart Scheduling <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-emerald-200">
                  Powered by AI
                </span>
              </h1>
              <p className="mt-6 text-xl text-blue-100">
                Streamline your booking process and enhance client experience
                with our AI-powered scheduling platform.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size={"lg"}
                className="group text-white border  bg-gradient-to-tr from-emerald-600 to-emerald-800 rounded-lg hover:bg-opacity-90 hover:text-gray-100 transition-all duration-300 group relative overflow-hidden shadow-xl shadow-emerald-500/20  border-emerald-600/40"
              >
                <span className="">Get Started</span>

                <motion.span
                  className="inline-block"
                  animate={{ x: 0 }}
                  initial={{ x: 0 }}
                  whileInView={{ x: 0 }}
                  whileHover={undefined}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="block group-hover:translate-x-1 transition-transform duration-200">
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </motion.span>
              </Button>
              <Button
                size={"lg"}
                variant={"outline"}
                className="hover:bg-white/20 transition rounded-xl border-gray-600 border hover:text-white duration-300 text-white bg-white/10"
              >
                See Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-full max-w-lg rounded-2xl bg-white/10 backdrop-blur-md p-1 shadow-2xl space-y-1 ">
              <div className="rounded-xl bg-gradient-to-br relative from-gray-800 via-gray-700 to-gray-600 p-4 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-600 opacity-20" />
                <h3 className="text-xl font-semibold">
                  Welcome to your calendar!
                </h3>
                <p className="mt-1 text-blue-100">
                  Events that your customers book will appear here.
                </p>
              </div>
              <div className="bg-[#151a1d]/90 backdrop-blur-sm rounded-lg p-4">
                <div className="mt-2 grid grid-cols-7 gap-2 text-center text-sm font-medium">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                    <div key={i} className="py-2 text-gray-300">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 7 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="rounded-lg border-[3px] border-gray-900/90 bg-white/20 text-white p-2 hover:bg-blue-50 cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#EFF6FF",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {i + 8}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <motion.div
                    className="rounded-lg text-gray-200 bg-white/20 p-3 text-sm relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-t from-[#007f5f] to-[#007f5f]/10"></div>
                    <div className="font-medium">Consultation</div>
                    <div className=" flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> 10:00 AM - 11:00 AM
                    </div>
                  </motion.div>
                  <motion.div
                    className="rounded-lg text-gray-200 bg-white/20 p-3 text-sm relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-t from-[#007f5f] to-[#007f5f]/10"></div>
                    <div className="font-medium">Strategy Session</div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> 2:00 PM - 3:00 PM
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center"
        >
          <span className="text-white/70 text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
