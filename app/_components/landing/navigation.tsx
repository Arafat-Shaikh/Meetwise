import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

interface NavigationProps {
  scrolled: boolean;
}

const Navigation = ({ scrolled }: NavigationProps) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {true && (
        <motion.div
          className={`fixed top-3.5 z-50 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 left-1/2 -translate-x-1/2  w-[95%] ${
            scrolled ? "max-w-3xl scale-98" : "max-w-4xl"
          }`}
          initial={{ opacity: 0, x: "-50%" }}
          animate={{
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
                {/* <span className="mr-1 bg-black/5 rounded-full p-2">
                  <img src="/logo.png" alt="logo" className="w-10 h-6" />
                </span> */}

                <Link
                  href={"/"}
                  className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent"
                >
                  Meetvise
                </Link>
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
                      initial={{ opacity: 0, y: -20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, delay: i * 0.3 },
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{
                        scale: 0.95,
                        transition: { duration: 0.2 },
                      }}
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
                  className={`hidden md:block bg-gradient-to-t from-white/90 to-white text-black rounded-full opacity-80 hover:opacity-70 transition duration-300`}
                >
                  Sign up
                </Button>
                {/* Mobile menu button */}
                <div className="bg-transparent md:hidden border-0 hover:bg-transparent hover:text-gray-200 text-white transition cursor-pointer">
                  <Menu
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    onClick={() => setSidebarOpen(true)}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
      {/* Sidebar for mobile screens */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex bg-gradient-to-tr from-black/10 via-green-600/20 to-green-900/10 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            onClick={() => setSidebarOpen(false)}
          >
            <motion.aside
              className="bg-[#181c20]/95 w-full h-full shadow-2xl flex flex-col p-8 relative"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%", transition: { duration: 0.35 } }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                >
                  Meetvise
                </Link>
                <button
                  className="text-gray-400 hover:text-white text-2xl"
                  onClick={() => setSidebarOpen(false)}
                >
                  &times;
                </button>
              </div>

              {/* Menu Items */}
              <motion.nav
                className="flex flex-col gap-6 mt-4"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {["Features", "How It Works", "Pricing", "Testimonials"].map(
                  (item) => (
                    <motion.div
                      key={item}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-lg font-semibold text-white hover:text-blue-200 transition-colors px-2 py-2 rounded-lg"
                        onClick={() => setSidebarOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  )
                )}
              </motion.nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    router.push("/dashboard");
                  }}
                  className="relative mt-10 bg-gradient-to-t from-neutral-800/50 via-neutral-400/20 to-neutral-400/40 text-white rounded-full opacity-80 hover:opacity-70 transition duration-300 w-full text-lg font-semibold py-1"
                >
                  <div className="absolute inset-0 rounded-full blur-xs bg-emerald-200/20" />
                  Sign up
                </button>
              </motion.div>

              {/* Footer */}
              <div className="absolute bottom-6 left-0 w-full flex justify-center">
                <span className="text-xs text-gray-500">© 2025 Meetvise</span>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
