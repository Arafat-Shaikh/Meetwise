import React, { RefObject } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react";

// interface FeaturesSectionProps {
//   featuresRef: RefObject<HTMLElement> | null;
// }

const FeaturesSection = () => {
  return (
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
            Everything you need to manage your services and delight your clients
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
            <h3 className="text-xl font-bold text-white mb-3">AI Assistant</h3>
            <p className="text-purple-100 flex-grow">
              Our AI helps clients choose the right services and answers their
              questions instantly.
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
              Upload your documents and our AI will use them to better assist
              your clients.
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
  );
};

export default FeaturesSection;
