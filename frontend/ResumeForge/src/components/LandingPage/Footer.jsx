import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const links = ["Home", "Templates", "Features", "Login"];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold">
              Resume<span className="text-blue-500">Forge</span>
            </h2>
            <p className="text-sm text-gray-600 mt-3 max-w-sm">
              Create professional resumes effortlessly
              and stand out from the crowd.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {links.map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ x: 5 }}
                  className="hover:text-blue-500 transition">
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">
              Get Started
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Start building your professional resume today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-5 py-2 rounded-lg text-sm">
              Get Started
            </motion.button>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">© 2026 ResumeForge. All rights reserved</p>
          <div className="flex gap-5 text-sm text-gray-500">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Service</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;