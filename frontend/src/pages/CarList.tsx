import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const CarList = () => {
  const carImages = [
    '/images/car1.png',
    '/images/car2.png',
    '/images/car3.png',
    '/images/car4.png',
    '/images/car5.png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="flex flex-col md:flex-row bg-gradient-to-r from-gray-800 to-gray-700 min-h-screen items-center justify-center px-4 md:px-8 py-8 md:py-12 gap-12 overflow-hidden">
      
      {/* Left Form */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}
        className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-gray-700 text-center md:text-left">
          Select your car type
        </h2>

        <form className="flex flex-col gap-4">
          {/* Pick-up Location */}
          <div className="transition-all duration-300 hover:scale-105">
            <label className="block text-gray-600 mb-1">Pick-up</label>
            <input
              type="text"
              placeholder="Enter a City or Airport"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 transition-colors duration-300"
            />
            <small className="text-xs text-gray-500">Need a different drop-off location?</small>
          </div>

          {/* Pick-up Date/Time */}
          <div className="flex flex-col sm:flex-row gap-2 transition-all duration-300 hover:scale-105">
            <input
              type="date"
              className="w-full sm:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 transition-colors duration-300"
            />
            <input
              type="time"
              className="w-full sm:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 transition-colors duration-300"
            />
          </div>

          {/* Drop-off Date/Time */}
          <div className="flex flex-col sm:flex-row gap-2 transition-all duration-300 hover:scale-105">
            <input
              type="date"
              className="w-full sm:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 transition-colors duration-300"
            />
            <input
              type="time"
              className="w-full sm:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 transition-colors duration-300"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-2 md:mt-4 transition-all duration-300"
          >
            CONTINUE CAR RESERVATION
          </motion.button>
        </form>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 flex flex-col items-center text-center"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4">
          LUXURY CARS FROM 10,000/DAY
        </h1>
        <p className="text-sm sm:text-base text-gray-300 mb-6">
          Treat yourself in INDIA
        </p>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          <Slider {...settings}>
            {carImages.map((image, index) => (
              <div key={index}>
                <img 
                  src={image} 
                  alt={`Car ${index + 1}`} 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>

    </section>
  );
};

export default CarList;
