
import React, { useContext } from "react";
import { motion } from "framer-motion";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { UserContext } from "../../context/useContext";

const Header = ({ setOpenAuthmodal }) => {
  const { user } = useContext(UserContext);

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex justify-between px-10 items-center mb-16 mt-4"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="text-2xl font-extrabold cursor-pointer"
      >
        ResumeForge
      </motion.div>

      {user ? (
        <ProfileInfoCard />
      ) : (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="bg-purple-100 font-semibold text-black px-7 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
          onClick={() => setOpenAuthmodal(true)}
        >
          Login / Signup
        </motion.button>
      )}
    </motion.header>
  );
};

export default Header;
