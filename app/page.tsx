"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  FileText,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";

const howItWorksSteps = [
  {
    step: 1,
    title: "Create Your Profile",
    description:
      "Sign up and set up your provider profile with your services and expertise.",
  },
  {
    step: 2,
    title: "Set Your Availability",
    description:
      "Define when you're available for appointments and which services you offer.",
  },
  {
    step: 3,
    title: "Start Accepting Bookings",
    description:
      "Share your booking link with clients and let our AI assistant help them book.",
  },
];

const Home = () => {
  const session = useSession();
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const featuresRef = useRef(null);
  const heroRef = useRef(null);
  const testimonialsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const ctaRef = useRef(null);
  const [hideNav, setHideNav] = useState(false);
  const lastScrollYRef = useRef(0);

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  // console.log(session.data?.user);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const lastY = lastScrollYRef.current;
          if (currentScrollY > lastY && currentScrollY > 100) {
            setHideNav(true);
          } else {
            setHideNav(false);
          }

          setScrolled(currentScrollY > 20);

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* {"background animation"} */}
      <div className="fixed inset-0 -z-10">
        {/* main gradient background  */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600 via-blue-600 to-cyan-500" />

        {/* {"animated overlay"} */}
        {/* <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]"
          style={{
            y: useTransform(smoothScrollProgress, [0, 1], ["0%", "40%"]),
          }}
        /> */}
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
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 ${
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
                      } hover:text-gray-200 transition-colors`}
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
                className={`hidden bg-gray-100 text-gray-800 md:inline-flex border-white/20 ${
                  scrolled ? "" : ""
                } hover:bg-gray-200`}
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
      </motion.div>

      <main className="flex-1 pt-20">
        {/* Hero Section  */}
        <section ref={heroRef} className="relative overflow-hidden pt-20 pb-32">
          <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28 relative z-10 ">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -50 }}
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
                    className="border-blue-400 hover:bg-white/20 transition hover:text-white duration-300 text-white bg-white/10"
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
                  <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 p-4 text-white">
                    <h3 className="text-xl font-semibold">
                      Welcome to your calendar!
                    </h3>
                    <p className="mt-1 text-blue-100">
                      Events that your customers book will appear here.
                    </p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
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
              <ChevronDown className="h-6 w-6 text-white/70" />
            </motion.div>
          </motion.div>
        </section>

        {/* Powerful features section */}
        <section id="features" ref={featuresRef} className="py-32 relative">
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
                whileHover={{ y: -5 }}
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
                <div className="relative rounded-xl backdrop-blur-sm bg-white/10 p-8 h-full flex flex-col">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg ">
                    <Calendar className="h-7 w-7" />
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
                className="rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-xl p-8 h-full flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white">
                  <MessageSquare className="h-7 w-7" />
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

        {/* how it works section  */}

        <section
          id="how-it-works"
          ref={howItWorksRef}
          className="py-32 relative"
        >
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

        {/* pricing section  */}

        <section id="pricing" className="py-32 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white sm:text-5xl mb-4">
                Simple Pricing
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                Choose the plan that works best for your business
              </p>
            </motion.div>
            {/* <div className="grid grid-cols-1 gap-10 md:grid-cols-3"> */}
            {/* starter plan  */}
            {/* <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Starter
                  </h3>
                  <div className="flex items-baseline mt-4">
                    <span className="text-5xl font-extrabold text-white">
                      $19
                    </span>
                    <span className="ml-1 text-xl text-blue-200">/month</span>
                  </div>
                  <p className="mt-5 text-blue-100">
                    Perfect for individuals just getting started.
                  </p>

                  <ul className="mt-8 space-y-4">
                    {[
                      "Up to 50 appointments/month",
                      "Basic AI assistant",
                      "Email notifications",
                      "1 service type",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-blue-400 mr-3" />
                        <span className="text-blue-100">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-white/5 border-t border-white/10">
                  <div className="w-full">
                    <Button className="w-full bg-white text-blue-700 hover:bg-blue-50">
                      Get Started
                    </Button>
                  </div>
                </div>
              </motion.div> */}

            {/* pro plan  */}
            {/* <motion.div
                className="rounded-2xl relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl"></div>
                <div className="absolute inset-0.5 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl"></div>
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <div className="p-8 relative">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Professional
                  </h3>
                  <div className="flex items-baseline mt-4">
                    <span className="text-5xl font-extrabold text-white">
                      $49
                    </span>
                    <span className="ml-1 text-xl text-blue-200">/month</span>
                  </div>
                  <p className="mt-5 text-blue-100">
                    For growing businesses and professionals.
                  </p>
                  <ul className="mt-8 space-y-4">
                    {[
                      "Unlimited appointments",
                      "Advanced AI assistant",
                      "SMS notifications",
                      "5 service types",
                      "Document intelligence",
                      "Analytics dashboard",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-blue-300 mr-3" />
                        <span className="text-blue-100">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 relative border-t border-white/10">
                  <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 shadow-lg">
                    Get Started
                  </Button>
                </div>
              </motion.div> */}

            {/* enterprise plan  */}

            {/* <motion.div
                className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Enterprise
                  </h3>
                  <div className="flex items-baseline mt-4">
                    <span className="text-5xl font-extrabold text-white">
                      $99
                    </span>
                    <span className="ml-1 text-xl text-blue-200">/month</span>
                  </div>
                  <p className="mt-5 text-blue-100">
                    For larger teams and organizations.
                  </p>

                  <ul className="mt-8 space-y-4">
                    {[
                      "Unlimited everything",
                      "Custom AI training",
                      "Priority support",
                      "Unlimited service types",
                      "Advanced analytics",
                      "White labeling",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-blue-300 mr-3" />
                        <span className="text-blue-100">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-white/5 border-t border-white/10">
                  <Button className="w-full bg-white text-blue-700 hover:bg-blue-50">
                    Contact Sales
                  </Button>
                </div>
              </motion.div> */}
            {/* </div> */}

            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600  border border-white/10 overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Starter
                  </h3>
                  <div className="flex items-baseline mt-4">
                    <span className="text-5xl font-extrabold text-white">
                      $19
                    </span>
                    <span className="ml-1 text-xl text-blue-200">/month</span>
                  </div>
                  <p className="mt-5 text-blue-100">
                    Perfect for individuals just getting started.
                  </p>

                  <ul className="mt-8 space-y-4">
                    {[
                      "Up to 50 appointments/month",
                      "AI assistant",
                      "Email notifications",
                      "1 service type",
                      "Document intelligence",
                      "Analytics dashboard",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-blue-400 mr-3" />
                        <span className="text-blue-100">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-white/5 border-t border-white/10">
                  <div className="w-full">
                    <Button className="w-full bg-white text-blue-700 hover:bg-blue-50">
                      Get Started
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* testimonials  */}

        <section
          id="testimonials"
          ref={testimonialsRef}
          className="py-32 relative"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 1, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white sm:text-5xl mb-4">
                What Our Users Say
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                Join thousands of satisfied providers and clients
              </p>
            </motion.div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 ">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Life Coach",
                  initial: "S",
                  rating: 5,
                  testimonial:
                    "AppointAI has transformed my coaching business. The AI assistant helps my clients book the right sessions, and I love how it uses my uploaded materials to answer questions.",
                  style:
                    "bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30",
                },
                {
                  name: "Michael Chen",
                  role: "Financial Consultant",
                  initial: "M",
                  rating: 5,
                  testimonial:
                    "The analytics dashboard gives me incredible insights into my business. I can see which services are most popular and optimize my schedule accordingly.",
                  style:
                    "bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30",
                },
                {
                  name: "Jessica Williams",
                  role: "Fitness Trainer",
                  initial: "J",
                  rating: 5,
                  testimonial:
                    "My clients love how easy it is to book sessions with me. The availability management feature lets me offer different time slots for different types of training.",
                  style:
                    "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  className={`rounded-2xl backdrop-blur-sm p-8 h-full ${item.style} `}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-6">
                    <div
                      className={`h-14 w-14 rounded-full bg-gradient-to-r ${
                        i === 0
                          ? "from-pink-500 to-purple-500"
                          : i === 1
                          ? "from-blue-500 to-cyan-500"
                          : "from-amber-500 to-orange-500"
                      } flex items-center justify-center text-white font-bold text-xl shadow-lg `}
                    >
                      {item.initial}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-white">
                        {item.name}
                      </h4>
                      <p className="text-blue-200">{item.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-500 "
                      />
                    ))}
                  </div>
                  <p className="text-blue-100">{item.testimonial}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* cta section  */}

        <section ref={ctaRef} className="py-32 relative">
          <div className="container mx-auto px-4 sm:px-5 lg:px-8 relative z-10">
            <motion.div
              className="mx-auto max-w-4xl text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white sm:text-5xl mb-6">
                Ready to Transform Your Scheduling Experience?
              </h2>
              <p className="mt-6 text-xl text-blue-100 mb-10">
                Join thousands of professionals who are saving time and
                delighting clients with our AI-powered platform.
              </p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Button
                  size="lg"
                  className="group bg-white hover:bg-white text-blue-700  group relative text-lg h-14 px-8"
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
                  className="border-blue-400 bg-white/10 transition-all hover:text-white duration-500 text-white hover:bg-white/20 text-lg h-14 px-8"
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
      </main>

      {/* Footer  */}

      <footer className="relative bg-gradient-to-b from-blue-900/80 to-gray-900/90  text-gray-300 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-xl font-bold text-white">AppointAI</h3>
              <p className="mt-4">
                AI-powered scheduling platform for service providers and their
                clients.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Product</h4>
              <ul className="mt-4 space-y-2">
                {["Features", "Pricing", "Integrations", "FAQ"].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <Link href="#" className="hover:text-white">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <ul className="mt-4 space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <Link href="#" className="hover:text-white">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Legal</h4>
              <ul className="mt-4 space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item) => (
                    <motion.li key={item} whileHover={{ x: 5 }}>
                      <Link href="#" className="hover:text-white">
                        {item}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800/50 pt-8 text-center">
            <p>© {new Date().getFullYear()} AppointAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
