import React from "react";
import { motion } from "framer-motion";

const FoodBackgroundCTA = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-24"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')", // Replace this URL with your own image if needed
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Taste the Best Food in Town
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          Fresh, fast, and flavorful — delivered straight to your doorstep. Order now and enjoy special offers!
        </motion.p>
        <motion.button
          className="bg-pink-500 hover:bg-pink-600 font-semibold px-8 py-3 rounded-full text-lg transition"
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

export default FoodBackgroundCTA;
