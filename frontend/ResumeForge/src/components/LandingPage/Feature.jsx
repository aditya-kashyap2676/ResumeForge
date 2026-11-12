
import React from "react";
import { motion } from "framer-motion";
import Reuse from "./Reuse";

const Features = () => {
  const cards = [
    {
      title: "Easy Editing",
      description:
        "Update your resume sections with live preview and instant formatting",
    },
    {
      title: "Beautiful Templates",
      description:
        "Choose from modern, professional templates that are easy to customize",
    },
    {
      title: "One-Click Export",
      description:
        "Download your resume instantly as high-quality PDF with one click",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="mt-10"
    >
      <h1 className="text-2xl font-bold text-center mb-12">
        Features That Makes You Shine
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -5 }}
          >
            <Reuse
              title={card.title}
              description={card.description}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Features;
