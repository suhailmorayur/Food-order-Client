import React, { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import { useParams, useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function FoodDetails() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Track quantity of the food
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems/${id}`);
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

  if (loading) return <Skeleton height={300} />;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleQuantityChange = (operation) => {
    if (operation === "increase") {
      setQuantity(quantity + 1);
    } else if (operation === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
        {/* Food Image */}
        <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
          <img
            src={food?.image || "/default-food.jpg"}
            alt={food?.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Food Details */}
        <div className="sm:w-2/3 pl-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">{food?.name}</h2>
          <p className="text-gray-500 mb-4">{food?.description}</p>
          <p className="text-orange-600 font-bold text-lg mb-4">₹{food?.price}</p>

          {/* Quantity Adjustment */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-l-md"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-16 text-center border-t border-b border-gray-300 py-2"
            />
            <button
              onClick={() => handleQuantityChange("increase")}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-r-md"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6 w-full sm:w-auto flex justify-center">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium w-full sm:w-auto"
              onClick={() => console.log("Add to Cart functionality")}
            >
              Add to Cart
            </button>
          </div>

          {/* Back to Restaurants Button */}
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-sm text-blue-500 hover:underline"
          >
            Back to restaurants
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
