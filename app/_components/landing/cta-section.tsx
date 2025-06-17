import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-32 relative">
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
            Join thousands of professionals who are saving time and delighting
            clients with our AI-powered platform.
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
  );
};

export default CtaSection;
