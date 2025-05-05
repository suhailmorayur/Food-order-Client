import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const [count, setCount] = useState({
    customers: 0,
    restaurants: 0,
    deliveries: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => ({
        customers: prev.customers < 5000 ? prev.customers + 50 : 5000,
        restaurants: prev.restaurants < 200 ? prev.restaurants + 2 : 200,
        deliveries: prev.deliveries < 10000 ? prev.deliveries + 100 : 10000,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white overflow-hidden py-20 px-6 md:px-20">
    
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div
          className="absolute w-72 h-72 bg-indigo-100 rounded-full top-[-100px] left-[-100px]"
          animate={{ x: [0, 100, 0], y: [0, 100, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-100 rounded-full bottom-[-150px] right-[-150px]"
          animate={{ x: [0, -100, 0], y: [0, -100, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
      </div>

     
      <div className="relative max-w-7xl mx-auto z-10">
      
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Delivering happiness, connecting food lovers with the best meals from their favorite local restaurants.
          </p>
        </motion.div>
        {/* Animated Counters */}
        <motion.div 
          className="grid md:grid-cols-3 gap-12 text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-5xl font-bold text-indigo-600">{count.customers}+</h3>
            <p className="text-gray-600 mt-2">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-indigo-600">{count.restaurants}+</h3>
            <p className="text-gray-600 mt-2">Restaurants Partnered</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-indigo-600">{count.deliveries}+</h3>
            <p className="text-gray-600 mt-2">Orders Delivered</p>
          </div>
        </motion.div>

        {/* Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
          >
            Back to Top
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
