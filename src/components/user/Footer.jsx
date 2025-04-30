import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">TastyNest</h2>
          <p className="text-gray-400">
            Delicious food from your favorite restaurants delivered fast at your door.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#popular-restaurants" className="hover:text-white">Restaurants</a></li>
            <li><a href="#popular-foods" className="hover:text-white">Popular Foods</a></li>
            <li><a href="#coupon" className="hover:text-white">Coupon Codes</a></li>
            <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>

      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TastyNest. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
