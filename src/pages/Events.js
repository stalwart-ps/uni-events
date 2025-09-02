import React from "react";
import { motion } from "framer-motion";
import eventsData from "../data/events.json";

const Events = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white pt-20 px-4 sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center">University Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {eventsData.map((event) => (
          <motion.div
            key={event.id}
            className="bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-400 text-sm">{event.date}</p>
            <p className="mt-2 text-gray-200 text-sm">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Events;
