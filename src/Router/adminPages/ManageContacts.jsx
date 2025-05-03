// src/pages/admin/ManageContacts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageContacts = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/contact`, {
          withCredentials: true, // needed if cookies/token stored in browser
        });
        setMessages(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load messages");
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="p-4 border rounded-lg shadow">
              <div className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</div>
              <p className="font-semibold">{msg.name} ({msg.email})</p>
              <p className="mt-2">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageContacts;
