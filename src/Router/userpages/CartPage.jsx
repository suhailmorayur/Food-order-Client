
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  fetchCart,
  updateQuantity,
  removeCartItem,
  applyCoupon,
} from "../../redux/slices/cartSlice";

// Razorpay script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, discount, finalAmount } = useSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState("");
  const [address, setAddress] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCoupon = () => {
    if (!couponCode.trim()) return toast.error("Enter a valid coupon code");
    if (items.length === 0) return toast.error("Cart is empty");
  
    dispatch(applyCoupon({ code: couponCode, orderAmount: totalAmount, userId: items[0].user }))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Coupon applied successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to apply coupon");
      });
  };
  

  const handlePayment = async () => {
    if (!address.trim()) return toast.error("Please enter a valid address");

    const res = await loadRazorpayScript();
    if (!res) return toast.error("Razorpay SDK failed to load");

    setLoadingPayment(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/create-razorpay-order`,
        {
          amount: finalAmount,
          restaurantId: items[0]?.food.restaurantId._id,
          address: address,
          coupon: couponCode || null,
        },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "TastyNest",
        description: "Food Order Payment",
        order_id: data.orderId,
        handler: async (response) => {
          await axios.post(
            `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: data.orderId,
            },
            { withCredentials: true }
          );
          dispatch(fetchCart());
        },
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: { color: "#22c55e" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg pb-52"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      <h2 className="text-3xl font-bold mb-8 text-center text-green-600">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
           <motion.div
           key={item._id}
           className="bg-white p-4 rounded-lg shadow-md"
           whileHover={{ scale: 1.02 }}
         >
           <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
             {/* Image */}
             <img
               src={item.food.image}
               alt={item.food.name}
               className="w-28 h-28 object-cover rounded-md mx-auto md:mx-0"
             />
         
             {/* Details */}
             <div className="flex-1 text-center md:text-left">
               <h3 className="text-lg font-semibold">{item.food.name}</h3>
               <p className="text-sm text-gray-500">
                 ₹{item.food.price} x {item.quantity}
               </p>
               <p className="font-medium">Subtotal: ₹{item.subtotal}</p>
         
               {/* Controls: Quantity + Remove */}
               <div className="mt-3 flex justify-center md:justify-start items-center gap-2 flex-wrap">
                 <button
                   onClick={() =>
                     item.quantity > 1
                       ? dispatch(updateQuantity({ foodId: item.food._id, quantity: item.quantity - 1 }))
                       : toast.info("Minimum quantity is 1")
                   }
                   className="bg-gray-200 px-3 rounded text-lg hover:bg-gray-300 transition"
                 >
                   -
                 </button>
                 <span className="px-2">{item.quantity}</span>
                 <button
                   onClick={() =>
                     dispatch(updateQuantity({ foodId: item.food._id, quantity: item.quantity + 1 }))
                   }
                   className="bg-gray-200 px-3 rounded text-lg hover:bg-gray-300 transition"
                 >
                   +
                 </button>
                 <button
                   onClick={() => {
                     dispatch(removeCartItem(item.food._id));
                     toast.success("Item removed from cart");
                   }}
                   className="ml-2 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
                 >
                   Remove
                 </button>
               </div>
             </div>
           </div>
         </motion.div>
         
          ))}

          <div className="mt-8 flex gap-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              onClick={handleCoupon}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all disabled:opacity-50"
              disabled={!couponCode.trim()}
            >
              Apply
            </button>
          </div>

          <div className="text-right mt-6 text-xl font-bold">
            <p>Subtotal: ₹{totalAmount}</p>
            {discount > 0 && <p className="text-green-600">Discount: -₹{discount}</p>}
            <p className="text-2xl mt-2">Total: ₹{finalAmount}</p>
          </div>

          <div className="mt-4">
            <input
              type="text"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="text-right mt-6">
            <button
              onClick={handlePayment}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded transition-all disabled:opacity-50"
              disabled={loadingPayment}
            >
              {loadingPayment ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;
