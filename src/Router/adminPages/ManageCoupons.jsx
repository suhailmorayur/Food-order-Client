import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    title: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
    expirationDate: "",
    usageLimit: 1,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/coupons`,
        { withCredentials: true }
      );
      setCoupons(response.data.coupons);
    } catch (err) {
      toast.error("Failed to fetch coupons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Handle coupon form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new coupon
  const handleAddCoupon = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/coupons`,
        newCoupon,
        { withCredentials: true }
      );
      toast.success("Coupon added successfully!");
      fetchCoupons(); 
    } catch (err) {
      toast.error("Failed to add coupon.");
    }
  };

  // Handle delete coupon
  const handleDeleteCoupon = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/coupons/${id}`,
        { withCredentials: true }
      );
      toast.success("Coupon deleted successfully!");
      fetchCoupons(); 
    } catch (err) {
      toast.error("Failed to delete coupon.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-4">Manage Coupons</h2>

      {error && <div className="text-red-500">{error}</div>}

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Add New Coupon</h3>
        <div className="grid gap-4 mt-4">
          <input
            type="text"
            name="title"
            value={newCoupon.title}
            onChange={handleInputChange}
            placeholder="Coupon Title"
            className="border rounded-md p-2"
          />
          <input
            type="text"
            name="code"
            value={newCoupon.code}
            onChange={handleInputChange}
            placeholder="Coupon Code"
            className="border rounded-md p-2"
          />
          <select
            name="discountType"
            value={newCoupon.discountType}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          >
            <option value="percentage">Percentage</option>
            <option value="flat">Flat</option>
          </select>
          <input
            type="number"
            name="discountValue"
            value={newCoupon.discountValue}
            onChange={handleInputChange}
            placeholder="Discount Value"
            className="border rounded-md p-2"
          />
          <input
            type="datetime-local"
            name="expirationDate"
            value={newCoupon.expirationDate}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          />
          <input
            type="number"
            name="usageLimit"
            value={newCoupon.usageLimit}
            onChange={handleInputChange}
            placeholder="Usage Limit"
            className="border rounded-md p-2"
          />
          <button
            onClick={handleAddCoupon}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Coupon
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">All Coupons</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Code</th>
                <th className="border p-2">Discount</th>
                <th className="border p-2">Expiration Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td className="border p-2">{coupon.title}</td>
                  <td className="border p-2">{coupon.code}</td>
                  <td className="border p-2">{coupon.discountValue}</td>
                  <td className="border p-2">
                    {new Date(coupon.expirationDate).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDeleteCoupon(coupon._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Toast Notifications Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
}

export default ManageCoupons;
