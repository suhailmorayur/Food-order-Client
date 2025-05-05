import { NavLink } from 'react-router';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const AdminNavbar = () => {
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/logout` , {
        withCredentials: true,
      });
      window.location = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinks = [
    { name: 'Profile', to: '/admin/profile' },
    { name: 'Add Foods', to: 'addfoods' },
    { name: 'Foods List', to: 'footlist' },
    { name: 'Add Restaurants', to: 'add-restaurant' },
    { name: 'Get Users', to: '/admin/users' },
    { name: 'Restaurant List', to: 'restaurant-list' },
  ];

  const getLinkClass = ({ isActive }) =>
    isActive
      ? 'bg-gray-900 text-white px-3 py-2 rounded-md'
      : 'text-gray-300 hover:text-white px-3 py-2 rounded-md';

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <NavLink to="/admin/dashboard" className="text-white font-bold text-xl">
                <img src="/Logo.png" alt="Logo" className="h-10" />
                </NavLink>
              </div>

              <div className="hidden md:flex space-x-4 items-center">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    className={getLinkClass}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>

              <div className="md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Disclosure.Button
                  key={link.name}
                  as={NavLink}
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? 'block bg-gray-900 text-white px-3 py-2 rounded-md'
                      : 'block text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md'
                  }
                >
                  {link.name}
                </Disclosure.Button>
              ))}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default AdminNavbar;
