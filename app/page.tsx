"use client";

import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Clock } from "lucide-react";

const Home = () => {
  const session = useSession();
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const [hideNav, setHideNav] = useState(false);
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  console.log(session.data?.user);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* {"background animation"} */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600 via-blue-600 to-cyan-500" />
        {/* main gradient background  */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-violet-600 via-blue-600 to-cyan-500" /> */}
        {/* {"animated overlay"} */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]"
          style={{
            y: useTransform(smoothScrollProgress, [0, 1], ["0%", "30%"]),
          }}
        />
        {/* Subtle wave patter */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.652-1.1 2.782-2.752 3.112-4.83.33-2.077-.23-4.27-1.452-5.92C22.512 6.93 20.16 6.472 18.22 7.207c-1.94.734-3.332 2.465-3.723 4.43-.39 1.966.118 3.948 1.38 5.433.728.863 1.73 1.558 2.87 1.93zM19.307.003c.267-.003.536 0 .805.01 2.618.113 5.32 1.045 7.83 2.1 2.51 1.054 4.93 2.25 7.39 3.388.207.095.42.186.62.29 1.96 1.025 3.86 2.148 5.3 3.76 1.435 1.613 2.2 3.85 1.34 5.8-.442 1-1.22 1.81-2.15 2.4-1.047.667-2.282 1.02-3.525 1.09-2.4.14-4.8-.6-7.14-1.48-2.345-.88-4.65-1.9-7.026-2.717-1.222-.42-2.486-.772-3.764-.9-1.278-.13-2.614-.06-3.75.5-1.304.64-2.17 1.95-2.455 3.28-.285 1.33-.046 2.677.543 3.906.59 1.228 1.482 2.295 2.496 3.22 1.92 1.75 4.25 2.997 6.767 3.57 2.516.573 5.2.5 7.59-.477 1.298-.533 2.486-1.285 3.575-2.13 1.09-.845 2.063-1.78 2.94-2.797 1.752-2.035 2.974-4.496 3.11-7.08.134-2.584-.855-5.27-2.97-6.96-1.873-1.5-4.34-2.164-6.747-2.43-2.407-.267-4.836-.186-7.186.305-1.753.367-3.453.97-5.118 1.65-1.665.68-3.324 1.44-5.06 1.884-1.735.443-3.566.587-5.198-.17-1.63-.757-2.8-2.443-2.86-4.22-.06-1.776.916-3.53 2.598-4.5 1.68-.97 3.9-1.17 5.845-.7 1.945.47 3.69 1.44 5.37 2.4 1.68.96 3.332 1.91 5.12 2.53 1.788.62 3.702.9 5.47.51 1.767-.38 3.324-1.42 4.025-3.08.35-.83.43-1.72.33-2.59-.1-.87-.37-1.7-.77-2.47-.84-1.55-2.13-2.73-3.57-3.62-1.43-.9-3-1.55-4.58-2.15-3.17-1.19-6.44-2.14-9.86-2.32-.51-.03-1.02-.04-1.53-.04z' fill='%23ffffff' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E\")",
            backgroundSize: "cover",
            y: useTransform(smoothScrollProgress, [0, 1], ["0%", "-20%"]),
          }}
        />

        {/* Subtle color shift overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-blue-500/0 to-cyan-500/20"
          style={{
            opacity: useTransform(
              smoothScrollProgress,
              [0, 0.5, 1],
              [0, 0.5, 0]
            ),
          }}
        />
      </div>

      {/* Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/10 backdrop-blur-md shadow-lg" : "bg-transparent"
        } `}
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: hideNav ? -100 : 0,
          opacity: hideNav ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent ">
                AppointAI
              </span>
            </motion.div>
            <motion.nav
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {["Features", "How It Works", "Pricing", "Testimonials"].map(
                (item, i) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`text-${
                        scrolled ? "gray-800" : "white"
                      } hover:text-blue-300 transition-colors`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                )
              )}
            </motion.nav>
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant={scrolled ? "secondary" : "outline"}
                className={`hidden bg-gray-300/50 text-gray-800 md:inline-flex border-white/20 ${
                  scrolled ? "" : ""
                } hover:bg-white/20`}
              >
                Log in
              </Button>
              <Button
                className={`bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white border-0 ${
                  scrolled ? "shadow-md" : "shadow-lg shadow-blue-500/30"
                } `}
              >
                Sign up
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 pt-20">
        {/* Hero Section  */}
        <section ref={heroRef} className="relative overflow-hidden pt-20 pb-32">
          <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28 relative z-10 ">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                    Smart Scheduling <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
                      Powered by AI
                    </span>
                  </h1>
                  <p className="mt-6 text-xl text-blue-100">
                    Streamline your booking process and enhance client
                    experience with our AI-powered scheduling platform.
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
                    className="group bg-white text-blue-700 hover:bg-blue-50 group relative overflow-hidden"
                  >
                    <span className="">Get Started</span>

                    <span className="absolute right-2 group-hover:right-1 duration-200 transition-all">
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Button>
                  <Button
                    size={"lg"}
                    variant={"outline"}
                    className="border-white text-black hover:bg-white/10"
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
                <div className="w-full max-w-lg rounded-2xl bg-white/10 backdrop-blur-md p-1 shadow-2xl">
                  <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 p-4 text-white">
                    <h3 className="text-xl font-semibold">
                      Welcome to your calendar!
                    </h3>
                    <p className="mt-1 text-blue-100">
                      Events that your customers book will appear here.
                    </p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-b-xl p-4">
                    <div className="mt-2 grid grid-cols-7 gap-2 text-center text-sm font-medium">
                      {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                        <div key={i} className="py-2 text-gray-500">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 7 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="rounded-lg border p-2 hover:bg-blue-50 cursor-pointer"
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
                      calendar
                      <motion.div
                        className="rounded-lg bg-blue-100 p-3 text-sm relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                        <div className="font-medium text-blue-800">
                          Consultation
                        </div>
                        <div className="text-blue-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> 10:00 AM - 11:00 AM
                        </div>
                      </motion.div>
                      <motion.div
                        className="rounded-lg bg-orange-100 p-3 text-sm relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                        <div className="font-medium text-orange-800">
                          Strategy Session
                        </div>
                        <div className="text-orange-600 flex items-center">
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
              <span className="text-white/70 text-sm mb-2">
                Scroll to explore
              </span>
              <ChevronDown className="h-6 w-6 text-white/70" />{" "}
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Home;
