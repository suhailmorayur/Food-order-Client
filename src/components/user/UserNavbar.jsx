import { Link } from 'react-router';
import { Disclosure } from '@headlessui/react';
import { FaHome, FaUtensils, FaStore, FaShoppingCart, FaPercentage, FaUser } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCartCount } from "../../redux/slices/cartSlice"; // Adjust path as needed

const navLinks = [
  { name: "Home", path: "/user/dashboard", icon: <FaHome /> },
  { name: "Browse Menu", path: "menu", icon: <FaUtensils /> },
  { name: "Restaurants", path: "restaurants", icon: <FaStore /> },
  { name: "Coupons", path: "/user/coupons", icon: <FaPercentage /> },
  { name: "Profile", path: "profile", icon: <FaUser /> },
  { name: "Orders", path: "orders", icon: <FaPercentage /> },
  { name: "ContactUs", path: "contact", icon: <FaPercentage /> },

];

const UserNavbar = () => {
  const cartCount = useSelector(selectCartCount);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/user/logout", {
        withCredentials: true,
      });
      window.location = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Disclosure as="nav" className="bg-white border-b border-gray-300">
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
                  <div className="hidden md:flex flex-grow justify-center space-x-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`relative flex items-center px-3 py-2 rounded text-sm font-medium 
                          ${location.pathname === link.path ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}
                      >
                        {link.icon && <span className="mr-2">{link.icon}</span>}
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  {/* Profile + Logout - Right */}
                  <div className="hidden md:flex items-center space-x-4">
                  <Link to="cart" className="relative flex flex-col items-center text-gray-700 hover:text-blue-600">
  <FaShoppingCart size={15} />
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
      {cartCount}
    </span>
  )}
  <span className="text-xs">Cart</span>
</Link>

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
                    className={`block px-3 py-2 rounded text-sm font-medium
                      ${location.pathname === link.path ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-100'}`}
                  >
                    {link.icon && <span className="mr-2 inline-block">{link.icon}</span>}
                    {link.name}
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
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className=" fixed bottom-0 left-0 w-full bg-orange-500 rounded-tl-lg rounded-tr-lg border-t border-gray-300 shadow-md md:hidden">
        <div className="flex justify-around items-center py-2">
          <Link to="/user/dashboard" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
            <FaHome size={24} />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="cart" className="relative  flex flex-col items-center text-white hover:text-blue-600">
  <FaShoppingCart size={24} />
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
      {cartCount}
    </span>
  )}
  <span className="text-xs text-white">Cart</span>
</Link>

          <Link to="profile" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
            <FaUser size={24} />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserNavbar;
