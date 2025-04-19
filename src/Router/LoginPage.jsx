import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3000/api/user/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, role }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message);

//       // Redirect based on role
//       role === 'admin' ? navigate('/admin/dashboard') : navigate('/user/dashboard');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === 'admin'
        ? 'http://localhost:3000/api/admin/login'
        : 'http://localhost:3000/api/user/login';
    
      const response = await axios.post(
        endpoint,
        { email, password, role },
        { withCredentials: true }
      );
    
      navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
    }
    
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center  bg-gradient-to-br from-[#ff6b35]/90 via-[#f7c548]/90 to-[#f7c548]/90">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage ;