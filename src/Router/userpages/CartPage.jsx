import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart`,
        { withCredentials: true }
      );
      const cartData = data?.cart ?? { items: [], totalAmount: 0 };
      setCart(cartData);
      setFinalAmount(cartData.totalAmount);
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Failed to load cart");
      setCart({ items: [], totalAmount: 0 });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (foodId, newQty) => {
    if (newQty < 1) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/update/${foodId}`,
        { foodId, quantity: newQty },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (foodId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/remove/${foodId}`,
        { withCredentials: true }
      );
      toast.success("Item removed");
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Failed to remove item");
    }
  };

  const applyCoupon = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/coupons/validate`,
        {
          code: couponCode,
          orderAmount: cart.totalAmount,
          userId: cart.user, // if userId is stored in cart or from auth context
        },
        { withCredentials: true }
      );
      setDiscount(res.data.discount);
      setFinalAmount(res.data.finalAmount);
      setCouponApplied(true); // lock the input/button
      toast.success("Coupon applied!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to apply coupon");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {Array.isArray(cart.items) && cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.items.map((item) => (
            <motion.div
              key={item._id}
              className="flex items-center justify-between border-b pb-4"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.food.image}
                  alt={item.food.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.food.name}</h3>
                  <p className="text-sm text-gray-500">
                    ₹{item.food.price} x {item.quantity}
                  </p>
                  <p className="font-medium">Subtotal: ₹{item.subtotal}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.food._id, item.quantity - 1)}
                  className="bg-gray-200 px-3 rounded text-lg"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.food._id, item.quantity + 1)}
                  className="bg-gray-200 px-3 rounded text-lg"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.food._id)}
                  className="ml-4 text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}

          {/* Coupon input and apply button */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="border p-2 rounded w-1/2 disabled:opacity-60"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={couponApplied}
            />
            <button
              onClick={applyCoupon}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={couponApplied || !couponCode}
            >
              {couponApplied ? "Applied ✅" : "Apply"}
            </button>
            {couponApplied && (
              <p className="text-green-600 mt-2 font-medium">Coupon successfully applied ✅</p>
            )}
          </div>

          {/* Cart Summary */}
          <div className="text-right mt-6 text-xl font-bold">
            <p>Subtotal: ₹{cart.totalAmount}</p>
            {discount > 0 && (
              <p className="text-green-600">Discount: -₹{discount}</p>
            )}
            <p className="text-2xl mt-2">Total: ₹{finalAmount}</p>
          </div>

          {/* Checkout button */}
          <div className="text-right mt-6">
            <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-all">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;
