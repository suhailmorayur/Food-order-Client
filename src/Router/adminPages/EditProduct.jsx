import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchFood = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/fooditems/${id}`, {
        withCredentials: true,
      });

      const item = res.data.foodItem;

      if (item) {
        setFormData({
          name: item.name || "",
          description: item.description || "",
          price: item.price || "",
          image: "",
        });
      }
    } catch (err) {
      console.error("Error fetching food item:", err);
      toast.error("Failed to fetch food item");
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const foodData = new FormData();

    if (formData.name) foodData.append("name", formData.name);
    if (formData.description) foodData.append("description", formData.description);
    if (formData.price) foodData.append("price", formData.price);
    if (formData.image) foodData.append("image", formData.image);

    try {
      await axios.put(`http://localhost:3000/api/fooditems/${id}`, foodData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      navigate("/admin/dashboard/manage-fooditems", {
        state: { message: "Food item updated successfully!" },
      });
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update food item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
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
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Food"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
