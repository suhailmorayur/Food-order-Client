import { Link } from 'react-router';

const AdminNavbar = () => {
  const handleLogout = () => {
    // Implement logout logic
    localStorage.removeItem('token');
    window.location = '/login';
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="text-xl font-bold text-white">
              Admin Dashboard
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/users"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
            >
              Users
            </Link>
            <Link
              to="/admin/settings"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default AdminNavbar