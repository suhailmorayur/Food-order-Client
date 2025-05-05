
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ foodId: product._id, quantity: 1 })).unwrap();
      navigate("/user/dashboard/cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <motion.div
      className="backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
      }}
    >
      <Link to={`/user/dashboard/food/${product._id}`}>
        <LazyLoadImage
          src={product.image}
          alt={product.name}
          effect="blur"
          className="w-full aspect-[4/3] object-cover "
        />
      </Link>

      <div className="flex flex-col flex-grow p-4">
        <Link to={`/user/dashboard/food/${product._id}`}>
          <h3 className="text-xl font-bold text-gray-800 hover:text-green-600 transition">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mt-2 flex-grow line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-green-700 font-bold text-lg">
            ₹{product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-green-500/80 hover:bg-green-600/90 text-white px-5 py-2 rounded-full text-sm font-medium backdrop-blur-md shadow-md active:scale-95 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;

