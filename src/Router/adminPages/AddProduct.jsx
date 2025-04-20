import { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    restaurantId: "",
    image: null,
  });

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/restaurants", {
          withCredentials: true,
        });
        setRestaurants(res.data.restaurants); // ✅ FIXED
      } catch (err) {
        console.error("Failed to fetch restaurants", err);
      }
    };
  
    fetchRestaurants();
  }, []);

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

    const foodData = new FormData();
    foodData.append("name", formData.name);
    foodData.append("description", formData.description);
    foodData.append("price", formData.price);
    foodData.append("restaurantId", formData.restaurantId);
    foodData.append("image", formData.image);

    try {
      await axios.post("http://localhost:3000/api/fooditems", foodData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Food item added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        restaurantId: "",
        image: null,
      });
    } catch (err) {
      console.error("Error adding food:", err);
      alert("Failed to add food");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Restaurant</label>
          <select
  name="restaurantId"
  value={formData.restaurantId}
  onChange={handleChange}
  required
  className="w-full mt-1 px-4 py-2 border rounded-md"
>
  <option value="">Select a restaurant</option>
  {restaurants.map((res) => (
    <option key={res._id} value={res._id}>
      {res.name}
    </option>
  ))}
</select>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
