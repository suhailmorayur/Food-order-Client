import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/user-orders`,
          { withCredentials: true }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/${orderId}`,
        { withCredentials: true }
      );
      // Remove the canceled order from the list
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.li
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="border p-4 rounded-md shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    className="object-cover w-24 h-24 mr-4 rounded-md"
                    src={order.items[0]?.image} // Assuming the first item in the order has the image
                    alt={order.items[0]?.name}
                  />
                  <div className="flex flex-col">
                    <p className="font-medium">Order ID: {order._id}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>Total: ₹{order.totalAmount}</p>
                    <p>Status: {order.orderStatus}</p>
                    <p>Payment Status: {order.paymentStatus}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center ml-4">
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Cancel Order
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

export default Orders;
