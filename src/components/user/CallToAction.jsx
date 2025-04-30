import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-500 to-red-500 text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Craving Delicious Food?
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          Order now and enjoy fresh meals delivered to your door in minutes. Satisfaction guaranteed!
        </motion.p>
        <motion.button
          className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Order Now
        </motion.button>
      </div>
    </section>
  );
};

export default CallToAction;
