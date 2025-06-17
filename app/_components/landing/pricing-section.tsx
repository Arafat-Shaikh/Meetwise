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
              <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
              <div className="flex items-baseline mt-4">
                <span className="text-5xl font-extrabold text-white">$19</span>
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
  );
};

export default PricingSection;
