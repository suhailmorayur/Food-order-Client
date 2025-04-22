import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the styles for toast notifications

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/restaurants`,
        {
          withCredentials: true,
        }
      );
      setRestaurants(res.data.restaurants || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch restaurants", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/restaurants/${id}`, {
        withCredentials: true,
      });
      toast.success("Restaurant deleted successfully!"); // Show success toast
      fetchRestaurants(); // Refresh list after deletion
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete restaurant"); // Show error toast
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const SkeletonLoader = () => (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center animate-pulse">
      <div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 bg-gray-300 rounded w-20"></div>
        <div className="h-8 bg-gray-300 rounded w-20"></div>
        <div className="h-8 bg-gray-300 rounded w-20"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">All Restaurants</h2>

      {loading ? (
        <div className="space-y-4">
          {Array(6)
            .fill()
            .map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {restaurants.map((rest) => (
            <motion.div
              key={rest._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="text-lg font-semibold">{rest.name}</h3>
                <p className="text-sm text-gray-600">{rest.location}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/dashboard/edit-restaurant/${rest._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rest._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/admin/dashboard/restaurants/${rest._id}/foods`)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  View Items
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ToastContainer to display the notifications */}
      <ToastContainer />
    </div>
  );
};

export default RestaurantList;
