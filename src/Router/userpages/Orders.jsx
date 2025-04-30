import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // For modal

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/user-orders`,
          { withCredentials: true }
        );
        const sortedOrders = response.data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const confirmCancelOrder = async () => {
    if (!selectedOrder) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/${selectedOrder}`,
        { withCredentials: true }
      );

      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== selectedOrder));
      toast.success('Order has been successfully canceled!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Failed to cancel the order.';
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setSelectedOrder(null); // Close modal
    }
  };

  const openCancelModal = (orderId) => {
    setSelectedOrder(orderId);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-xl text-gray-600">Loading your orders...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No orders found.</p>
      ) : (
        <ul className="space-y-6">
          <AnimatePresence>
            {orders.map((order) => {
              const notCancellable = ['Shipped', 'Delivered', 'Canceled'].includes(order.orderStatus);
              return (
                <motion.li
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="border p-6 rounded-lg shadow-lg bg-white flex flex-col sm:flex-row items-center justify-between hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 sm:flex-row flex-col">
                    <img
                      className="object-cover w-24 h-24 rounded-lg shadow-md"
                      src={order.items[0]?.image}
                      alt={order.items[0]?.name}
                    />
                    <div className="flex flex-col space-y-2">
                      <p className="font-medium text-lg text-gray-800">Order ID: {order._id}</p>
                      <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Total: ₹{order.totalAmount}</p>
                      <p className="text-sm text-gray-600">Status: <span className="font-semibold">{order.orderStatus}</span></p>
                      <p className="text-sm text-gray-600">Payment Status: <span className="font-semibold">{order.paymentStatus}</span></p>
                      {notCancellable && (
                        <p className="text-xs text-gray-500 italic mt-1">Cancellation not allowed</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:ml-4 flex justify-center">
                    {notCancellable ? (
                      <button
                        disabled
                        className="bg-gray-300 text-gray-500 py-2 px-6 rounded-md cursor-not-allowed"
                      >
                        Cancel Order
                      </button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openCancelModal(order._id)}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition duration-300 transform hover:scale-105"
                      >
                        Cancel Order
                      </motion.button>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Cancellation</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to cancel this order?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  No
                </button>
                <button
                  onClick={confirmCancelOrder}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Orders;
