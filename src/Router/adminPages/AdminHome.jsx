import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const AdminHome = () => {
  const [stats, setStats] = useState({
    restaurantCount: 0,
    foodItemCount: 0,
    userCount: 0,
  });

  const fetchStats = async () => {
    try {
      // Fetch food items count
      const foodItemRes = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems`, {
        withCredentials: true,
      });
  
      // Fetch restaurants count
      const restaurantRes = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/restaurants`, {
        withCredentials: true,
      });
  
      // Fetch users count
      const userRes = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user`, {
        withCredentials: true,
      });
  
      // Update all counts in the state
      setStats({
        restaurantCount: restaurantRes.data.count || 0,
        foodItemCount: foodItemRes.data.count || 0,
        userCount: userRes.data.count || 0,
      });
  
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };
  

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center">Welcome to the Admin Dashboard</h1>
      <p className="text-center text-lg mt-2">Manage your restaurants and food items efficiently.</p>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold">Restaurants</h3>
          <p className="text-4xl font-bold text-blue-600">{stats.restaurantCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold">Food Items</h3>
          <p className="text-4xl font-bold text-green-600">{stats.foodItemCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold">Users</h3>
          <p className="text-4xl font-bold text-yellow-600">{stats.userCount}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="manage-restaurants"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Manage Restaurants
          </Link>
          <Link
            to="/admin/dashboard/manage-fooditems"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Manage Food Items
          </Link>
          <Link
            to="/admin/dashboard/view-users"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            View Users
          </Link>
          <Link
            to="/admin/dashboard/invite-cods"
            className="bg-fuchsia-900 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Manage Invite Cods
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
