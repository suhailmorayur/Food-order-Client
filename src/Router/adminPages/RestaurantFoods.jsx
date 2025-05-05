import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion"; 

const RestaurantFoods = () => {
  const { id } = useParams(); // restaurant ID
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [deleteStatus, setDeleteStatus] = useState(""); 

  const fetchFoods = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems/restaurant/${id}`,
        {
          withCredentials: true,
        }
      );
      setFoods(res.data.foodItems || []);
      setLoading(false); // Stop loading after data is fetched
    } catch (err) {
      console.error("Failed to fetch food items", err);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [id]);

  const handleDelete = async (foodId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this food item?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems/${foodId}`,
        { withCredentials: true }
      );
      setDeleteStatus("Food item deleted successfully!"); 
      setTimeout(() => {
        setDeleteStatus(""); // Reset confirmation message after 3 seconds
      }, 3000);
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== foodId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete food item");
    }
  };

  // Skeleton loader UI
  const SkeletonLoader = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Food Items in This Restaurant</h2>

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

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Display Skeleton Loaders while fetching data */}
          {Array(6)
            .fill()
            .map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
        </div>
      ) : foods.length === 0 ? (
        <p className="text-center text-gray-500">No food items found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <motion.div
              key={food._id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {food.image && (
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold">{food.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{food.description}</p>
                  <p className="text-green-600 font-bold">₹{food.price}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/admin/dashboard/edit-food/${food._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantFoods;
