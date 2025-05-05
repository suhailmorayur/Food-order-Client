import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [deleteStatus, setDeleteStatus] = useState(""); 

  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/fooditems", {
        withCredentials: true,
      });
      setFoods(res.data.foodItems);
      setLoading(false); // Stop loading when the data is fetched
    } catch (err) {
      console.error("Error fetching foods:", err);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems/${id}`, {
        withCredentials: true,
      });
      setDeleteStatus("Food item deleted successfully!"); 
      setTimeout(() => setDeleteStatus(""), 3000); 
      setFoods(foods.filter((item) => item._id !== id)); 
    } catch (err) {
      console.error("Error deleting food item:", err);
      alert("Failed to delete item");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Skeleton loader UI
  const SkeletonLoader = () => (
    <div className="border p-4 rounded-lg shadow-md animate-pulse">
      <div className="h-40 bg-gray-300 rounded-md mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Food Items</h2>

      {/* Confirmation Message */}
      {deleteStatus && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-500 text-white p-4 rounded mb-6 text-center"
        >
          {deleteStatus}
        </motion.div>
      )}

      {/* Show Skeleton Loaders while data is being fetched */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(6)
            .fill()
            .map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {foods.map((food) => (
            <motion.div
              key={food._id}
              className="border p-4 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{food.name}</h3>
              <p className="text-sm text-gray-500">{food.restaurantId?.name}</p>
              <p className="text-gray-700">{food.description}</p>
              <p className="font-medium text-green-600">₹{food.price}</p>
              <div className="flex gap-2 mt-3">
                <Link
                  to={`/admin/dashboard/edit-food/${food._id}`}
                  className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodList;
