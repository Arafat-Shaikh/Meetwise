import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Headings from "./headings";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-32 relative">
      {/* checkpoint */}
      <div className="absolute inset-0 pointer-events-none blur-2xl">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(110,231,183,0.2),_transparent_50%)]"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5 }}
        >
          <Headings
            heading="Simple Pricing"
            subHeading="Choose the plan that works best for your business"
          />
        </motion.div>

        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl relative border-neutral-800 border-[2px] overflow-hidden flex flex-col bg-neutral-950 shadow-xl"
            style={{
              boxShadow: `0 10px 30px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)`,
            }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(240,253,244,0.9)_0%,_rgba(110,231,183,0.4)_25%,_transparent_45%)] blur-[60px] mix-blend-screen"></div>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(240,253,244,0.9)_0%,_rgba(110,231,183,0.4)_25%,_transparent_45%)] blur-[60px] mix-blend-screen"></div>
            </div>

            <div className="p-8 flex-1">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-xl font-semibold text-white mb-2"
              >
                Starter
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-baseline mt-4"
              >
                <span className="text-5xl font-extrabold text-white">$19</span>
                <span className="ml-1 text-xl text-gray-200">/month</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-5 text-gray-200"
              >
                Perfect for individuals just getting started.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mt-8 space-y-4"
              >
                {[
                  "Up to 50 appointments/month",
                  "AI assistant",
                  "Email notifications",
                  "1 service type",
                  "Document intelligence",
                  "Analytics dashboard",
                ].map((feature, index) => (
                  <motion.li
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    key={feature}
                    className="flex items-center"
                  >
                    <Check className="h-5 w-5 text-emerald-400 mr-3" />
                    <span className="text-gray-200">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <div className="p-6">
              <div className="w-full flex justify-center">
                <Button className="bg-gradient-to-t from-white/70 via-white/80 to-white text-black rounded-full hover:bg-gray-50 w-1/2 shadow-xl shadow-white/10">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
