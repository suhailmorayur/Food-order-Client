

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";

function RestaurantCard({ product }) {
  return (
    <motion.div
      className="border border-amber-400 rounded-2xl bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.04,
      }}
    >
      <LazyLoadImage
        src={product.image}
        alt={product.name}
        effect="blur"
        className="w-full aspect-[4/3]  object-cover"
      />
      <div className="p-4 bg-gradient-to-b from-amber-500 to-amber-600 text-center">
        <h3 className="text-2xl font-bold text-white mb-1">{product.name}</h3>
        <p className="text-sm text-amber-100">{product.description}</p>
      </div>
    </motion.div>
  );
}

export default RestaurantCard;
