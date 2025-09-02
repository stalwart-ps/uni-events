import React from "react";
import { motion } from "framer-motion";

// Sample sponsor logos
const sponsors = [
  "https://source.unsplash.com/200x100/?logo1",
  "https://source.unsplash.com/200x100/?logo2",
  "https://source.unsplash.com/200x100/?logo3",
  "https://source.unsplash.com/200x100/?logo4",
  "https://source.unsplash.com/200x100/?logo5",
  "https://source.unsplash.com/200x100/?logo6",
];

const Sponsors = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white pt-20 px-4 sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center">
        Our Sponsors
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-items-center">
        {sponsors.map((logo, index) => (
          <motion.div
            key={index}
            className="p-4 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <img src={logo} alt={`Sponsor ${index + 1}`} className="h-16 object-contain" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sponsors;
