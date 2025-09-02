import React from "react";
import { motion } from "framer-motion";

// Sample competitions data
const competitions = [
  {
    id: 1,
    title: "Coding Challenge",
    date: "Sept 15, 2025",
    description: "Test your coding skills and win exciting prizes!",
    image: "https://source.unsplash.com/400x300/?coding,computer",
  },
  {
    id: 2,
    title: "Art Contest",
    date: "Sept 20, 2025",
    description: "Show your creativity and compete with talented artists!",
    image: "https://source.unsplash.com/400x300/?art,painting",
  },
  {
    id: 3,
    title: "Debate Competition",
    date: "Sept 25, 2025",
    description: "Sharpen your public speaking and argumentation skills.",
    image: "https://source.unsplash.com/400x300/?debate,speech",
  },
];

const Competition = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white pt-20 px-4 sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center">
        Competitions
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {competitions.map((comp) => (
          <motion.div
            key={comp.id}
            className="bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={comp.image}
              alt={comp.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="text-xl font-semibold">{comp.title}</h2>
            <p className="text-gray-400 text-sm">{comp.date}</p>
            <p className="mt-2 text-gray-200 text-sm">{comp.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Competition;
