
import { useState } from 'react';
import { Link, useNavigate } from 'react-router'; 
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '', 
    role: 'user',
    inviteCode: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = formData.role === 'admin' 
        ? `${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/signup` 
        : `${import.meta.env.VITE_REACT_APP_API_URL}/api/user/signup`;

      const response = await axios.post(endpoint, formData, {
        withCredentials: true 
      });

      navigate(formData.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center  bg-gradient-to-br from-[#ff6b35]/90 via-[#f7c548]/90 to-[#f7c548]/90">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* Role Selector */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Invite Code (Admin only) */}
          {formData.role === 'admin' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Invite Code</label>
              <input
                type="text"
                value={formData.inviteCode}
                onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          )}

          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Mobile Field - Added this section */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mobile Number</label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="+1 234 567 890"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;