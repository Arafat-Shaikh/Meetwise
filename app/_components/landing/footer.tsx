import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-b from-neutral-900 via-black/5 to-neutral-950 mx-4 md:mx-6 rounded-t-2xl text-gray-300 backdrop-blur-sm"
      style={{
        boxShadow: `0 10px 30px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)`,
      }}
    >
      {/* <div className="absolute inset-1 opacity-10 bg-gradient-to-t from-white to-black/80 rounded-xl shadow- pointer-events-none" /> */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 text-white">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xl font-bold"
            >
              Meetvise
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 text-gray-300"
            >
              AI-powered scheduling platform for service providers and their
              clients.
            </motion.p>
          </div>
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg font-semibold"
            >
              Product
            </motion.h4>
            <ul className="mt-4 space-y-2">
              {["Features", "Pricing", "Integrations", "FAQ"].map(
                (item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      opacity: { duration: 0.8, delay: index * 0.2 },
                      y: { duration: 0.8, delay: index * 0.2 },
                    }}
                    whileHover={{
                      x: 5,
                      transition: { duration: 0.1 },
                    }}
                    className="text-gray-300 hover:text-gray-100"
                  >
                    <Link href="#" className="">
                      {item}
                    </Link>
                  </motion.li>
                )
              )}
            </ul>
          </div>
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg font-semibold"
            >
              Company
            </motion.h4>
            <ul className="mt-4 space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    opacity: { duration: 0.8, delay: index * 0.2 },
                    y: { duration: 0.8, delay: index * 0.2 },
                  }}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.1 },
                  }}
                  className="text-gray-300 hover:text-gray-100"
                >
                  <Link href="#" className="">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg font-semibold"
            >
              Legal
            </motion.h4>
            <ul className="mt-4 space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      opacity: { duration: 0.8, delay: index * 0.2 },
                      y: { duration: 0.8, delay: index * 0.2 },
                    }}
                    whileHover={{
                      x: 5,
                      transition: { duration: 0.1 },
                    }}
                    // className="text-gray-300 hover:text-gray-100"
                  >
                    <Link href="#" className="">
                      {item}
                    </Link>
                  </motion.li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="mt-20 border-t border-gray-800/50 pt-3 text-center text-gray-700">
          <p>© {new Date().getFullYear()} Meetvise. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
