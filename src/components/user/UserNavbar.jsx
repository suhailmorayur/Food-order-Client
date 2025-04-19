import { Link, Outlet } from 'react-router';
import { Disclosure } from "@headlessui/react";
import { FaHome, FaUtensils, FaStore, FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import axios from 'axios';

const navLinks = [
  { name: "Home", path: "/user/dashboard", icon: <FaHome /> },
  { name: "Browse Menu", path: "menu", icon: <FaUtensils /> },
  { name: "Restaurants", path: "/user/restaurants", icon: <FaStore /> },
  { name: "Cart", path: "/user/cart", icon: <FaShoppingCart /> },
 
];

const UserNavbar = () => {
  // const handleLogout = () => {
  //   // Implement logout logic
  //   localStorage.removeItem('token');
  //   window.location = '/login';
  // };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/user/logout", {
        withCredentials: true,
      });
  
      // Redirect or update state
      window.location = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
  
<header>
<Disclosure as="nav" className="bg-white border-b border-gray-300 shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo - Left */}
              <div className="flex-shrink-0">
                <Link to="/user/dashboard">
                  <img src="/Logo.png" alt="Logo" className="h-10" />
                </Link>
              </div>

              {/* Center Nav Links */}
              <div className="hidden md:flex space-x-4 mx-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative flex items-center px-3 py-2 rounded border text-sm font-medium
                      ${
                        location.pathname === link.path
                          ? "bg-gray-200 text-black border-gray-400"
                          : "text-black border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {link.icon && <span className="mr-2">{link.icon}</span>}
                    {link.name}
                    {link.badge && cartCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Profile + Logout - Right */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/user/profile"
                  className="text-black border border-gray-300 px-3 py-2 rounded hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 border border-red-500"
                >
                  Logout
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Disclosure.Button className="text-gray-700 focus:outline-none">
                  {open ? <HiX size={28} /> : <HiMenu size={28} />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Panel */}
          <Disclosure.Panel className="md:hidden px-4 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block relative px-3 py-2 rounded border text-sm font-medium
                  ${
                    location.pathname === link.path
                      ? "bg-gray-200 text-black border-gray-400"
                      : "text-black border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {link.icon && <span className="mr-2 inline-block">{link.icon}</span>}
                {link.name}
                {link.badge && cartCount > 0 && (
                  <span className="absolute top-1 right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            ))}
            <Link
              to="/user/profile"
              className="block text-black border border-gray-300 px-3 py-2 rounded hover:bg-gray-100"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 border border-red-500"
            >
              Logout
            </button>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
</header>

 
  );

};
export default UserNavbar