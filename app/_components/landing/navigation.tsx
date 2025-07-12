import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

interface NavigationProps {
  scrolled: boolean;
}

const Navigation = ({ scrolled }: NavigationProps) => {
  const router = useRouter();
  return (
    <>
      {true && (
        <motion.div
          className={`fixed top-3.5 z-50 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 left-1/2 -translate-x-1/2  w-[95%] ${
            scrolled ? "max-w-3xl scale-98" : "max-w-4xl"
          }`}
          initial={{ y: 80, opacity: 0, x: "-50%" }}
          animate={{
            y: 0,
            opacity: 1,
            scale: scrolled ? 0.98 : 1,
            maxWidth: scrolled ? "768px" : "1024px",
            transition: { duration: 0.5 },
          }}
        >
          <div className="container mx-auto py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-hidden">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Meetvise
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
                          scrolled ? "gray-300" : "white"
                        } hover:text-gray-200 transition-colors`}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  )
                )}
              </motion.nav>
              <motion.div
                className="flex items-center space-x-4 justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  onClick={() => router.push("/dashboard")}
                  className={`hidden md:block bg-gradient-to-r from-gray-600 rounded-full opacity-80 to-emerald-600 hover:from-gray-700 transition duration-300 hover:to-emerald-700 text-white border-0 ${
                    scrolled ? "shadow-md" : "shadow-lg shadow-emerald-500/30"
                  } `}
                >
                  Sign up
                </Button>
                <div className="bg-transparent md:hidden border-0 hover:bg-transparent hover:text-gray-200 text-white transition cursor-pointer">
                  <Menu className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;
