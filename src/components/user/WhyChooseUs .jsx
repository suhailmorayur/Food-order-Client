import React from "react";
import { motion } from "framer-motion";

const reasons = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "We ensure your food is delivered hot and fresh within minutes.",
    icon: "⚡",
  },
  {
    id: 2,
    title: "Best Restaurants",
    description: "Partnered with the top-rated local restaurants in your area.",
    icon: "🏆",
  },
  {
    id: 3,
    title: "Easy Payments",
    description: "Multiple payment options including UPI, cards, and cash on delivery.",
    icon: "💳",
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "Facing any issue? Our support team is always here to help you.",
    icon: "📞",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.h2 
          className="text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Why Choose Us
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((reason) => (
            <motion.div 
              key={reason.id}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reason.id * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{reason.title}</h3>
              <p className="text-gray-500">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
