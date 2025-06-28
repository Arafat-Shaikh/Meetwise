import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-blue-900/80 to-gray-900/90  text-gray-300 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold text-white">Meetwise</h3>
            <p className="mt-4">
              AI-powered scheduling platform for service providers and their
              clients.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Product</h4>
            <ul className="mt-4 space-y-2">
              {["Features", "Pricing", "Integrations", "FAQ"].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:text-white">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:text-white">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="mt-4 space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <Link href="#" className="hover:text-white">
                      {item}
                    </Link>
                  </motion.li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800/50 pt-8 text-center">
          <p>© {new Date().getFullYear()} AppointAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
