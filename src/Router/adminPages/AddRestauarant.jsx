import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    openingHours: "9 AM - 10 PM",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.image) {
      toast.warn("Name, location, and image are required");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/restaurants/addRestaurant`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success("Restaurant added successfully!");
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (err) {
      console.error("Error adding restaurant:", err);
      toast.error("Failed to add restaurant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="openingHours"
          placeholder="Opening Hours (e.g. 9 AM - 10 PM)"
          value={formData.openingHours}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded ${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add Restaurant"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddRestaurant;
