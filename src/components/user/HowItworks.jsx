import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Choose Your Favorite",
    description: "Browse through our wide range of restaurants and pick your favorite meal.",
    icon: "🍔",
  },
  {
    id: 2,
    title: "Place Your Order",
    description: "Easily add items to your cart and securely checkout in minutes.",
    icon: "🛒",
  },
  {
    id: 3,
    title: "Fast Delivery",
    description: "Sit back and relax while we deliver hot, delicious food to your doorstep.",
    icon: "🚚",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.h2 
          className="text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <motion.div 
              key={step.id}
              className="bg-white rounded-xl shadow-md p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: step.id * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-6">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
