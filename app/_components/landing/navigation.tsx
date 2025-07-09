import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface NavigationProps {
  scrolled: boolean;
  hideNav: boolean;
}

const Navigation = ({ scrolled, hideNav }: NavigationProps) => {
  const router = useRouter();
  return (
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
              Meetwise
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
              onClick={() => router.push("/dashboard")}
              variant={scrolled ? "secondary" : "outline"}
              className={`hidden bg-gray-100 text-gray-800 md:inline-flex border-white/20 ${
                scrolled ? "" : ""
              } hover:bg-gray-200`}
            >
              Log in
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              className={`bg-gradient-to-r from-gray-600 to-emerald-600 hover:from-gray-700 transition duration-300 hover:to-emerald-700 text-white border-0 ${
                scrolled ? "shadow-md" : "shadow-lg shadow-emerald-500/30"
              } `}
            >
              Sign up
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navigation;
