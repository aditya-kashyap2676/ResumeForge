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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="mt-10">
      <h1 className="text-2xl font-bold text-center mb-12">Features That Makes You Shine</h1>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
              },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                },
              },
            }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}>
            <Reuse
              title={card.title}
              description={card.description}/>
          </motion.div>
        ))}

      </motion.div>
    </motion.section>
  );
};

export default Features;