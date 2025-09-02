import React from "react";
import { motion } from "framer-motion";

// Sample gallery images
const images = [
  "https://source.unsplash.com/400x300/?university,event1",
  "https://source.unsplash.com/400x300/?university,event2",
  "https://source.unsplash.com/400x300/?university,event3",
  "https://source.unsplash.com/400x300/?university,event4",
  "https://source.unsplash.com/400x300/?university,event5",
  "https://source.unsplash.com/400x300/?university,event6",
];

const Gallery = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white pt-20 px-4 sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center">
        Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-60 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Gallery;

