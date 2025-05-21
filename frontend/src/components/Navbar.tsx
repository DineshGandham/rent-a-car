import React from "react";
import { Link } from "react-router-dom";
import useNavbar from "../hooks/layout/useNavbar";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiUser, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const {
    isLoggedIn,
    userName,
    userInitials,
    dropdownOpen,
    toggleDropdown,
    closeDropdown,
    handleLogout,
    isMobileMenuOpen,
    toggleMobileMenu
  } = useNavbar();

  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-lg z-50">
      <div className="flex justify-between items-center py-4 px-6 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">
            CAR<span className="text-red-600">|RENTAL</span>
          </h1>
          <p className="hidden sm:block text-sm text-gray-500">
            TOP CAR RENTAL DEALS - SAVE BIG!
          </p>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-red-600">
            Home
          </Link>
          <Link to="/bookings" className="text-gray-700 hover:text-red-600">
            Bookings
          </Link>
          <Link to="/vehicles" className="text-gray-700 hover:text-red-600">
            Vehicles
          </Link>
          {!isLoggedIn ? (
            <Link to="/login" className="text-gray-700 hover:text-red-600">
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-red-400 text-white flex items-center justify-center font-semibold shadow-md ring-2 ring-red-300 hover:ring-red-500 transition-all duration-200">
                  {userInitials}
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl py-2 z-50">
                  <div className="px-4 py-3 border-b flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-red-400 text-white flex items-center justify-center font-semibold shadow-inner">
                      {userInitials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium text-sm">
                        {userName}
                      </span>
                      <span className="text-gray-400 text-xs">
                        Welcome back
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={closeDropdown}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50 transition-colors"
                  >
                    <FiUser className="text-gray-500" />
                    <span className="text-sm">Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="text-gray-500" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-50">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes className="text-2xl text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars className="text-2xl text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden mx-4 mt-2 rounded-xl flex flex-col gap-3 bg-white/95 shadow-xl backdrop-blur-md border border-gray-200 pb-4 px-4"
          >
            {/* User Info Card */}
            {isLoggedIn && (
              <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-100 via-red-50 to-white shadow-inner">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-red-400 text-white flex items-center justify-center text-lg font-semibold ring-2 ring-red-200 shadow-sm">
                  {userInitials}
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-semibold">
                    {userName}
                  </span>
                  <span className="text-xs text-gray-500">Welcome back</span>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex flex-col px-6 gap-1 text-gray-700">
              <Link
                to="/"
                onClick={toggleMobileMenu}
                className="py-2 hover:text-red-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/bookings"
                onClick={toggleMobileMenu}
                className="py-2 hover:text-red-600 transition-colors"
              >
                Bookings
              </Link>
              <Link
                to="/vehicles"
                onClick={toggleMobileMenu}
                className="py-2 hover:text-red-600 transition-colors"
              >
                Vehicles
              </Link>

              {isLoggedIn ? (
                <>
                  <div className="border-t border-gray-200 my-2" />
                  <Link
                    to="/profile"
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-2 py-2 text-sm hover:text-red-600 transition-colors"
                  >
                    <FiUser className="text-gray-500" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="flex items-center gap-2 text-left w-full py-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <FiLogOut className="text-gray-500" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="py-2 hover:text-red-600 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </header>
  );
};

export default Navbar;
