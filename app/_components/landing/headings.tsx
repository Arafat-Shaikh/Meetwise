import { motion } from "framer-motion";

interface HeadingsProps {
  heading: string;
  subHeading: string;
}

const Headings = ({ heading, subHeading }: HeadingsProps) => {
  const headingWords = heading.split(" ");
  return (
    <>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.1 }}
        className="text-4xl md:text-5xl text-white tracking-tight leading-tight overflow-hidden"
      >
        {headingWords.map((word, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden mr-3 lg:mr-4"
          >
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "12rem", opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          delay: 1,
          ease: "easeInOut",
        }}
        className="h-[1px] bg-gradient-to-r mt-6 from-transparent via-emerald-800 to-transparent mx-auto"
      />
      <motion.p
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-xl mt-6 text-gray-200 max-w-2xl mx-auto"
      >
        {subHeading}
      </motion.p>
    </>
  );
};

export default Headings;
