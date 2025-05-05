import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const OffersSection = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/coupons`);
        setCoupons(res.data.coupons);
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
    toast.success(`Coupon "${code}" copied to clipboard!`, { autoClose: 2000 });
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-12 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent mb-12">
          🔥 Exclusive Deals & Discount Coupons
        </h2>

        {loading && (
          <p className="text-center text-gray-500 text-lg animate-pulse">Loading offers...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map((coupon) => (
            <motion.div
              key={coupon._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-xl font-semibold text-orange-600 mb-2">{coupon.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{coupon.description}</p>
                <div className="text-sm text-gray-700 mb-1 font-medium">
                  {coupon.discountType === "percentage"
                    ? `🎁 ${coupon.discountValue}% OFF`
                    : `💸 Flat ₹${coupon.discountValue} OFF`}
                </div>
                {coupon.minOrderAmount > 0 && (
                  <p className="text-xs text-gray-500 mb-2">
                    Min order: ₹{coupon.minOrderAmount}
                  </p>
                )}
                <p className="text-xs text-red-500">⏰ Valid till: {new Date(coupon.expirationDate).toLocaleDateString()}</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="bg-orange-100 text-orange-800 font-mono px-3 py-1 rounded-md text-sm tracking-wide shadow-inner">
                  {coupon.code}
                </span>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-1.5 text-sm rounded-md font-medium shadow-sm"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
       