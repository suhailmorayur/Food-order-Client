import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { ChevronLeft, Plus, Minus, ShoppingCart } from "lucide-react"; // Optional icons

function FoodDetails() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems/${id}`
        );
        const data = await response.json();
        setFood(data.food);
        setLoading(false);
      } catch (error) {
        setError("Failed to load food details.");
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleQuantityChange = (operation) => {
    if (operation === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (operation === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart`,
        {
          foodId: food._id,
          quantity: quantity,
        },
        { withCredentials: true }
      );
      navigate("/user/dashboard/cart");
    } catch (error) {
      console.error("Failed to add to cart:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Skeleton height={400} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={food?.image || "/default-food.jpg"}
            alt={food?.name}
            className="w-full h-96 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-gray-800">{food?.name}</h2>
          <p className="text-gray-500">{food?.description}</p>
          <p className="text-2xl font-semibold text-orange-500">₹{food?.price}</p>

          {/* Quantity selector */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <Minus size={20} />
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart size={20} /> Add to Cart
          </button>

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mt-4 text-blue-600 hover:underline transition"
          >
            <ChevronLeft size={18} /> Back to Restaurants
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
