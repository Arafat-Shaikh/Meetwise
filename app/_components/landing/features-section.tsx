import React, { RefObject, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Clock,
  FileText,
  MessageCircle,
  MessageSquare,
  Users,
} from "lucide-react";
import { Sparkles } from "lucide-react";

// interface FeaturesSectionProps {
//   featuresRef: RefObject<HTMLElement> | null;
// }

const features = [
  {
    id: 1,
    title: "Smart Scheduling",
    description:
      "Set your availability and let clients book appointments that work for both of you.",
    icon: Calendar,
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderGradient: "from-blue-500 via-cyan-500 to-blue-500",
    glowColor: "shadow-blue-500/20",
    hoverGlow: "shadow-blue-500/60",
    accentColor: "blue",
  },
  {
    id: 2,
    title: "AI Assistant",
    description:
      "Our AI helps clients choose the right services and answers their questions instantly.",
    icon: MessageCircle,
    gradient: "from-purple-500/20 to-pink-500/20",
    borderGradient: "from-purple-500 via-pink-500 to-purple-500",
    glowColor: "shadow-purple-500/20",
    hoverGlow: "shadow-purple-500/60",
    accentColor: "purple",
  },
  {
    id: 3,
    title: "Document Intelligence",
    description:
      "Upload your documents and our AI will use them to better assist your clients.",
    icon: FileText,
    gradient: "from-pink-500/20 to-rose-500/20",
    borderGradient: "from-pink-500 via-rose-500 to-pink-500",
    glowColor: "shadow-pink-500/20",
    hoverGlow: "shadow-pink-500/60",
    accentColor: "pink",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description:
      "Gain insights into your business with detailed analytics and AI-powered recommendations.",
    icon: BarChart3,
    gradient: "from-amber-500/20 to-orange-500/20",
    borderGradient: "from-amber-500 via-orange-500 to-amber-500",
    glowColor: "shadow-amber-500/20",
    hoverGlow: "shadow-amber-500/60",
    accentColor: "amber",
  },
  {
    id: 5,
    title: "Availability Management",
    description:
      "Easily set and update your availability for different types of services.",
    icon: Clock,
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderGradient: "from-emerald-500 via-teal-500 to-emerald-500",
    glowColor: "shadow-emerald-500/20",
    hoverGlow: "shadow-emerald-500/60",
    accentColor: "emerald",
  },
  {
    id: 6,
    title: "Client Management",
    description:
      "Keep track of client information and history to provide personalized service.",
    icon: Users,
    gradient: "from-indigo-500/20 to-blue-500/20",
    borderGradient: "from-indigo-500 via-blue-500 to-indigo-500",
    glowColor: "shadow-indigo-500/20",
    hoverGlow: "shadow-indigo-500/60",
    accentColor: "indigo",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
    rotateX: -15,
    filter: "blur(10px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: index * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full opacity-60"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 3,
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

const FeaturesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  return (
    <>
      {false && (
        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white sm:text-5xl mb-4">
                Powerful Features
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                Everything you need to manage your services and delight your
                clients
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {/* card 1 */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-t from-black/50 to-white/90 opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
                <div className="relative rounded-xl backdrop-blur-sm bg-white/10 p-8 h-full flex flex-col">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-gray-500/10 to-black text-white shadow-lg ">
                    <motion.p
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <Calendar className="h-7 w-7" />
                    </motion.p>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Smart Scheduling
                  </h3>
                  <p className="text-blue-100 flex-grow">
                    Set your availability and let clients book appointments that
                    work for both of you.
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="mt-6 text-blue-200 flex items-center font-medium cursor-pointer"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>

              {/* card 2 */}
              <motion.div
                className="rounded-xl bg-gradient-to-tr from-black/90 to-white/10 border border-gray-100/20 shadow-xl p-8 h-full flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white">
                  <motion.p
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <MessageSquare className="h-7 w-7" />
                  </motion.p>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  AI Assistant
                </h3>
                <p className="text-purple-100 flex-grow">
                  Our AI helps clients choose the right services and answers
                  their questions instantly.
                </p>
                <motion.button
                  className="mt-6 py-2 px-4 rounded-lg bg-white/20 text-white flex items-center justify-center font-medium hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </motion.div>

              {/* card 3 */}

              <motion.div
                className="rounded-xl border-2 border-pink-500/50 p-8 h-full flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ borderColor: "rgba(236, 72, 153, 0.8)" }}
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-pink-500/20 text-pink-500">
                  <FileText className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Document Intelligence
                </h3>
                <p className="text-blue-100 flex-grow">
                  Upload your documents and our AI will use them to better
                  assist your clients.
                </p>
                <div className="mt-6 flex items-center">
                  <motion.div
                    className="text-pink-300 flex items-center font-medium cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>

              {/* card 4 */}
              <motion.div
                className="rounded-xl bg-white/5 border-t-4 border-amber-500 p-8 h-full flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center text-amber-500">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Analytics Dashboard
                </h3>
                <p className="text-blue-100 flex-grow">
                  Gain insights into your business with detailed analytics and
                  AI-powered recommendations.
                </p>
                <div className="mt-6 flex items-center">
                  <motion.div
                    className="text-amber-300 flex items-center font-medium cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>

              {/* card 5 */}
              <motion.div
                className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-8 h-full flex flex-col relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute -right-10 -top-10 text-emerald-500/10">
                  <Clock className="h-40 w-40" />
                </div>
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Clock className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Availability Management
                </h3>
                <p className="text-blue-100 flex-grow">
                  Easily set and update your availability for different types of
                  services.
                </p>
                <div className="mt-6 flex items-center">
                  <motion.div
                    className="text-emerald-300 flex items-center font-medium cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>

              {/* card 6 */}
              <motion.div
                className="rounded-xl bg-white/10 backdrop-blur-md p-8 h-full flex flex-col border-l-4 border-blue-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-blue-500/20 text-blue-100">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Client Management
                </h3>
                <p className="text-blue-100 flex-grow">
                  Keep track of client information and history to provide
                  personalized service.
                </p>
                <div className="mt-6 flex items-center">
                  <motion.div
                    className="text-blue-100 flex items-center font-medium cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
      <div className="min-h-screen bg-gradient-to-br bg-transparent relative overflow-hidden">
        {/* Enhanced background with animated elements */}
        <div className="absolute inset-0">
          {/* Animated background particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100],
                y: [0, Math.random() * 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              Powerful Features
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Everything you need to manage your business efficiently and
              provide exceptional client experiences.
            </motion.p>
          </motion.div>

          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="group relative h-full"
                  onHoverStart={() => setHoveredCard(feature.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  {/* Card 1: Running Border Animation */}
                  {index === 0 && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl p-[2px] opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `conic-gradient(from 0deg, #3b82f6, #06b6d4, #3b82f6, transparent, transparent, transparent, transparent, #3b82f6)`,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                      <div className="relative w-full h-full bg-gray-900/90 rounded-2xl" />
                    </motion.div>
                  )}

                  {/* Main Card */}
                  <motion.div
                    className={`relative h-full p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-br ${feature.gradient} ${feature.glowColor} shadow-2xl overflow-hidden`}
                    whileHover={{
                      y:
                        index === 0
                          ? -12
                          : index === 1
                          ? 0
                          : index === 2
                          ? -8
                          : index === 3
                          ? -10
                          : index === 4
                          ? -15
                          : -8,
                      transition: { duration: 0.4, ease: "easeOut" },
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Card 2: 3D Flip Effect */}
                    {index === 1 && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        initial={{ rotateY: 180, opacity: 0 }}
                        whileHover={{ rotateY: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="text-center text-white">
                          <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                          <p className="text-lg font-semibold">AI Powered</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Card 3: Particle Explosion Effect */}
                    {index === 2 && hoveredCard === feature.id && (
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 15 }).map((_, i) => (
                          <FloatingParticle key={i} delay={i * 0.1} />
                        ))}
                      </div>
                    )}

                    {/* Card 4: Liquid Morphing Background */}
                    {index === 3 && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60"
                        initial={{ scale: 0, borderRadius: "50%" }}
                        whileHover={{
                          scale: 1.5,
                          borderRadius: "20px",
                          background: [
                            "radial-gradient(circle, #f59e0b 0%, #ea580c 50%, #f59e0b 100%)",
                            "radial-gradient(circle, #ea580c 0%, #f59e0b 50%, #ea580c 100%)",
                            "radial-gradient(circle, #f59e0b 0%, #ea580c 50%, #f59e0b 100%)",
                          ],
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                          background: {
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          },
                        }}
                      />
                    )}

                    {/* Card 5: Holographic Effect */}
                    {index === 4 && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-80"
                        style={{
                          background:
                            "linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080, #ff8c00, #40e0d0)",
                          backgroundSize: "300% 300%",
                        }}
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        whileHover={{ opacity: 0.3 }}
                      />
                    )}

                    {/* Card 6: Magnetic Field Effect */}
                    {index === 5 && hoveredCard === feature.id && (
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-indigo-400 rounded-full"
                            initial={{
                              x: Math.random() * 300,
                              y: Math.random() * 200,
                              scale: 0,
                            }}
                            animate={{
                              x: 150,
                              y: 100,
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.1,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="relative z-10">
                      <motion.div
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.borderGradient.replace(
                          "via-",
                          "to-"
                        )} mb-6 shadow-lg`}
                        whileHover={{
                          scale:
                            index === 0
                              ? 1.2
                              : index === 1
                              ? [1, 1.1, 1]
                              : index === 2
                              ? 1.15
                              : index === 3
                              ? [1, 1.05, 1.1, 1]
                              : index === 4
                              ? 1.1
                              : 1.2,
                          rotate:
                            index === 0
                              ? [0, -5, 5, 0]
                              : index === 1
                              ? 360
                              : index === 2
                              ? [0, 10, -10, 0]
                              : index === 3
                              ? [0, 5, -5, 0]
                              : index === 4
                              ? [0, 180]
                              : [0, -10, 10, 0],
                          transition: {
                            duration:
                              index === 1 ? 0.6 : index === 4 ? 0.8 : 0.4,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <Icon className="w-7 h-7 text-white drop-shadow-lg" />
                      </motion.div>

                      <motion.h3
                        className="text-2xl font-bold text-white mb-4 transition-all duration-300"
                        whileHover={{
                          scale: 1.05,
                          color:
                            index === 0
                              ? "#3b82f6"
                              : index === 1
                              ? "#a855f7"
                              : index === 2
                              ? "#ec4899"
                              : index === 3
                              ? "#f59e0b"
                              : index === 4
                              ? "#10b981"
                              : "#6366f1",
                        }}
                      >
                        {feature.title}
                      </motion.h3>

                      <motion.p
                        className="text-gray-300 mb-8 leading-relaxed"
                        whileHover={{ color: "#ffffff" }}
                        transition={{ duration: 0.3 }}
                      >
                        {feature.description}
                      </motion.p>

                      <motion.button
                        className="inline-flex items-center gap-2 text-white font-medium px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                        whileHover={{
                          scale: 1.05,
                          gap: "12px",
                          boxShadow: `0 0 20px ${
                            feature.accentColor === "blue"
                              ? "#3b82f6"
                              : feature.accentColor === "purple"
                              ? "#a855f7"
                              : feature.accentColor === "pink"
                              ? "#ec4899"
                              : feature.accentColor === "amber"
                              ? "#f59e0b"
                              : feature.accentColor === "emerald"
                              ? "#10b981"
                              : "#6366f1"
                          }40`,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn more
                        <motion.div
                          whileHover={{ x: 5, rotate: 45 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.button>
                    </div>

                    {/* Enhanced hover glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${feature.borderGradient
                          .replace("from-", "")
                          .replace(" via-", ", ")
                          .replace(" to-", ", ")}, transparent 70%)`,
                        filter: "blur(20px)",
                      }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesSection;
