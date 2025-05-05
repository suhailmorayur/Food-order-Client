// src/components/Orders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Select, MenuItem, CircularProgress, Typography
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion'; 

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/orders`,
          { withCredentials: true });
        const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders!');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  

  // Update order status
  const handleorderStatusChange = async (orderId, neworderStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/orders/${orderId}`,
        { orderStatus: neworderStatus }, { withCredentials: true });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, orderStatus: neworderStatus } : order
        )
      );
      toast.success('Order status updated!');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order!');
    }
  };

  // Delete order
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/orders/${orderId}`,
        { withCredentials: true });
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      toast.success('Order deleted!');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order!');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;

  return (
    <div className="p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <TableContainer component={Paper} sx={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: 2,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}>
        <Typography variant="h4" gutterBottom component="div" sx={{
          padding: 2,
          fontWeight: 'bold',
          color: '#4F46E5', 
          textAlign: 'center',
          letterSpacing: 1,
        }}>
          🛒 Admin Orders
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>₹{order.totalAmount}</TableCell>
                <TableCell>
                  <Select
                    value={order.orderStatus}
                    onChange={(e) => handleorderStatusChange(order._id, e.target.value)}
                    size="small"
                    sx={{ minWidth: 120, backgroundColor: '#EEF2FF', borderRadius: '10px' }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(order._id)}
                    sx={{ borderRadius: '8px' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminOrders;
