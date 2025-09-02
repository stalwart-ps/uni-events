import React from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white pt-20 px-4 sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Page Name</h1>
      <p className="text-base sm:text-lg">
        This is the PageName page. You can add your content here.
      </p>
    </motion.div>
  );
};

export default FAQ;
