import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const OffersSection = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/coupons`);
        setCoupons(res.data.coupons); // Adjust based on your actual API response
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load offers");
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon "${code}" copied!`);
  };

  return (
    <div className="p-6 bg-yellow-50 rounded-lg shadow-md my-10">
      <h2 className="text-3xl font-bold text-center text-amber-700 mb-6">🔥 Latest Offers & Coupons</h2>

      {loading && <p className="text-center text-gray-500">Loading offers...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <motion.div
            key={coupon._id}
            className="bg-white p-4 border rounded-lg shadow-sm hover:shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-orange-600 mb-2">{coupon.title}</h3>
            <p className="text-gray-600 mb-4">{coupon.description}</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg bg-gray-100 px-3 py-1 rounded">{coupon.code}</span>
              <button
                onClick={() => handleCopy(coupon.code)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm"
              >
                Copy
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OffersSection;
