import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ParticleStyle = {
  left: string;
  top: string;
  opacity: number;
};

const HeroSection = () => {
  const router = useRouter();
  const [particleStyles, setParticleStyles] = useState<ParticleStyle[]>([]);
  const [largeParticleStyles, setLargeParticleStyles] = useState<
    ParticleStyle[]
  >([]);

  useEffect(() => {
    const styles = [...Array(120)].map(() => ({
      left: `${Math.random() * 60}%`,
      top: `${Math.random() * 60}%`,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const largeStyles = [...Array(20)].map(() => ({
      left: `${Math.random() * 55}%`,
      top: `${Math.random() * 55}%`,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    setParticleStyles(styles);
    setLargeParticleStyles(largeStyles);
  }, []);
  return (
    <section className="relative overflow-hidden pt-16 pb-32">
      {/* floating particles  */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particleStyles.map((style, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={style}
          />
        ))}
        {largeParticleStyles.map((style, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
            style={style}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-2 sm:py-20 sm:px-6 lg:px-8 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col sm:gap-y-10 justify-center">
            <div className="">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.1 }}
                className="text-5xl md:text-6xl font-semibold text-white tracking-wide leading-tight overflow-hidden relative"
                style={{ textShadow: `0 0 20px rgba(255,255,255,0.4)` }}
              >
                {["Smart Scheduling", "Powered by AI"].map((word, index) => (
                  <span
                    key={index}
                    className="inline-block overflow-hidden mr-3 lg:mr-4"
                  >
                    <motion.span
                      initial={{ y: "100%", opacity: 0 }}
                      whileInView={{ y: "0%", opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
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
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-neutral-300 mt-6 text-xl"
              >
                Streamline your booking process and enhance client experience
                with our AI-powered scheduling platform.
              </motion.p>
            </div>

            <motion.div
              className="sm:mt-10 flex flex-col sm:flex-row gap-4 mt-16 items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Button
                size={"lg"}
                onClick={() => router.push("/availability")}
                className="group bg-gradient-to-t from-white/70 via-white/80 max-w-sm to-white text-black hover:bg-opacity-90 transition-all duration-300 group relative overflow-hidden rounded-full hover:text-black"
              >
                <span className="font-semibold">Get Started</span>

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
                className="hover:bg-white/20 transition hover:text-white max-w-sm duration-300 text-white bg-gradient-to-tr from-neutral-200/10 shadow-lg to-neutral-200/30 rounded-full border-none"
              >
                See Demo
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-full max-w-lg rounded-2xl bg-white/10 backdrop-blur-md p-1 sm:mt-10 lg:mt-0 shadow-2xl space-y-1 shadow-white/10">
              <motion.div
                initial={{ opacity: 0, x: 40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="rounded-xl bg-gradient-to-br relative from-emerald-500 via-emerald-600 to-emerald-700 py-3 px-4 sm:p-4 text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-600 opacity-20" />
                <h3 className="text-xl font-semibold">
                  Welcome to your calendar!
                </h3>
                <p className="mt-1 text-neutral-100 leading-5 text-sm">
                  Events that your customers book will appear here.
                </p>
              </motion.div>
              <div className="bg-neutral-900 backdrop-blur-sm rounded-lg p-4">
                <div className="mt-2 grid grid-cols-7 gap-2 text-center text-sm font-medium">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                    <div key={i} className="py-2 text-gray-300">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 7 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="rounded-lg border-2 border-neutral-700 shadow-lg shadow-emerald-300/10 bg-neutral-800 text-white p-2 cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {i + 8}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <motion.div
                    className="rounded-lg text-gray-200 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 border-[1px] border-neutral-700/20 shadow-lg p-3 text-sm relative overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6,
                    }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    // transition={{
                    //   type: "spring",
                    //   stiffness: 400,
                    //   damping: 10,
                    // }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-emerald-50 opacity-10" />
                    <div className="font-medium tracking-wide">
                      Consultation
                    </div>
                    <div className=" flex items-center text-neutral-400 text-xs">
                      <Clock className="h-3 w-3 mr-1" /> 10:00 AM - 11:00 AM
                    </div>
                  </motion.div>
                  <motion.div
                    className="rounded-lg text-gray-200 bg-gradient-to-bl from-neutral-950 via-neutral-900 to-neutral-800 border-[1px] border-neutral-300/10 shadow-lg p-3 text-sm relative overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8,
                    }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-emerald-50 opacity-10" />
                    <div className="font-medium tracking-wide">
                      Strategy Session
                    </div>
                    <div className="flex items-center text-neutral-400 text-xs">
                      <Clock className="h-3 w-3 mr-1" /> 2:00 PM - 3:00 PM
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
