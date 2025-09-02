import React from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Parallax
      bgImage="https://source.unsplash.com/1600x900/?university,campus"
      strength={200}
    >
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-black/60 px-4 sm:px-6 md:px-10 pt-20">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to UniEvents
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Stay updated with all upcoming and past events at your university. Explore events, sponsors, gallery, and register to join!
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link
            to="/registration"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white shadow-lg transition transform hover:scale-105"
          >
            Register Now
          </Link>
          <Link
            to="/events"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold text-white shadow-lg transition transform hover:scale-105"
          >
            View Events
          </Link>
        </motion.div>
      </div>
    </Parallax>
  );
};

export default Home;
