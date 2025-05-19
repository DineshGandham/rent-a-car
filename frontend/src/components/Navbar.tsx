// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import useNavbar from '../hooks/layout/useNavbar';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const {
    isLoggedIn,
    userName,
    userInitials,
    dropdownOpen,
    toggleDropdown,
    closeDropdown,
    handleLogout,
  } = useNavbar();

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center py-4 px-6 md:px-8 z-50 bg-white/70 backdrop-blur-md shadow-lg">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">
          CAR<span className="text-red-600">|RENTAL</span>
        </h1>
        <p className="hidden sm:block text-sm text-gray-500">TOP CAR RENTAL DEALS - SAVE BIG!</p>
      </div>

      <nav className="hidden md:flex gap-6 items-center">
        <Link to="/" className="text-gray-700 hover:text-red-600">Home</Link>
        <Link to="/bookings" className="text-gray-700 hover:text-red-600">Bookings</Link>
        <Link to="/vehicles" className="text-gray-700 hover:text-red-600">Vehicles</Link>
        {!isLoggedIn ? (
          <Link to="/login" className="text-gray-700 hover:text-red-600">Login</Link>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                {userInitials}
              </div>
              <span className="text-gray-700 font-medium">{userName}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md py-2 z-10">
                <Link
                  to="/profile"
                  onClick={closeDropdown}
                  className="block px-4 py-2 text-gray-700 hover:bg-red-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Menu Icon (unchanged) */}
      <div className="md:hidden z-50">
        <FaBars className="text-2xl text-gray-700 cursor-pointer" />
      </div>
    </header>
  );
};

export default Navbar;
