
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/HeroImg.png";

const Hero = ({ setOpenAuthmodal }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCTA = () => {
    if (!user) {
      setOpenAuthmodal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="w-full md:w-1/2"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Build Your{" "}
              <span className="text-blue-500">Resume</span>
              <br />

              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)]">
                Effortlessly
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-700 mb-8 max-w-xl"
            >
              Craft a standout resume in minutes with our smart and
              intuitive resume builder.
            </motion.p>

            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg cursor-pointer"
              onClick={handleCTA}
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center items-center"
          >
            <img
              src={HeroImg}
              alt="Resume Builder Illustration"
              className="w-full max-w-[480px] h-auto object-contain"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
