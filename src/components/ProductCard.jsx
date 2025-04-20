import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";

function ProductCard({ product }) {
  return (
    <motion.div
      className="border rounded-lg shadow-sm bg-white "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // triggers when 20% is visible
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      }}
    >
      <LazyLoadImage
        src={product.image}
        alt={product.name}
        effect="blur"
        className=" object-cover rounded-t-lg"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-green-600 font-bold text-base">
            ₹{product.price}
          </span>
          <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
