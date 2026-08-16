import React from "react";
import { motion } from "framer-motion";

const Header = ({ setOpenAuthmodal }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-between px-10 items-center mb-16">
      <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-extrabold cursor-pointer">
        ResumeForge</motion.div>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="bg-purple-100 font-semibold text-black px-7 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
        onClick={() => setOpenAuthmodal(true)}>
        Login / Signup</motion.button>
    </motion.header>
  );
};

export default Header;