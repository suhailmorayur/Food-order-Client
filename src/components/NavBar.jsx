import React from 'react';
import { Link } from 'react-router';

function NavBar(props) {
    return (
<div className=' bg-gray-800'>
    <nav className="flex items-center justify-between p-4 text-white max-w-screen-xl mx-auto">
        <img src="/Logo.png" alt="Logo" className="h-10" />
        <div className="space-x-4 hidden md:flex">
            <Link 
                to="/login" 
                className="px-6 py-2 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            >
                Login
            </Link>
            <Link 
                to="/signup" 
                className="px-6 py-2 text-lg font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-300"
            >
                SignUp
            </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button className="text-white">
                <i className="fas fa-bars"></i> 
            </button>
        </div>
    </nav>

    {/* Mobile Links (will show when hamburger is clicked) */}
    <div className="md:hidden bg-gray-800 text-white space-y-4 p-4">
        <Link 
            to="/login" 
            className="block px-6 py-2 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
        >
            Login
        </Link>
        <Link 
            to="/signup" 
            className="block px-6 py-2 text-lg font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-300"
        >
            SignUp
        </Link>
    </div>
</div>


    
    
    );
}

export default NavBar;