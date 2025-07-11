import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl mb-4">
            Simple Pricing
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-800 via-emerald-400 to-emerald-800 mx-auto rounded-full mb-6"></div>
          <p className="mt-4 text-xl text-gray-100 max-w-3xl mx-auto">
            Choose the plan that works best for your business
          </p>
        </motion.div>

        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.2 }}
            whileHover={{
              y: -10,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            className="rounded-2xl bg-gradient-to-r from-white/20 to-emerald-500/20 border border-white/10 overflow-hidden flex flex-col"
          >
            <div className="p-8 flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
              <div className="flex items-baseline mt-4">
                <span className="text-5xl font-extrabold text-white">$19</span>
                <span className="ml-1 text-xl text-gray-200">/month</span>
              </div>
              <p className="mt-5 text-gray-200">
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
                    <Check className="h-5 w-5 text-emerald-400 mr-3" />
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-white/5 border-t border-white/10">
              <div className="w-full">
                <Button className="w-full bg-white text-black hover:bg-gray-50">
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
