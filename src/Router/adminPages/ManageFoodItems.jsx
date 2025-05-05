import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ManageFoodItems = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems`, {
        withCredentials: true,
      });
      setFoods(res.data.foodItems);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching foods:", err);
      setLoading(false);
      toast.error("Failed to load food items");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems/${id}`, {
        withCredentials: true,
      });
      setFoods((prev) => prev.filter((item) => item._id !== id));
      toast.success("Food item deleted successfully!");
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.error("Failed to delete item");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [restaurantId]);

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
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Food Items</h2>
        <button
          onClick={() => navigate(`/admin/dashboard/addfoods`)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Food Item
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(6)
            .fill()
            .map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
        </div>
      ) : foods.length === 0 ? (
        <p className="text-center text-gray-500">No food items available.</p>
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
              <p className="text-gray-700">{food.description}</p>
              <p className="font-medium text-green-600">₹{food.price}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    navigate(`/admin/dashboard/edit-food/${food._id}`)
                  }
                  className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
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

export default ManageFoodItems;
