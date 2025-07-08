import { testimonials } from "@/lib/const";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Dispatch, RefObject, SetStateAction } from "react";

interface TestimonialsSectionProps {
  testimonialsRef: RefObject<HTMLDivElement>;
  scrollContentRef: RefObject<HTMLDivElement>;
  setHovered: (value: boolean) => void;
}

const TestimonialsSection = ({
  testimonialsRef,
  scrollContentRef,
  setHovered,
}: TestimonialsSectionProps) => {
  return (
    <section id="testimonials" ref={testimonialsRef} className="py-32 relative">
      <div className="container overflow-hidden mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        <div className="space-y-8 overflow-hidden fade-mask">
          <div ref={scrollContentRef} className="flex gap-10">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-10">
                {testimonials.map((item, i) => (
                  <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    key={i}
                    className={`rounded-2xl backdrop-blur-sm px-8 py-7 border-blue-400 border min-w-[360px] whitespace-normal`}
                  >
                    <div className="flex items-center mb-6">
                      <div
                        className={`h-10 w-10 rounded-full bg-gradient-to-r ${
                          i === 0
                            ? "from-pink-500 to-purple-500"
                            : i === 1
                            ? "from-blue-500 to-cyan-500"
                            : "from-amber-500 to-orange-500"
                        } flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                      >
                        {item.initial}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-md font-bold text-white">
                          {item.name}
                        </h4>
                        <p className="text-blue-200 text-sm">{item.role}</p>
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
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
