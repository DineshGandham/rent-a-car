import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-between items-center py-4 px-6 md:px-8 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/70 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
      } ${showNavbar ? 'translate-y-0' : '-translate-y-full'} transform`}
    >
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">
          CAR<span className="text-red-600">|RENTAL</span>
        </h1>
        <p className="hidden sm:block text-sm text-gray-500">TOP CAR RENTAL DEALS - SAVE BIG!</p>
      </div>

      <nav className="hidden md:flex gap-6">
        <Link to="/" className="text-gray-700 hover:text-red-600">Home</Link>
        <Link to="/bookings" className="text-gray-700 hover:text-red-600">Bookings</Link>
        <Link to="/vehicles" className="text-gray-700 hover:text-red-600">Vehicles</Link>
        <Link to="/login" className="text-gray-700 hover:text-red-600">Login</Link>
      </nav>

      <div className="md:hidden z-50">
        {menuOpen ? (
          <FaTimes className="text-2xl text-gray-700 cursor-pointer" onClick={toggleMenu} />
        ) : (
          <FaBars className="text-2xl text-gray-700 cursor-pointer" onClick={toggleMenu} />
        )}
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-white/90 backdrop-blur-md shadow-md flex flex-col items-center gap-6 py-6 origin-top transition-transform duration-300 transform overflow-y-auto max-h-[calc(100vh-64px)] ${
          menuOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-red-600 text-lg">Home</Link>
        <Link to="/bookings" onClick={closeMenu} className="text-gray-700 hover:text-red-600 text-lg">Bookings</Link>
        <Link to="/vehicles" onClick={closeMenu} className="text-gray-700 hover:text-red-600 text-lg">Vehicles</Link>
        <Link to="/login" onClick={closeMenu} className="text-gray-700 hover:text-red-600 text-lg">Login</Link>
      </div>
    </header>
  );
};

export default Navbar;
