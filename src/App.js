import React from "react";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">UniEvents</h1>
        <ul className="flex gap-6">
          <li className="hover:underline cursor-pointer">Home</li>
          <li className="hover:underline cursor-pointer">Events</li>
          <li className="hover:underline cursor-pointer">About</li>
          <li className="hover:underline cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center h-[80vh] px-6">
        <motion.h2
          className="text-5xl font-extrabold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to University Events 🎉
        </motion.h2>

        <motion.p
          className="mt-4 text-lg max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Stay updated with all the latest events, fests, and programs happening
          in your university. Don’t miss out on the fun!
        </motion.p>

        <motion.button
          className="mt-8 px-8 py-3 bg-white text-purple-700 font-bold rounded-xl shadow-lg hover:scale-110 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          View Events
        </motion.button>
      </div>

      {/* Example Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
        {["Cultural Fest", "Tech Meetup", "Sports Day"].map((event, i) => (
          <motion.div
            key={i}
            className="bg-white/20 p-6 rounded-2xl shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold">{event}</h3>
            <p className="mt-2 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Event
              details here...
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default App;
