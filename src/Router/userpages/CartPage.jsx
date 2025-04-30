// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { motion } from "framer-motion";

// // Razorpay script loader
// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const CartPage = () => {
//   const [cart, setCart] = useState({ items: [], totalAmount: 0 });
//   const [loading, setLoading] = useState(true);
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [finalAmount, setFinalAmount] = useState(0);
//   const [loadingPayment, setLoadingPayment] = useState(false); // Loading state for payment
//   const [address, setAddress] = useState(""); // State for storing address

//   const fetchCart = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart`,
//         { withCredentials: true }
//       );
//       const cartData = data?.cart ?? { items: [], totalAmount: 0 };
//       setCart(cartData);
//       setFinalAmount(cartData.totalAmount);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Failed to load cart");
//       setCart({ items: [], totalAmount: 0 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQuantity = async (foodId, newQty) => {
//     if (newQty < 1) return;
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/update/${foodId}`,
//         { foodId, quantity: newQty },
//         { withCredentials: true }
//       );
//       fetchCart();
//     } catch (err) {
//       console.error("Error updating quantity:", err);
//       toast.error("Failed to update quantity");
//     }
//   };

//   const removeItem = async (foodId) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/remove/${foodId}`,
//         { withCredentials: true }
//       );
//       toast.success("Item removed");
//       fetchCart();
//     } catch (err) {
//       console.error("Error removing item:", err);
//       toast.error("Failed to remove item");
//     }
//   };

//   const applyCoupon = async () => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_REACT_APP_API_URL}/api/coupons/validate`,
//         {
//           code: couponCode,
//           orderAmount: cart.totalAmount,
//           userId: cart.user,
//         },
//         { withCredentials: true }
//       );
//       setDiscount(res.data.discount);
//       setFinalAmount(res.data.finalAmount);
//       toast.success("Coupon applied!");
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Failed to apply coupon");
//     }
//   };

//   const handlePayment = async () => {
//     if (!address.trim()) {
//       toast.error("Please enter a valid address");
//       return;
//     }

//     const res = await loadRazorpayScript();
//     if (!res) {
//       toast.error("Razorpay SDK failed to load");
//       return;
//     }

//     setLoadingPayment(true); // Show loading spinner when payment is processing

//     // ✅ Calculate totalAmount from cart items
//     const totalAmount = cart.items.reduce(
//       (acc, item) => acc + item.food.price * item.quantity,
//       0
//     );

//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/create-razorpay-order`,
//         {
//           amount: finalAmount,
//           restaurantId: cart.items[0]?.food.restaurantId._id, // From first item
//           address: address, // Send dynamic address
//           coupon: couponCode || null,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: data.amount,
//         currency: "INR",
//         name: "TastyNest",
//         description: "Food Order Payment",
//         order_id: data.orderId,
//         handler: async (response) => {
//           const verifyRes = await axios.post(
//             `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/verify-payment`,
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               orderId: data.orderId,
//             },
//             { withCredentials: true }
//           );
// console.log(verifyRes);
//           if (verifyRes.data.success) {
//             const orderRes = await axios.post(
//               `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders`,
//               {
//                 address: address, // Send dynamic address
//                 restaurantId: cart.items[0]?.food.restaurantId._id,
//                 coupon: couponCode,
//                 razorpayOrderId: data.orderId,
//               },
//               {
//                 withCredentials: true,
//               }
//             );

//             toast.success("Order placed successfully!");
//             fetchCart();
//           } else {
//             toast.error("Payment verification failed");
//           }
//         },
//         prefill: {
//           name: "User",
//           email: "user@example.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#22c55e",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment failed");
//     } finally {
//       setLoadingPayment(false); // Hide loading spinner when payment process is complete
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <motion.div
//       className="max-w-4xl mx-auto p-4"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

//       {Array.isArray(cart.items) && cart.items.length === 0 ? (
//         <p className="text-gray-500">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-6">
//           {cart.items.map((item) => (
//             <motion.div
//               key={item._id}
//               className="flex items-center justify-between border-b pb-4"
//               whileHover={{ scale: 1.01 }}
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.food.image}
//                   alt={item.food.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold">{item.food.name}</h3>
//                   <p className="text-sm text-gray-500">
//                     ₹{item.food.price} x {item.quantity}
//                   </p>
//                   <p className="font-medium">Subtotal: ₹{item.subtotal}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => updateQuantity(item.food._id, item.quantity - 1)}
//                   className="bg-gray-200 px-3 rounded text-lg"
//                 >
//                   -
//                 </button>
//                 <span className="px-2">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item.food._id, item.quantity + 1)}
//                   className="bg-gray-200 px-3 rounded text-lg"
//                 >
//                   +
//                 </button>
//                 <button
//                   onClick={() => removeItem(item.food._id)}
//                   className="ml-4 text-red-500 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </motion.div>
//           ))}

//           <div className="mt-8">
//             <input
//               type="text"
//               placeholder="Enter coupon code"
//               className="border p-2 rounded w-1/2"
//               value={couponCode}
//               onChange={(e) => setCouponCode(e.target.value)}
//             />
//             <button
//               onClick={applyCoupon}
//               className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Apply
//             </button>
//           </div>

//           <div className="text-right mt-6 text-xl font-bold">
//             <p>Subtotal: ₹{cart.totalAmount}</p>
//             {discount > 0 && (
//               <p className="text-green-600">Discount: -₹{discount}</p>
//             )}
//             <p className="text-2xl mt-2">Total: ₹{finalAmount}</p>
//           </div>

//           <div className="mt-4">
//             <input
//               type="text"
//               className="border p-2 rounded w-full"
//               placeholder="Enter your address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>

//           <div className="text-right mt-6">
//             <button
//               onClick={handlePayment}
//               className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-all"
//               disabled={loadingPayment}
//             >
//               {loadingPayment ? "Processing..." : "Proceed to Payment"}
//             </button>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default CartPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

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
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [address, setAddress] = useState("");

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
          userId: cart.user,
        },
        { withCredentials: true }
      );
      setDiscount(res.data.discount);
      setFinalAmount(res.data.finalAmount);
      toast.success("Coupon applied!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to apply coupon");
    }
  };

  const handlePayment = async () => {
    if (!address.trim()) {
      toast.error("Please enter a valid address");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    setLoadingPayment(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/create-razorpay-order`,
        {
          amount: finalAmount,
          restaurantId: cart.items[0]?.food.restaurantId._id,
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
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: data.orderId,
            },
            { withCredentials: true }
          );
       
          fetchCart();

         
        },
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    } finally {
      setLoadingPayment(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg pb-52"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <h2 className="text-3xl font-bold mb-8 text-center text-green-600">Your Cart</h2>

      {Array.isArray(cart.items) && cart.items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.items.map((item) => (
            <motion.div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.food.image}
                  alt={item.food.name}
                  className="w-20 h-20 object-cover rounded-md"
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
                  className="bg-gray-200 px-3 rounded text-lg hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.food._id, item.quantity + 1)}
                  className="bg-gray-200 px-3 rounded text-lg hover:bg-gray-300 transition"
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

          <div className="mt-8 flex gap-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              onClick={applyCoupon}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!couponCode.trim()}
            >
              Apply
            </button>
          </div>

          <div className="text-right mt-6 text-xl font-bold">
            <p>Subtotal: ₹{cart.totalAmount}</p>
            {discount > 0 && (
              <p className="text-green-600">Discount: -₹{discount}</p>
            )}
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
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-6 py-3 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
