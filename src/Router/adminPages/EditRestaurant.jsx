import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    openingHours: "",
    image: "", 
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/restaurants/${id}`, {
          withCredentials: true,
        });
        const r = res.data.restaurant;
        setFormData({
          name: r.name || "",
          location: r.location || "",
          description: r.description || "",
          openingHours: r.openingHours || "",
          image: "", 
        });
      } catch (err) {
        console.error("Error fetching restaurant", err);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("location", formData.location);
      data.append("description", formData.description);
      data.append("openingHours", formData.openingHours);
      if (formData.image) data.append("image", formData.image);

      await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/restaurants/updateRestaurant/${id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Restaurant updated successfully");
      navigate("/admin/dashboard/restaurant-list");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update restaurant");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Restaurant</h2>
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
          placeholder="Opening Hours"
          value={formData.openingHours}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Restaurant
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
