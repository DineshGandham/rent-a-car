import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import ReservationForm from '../home/ReservationForm';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const carImages = [
  '/images/car1.png',
  '/images/car2.png',
  '/images/car3.png',
  '/images/car4.png',
  '/images/car5.png',
];

const HeroSection = () => {
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
    <section className="flex flex-col md:flex-row min-h-screen items-center justify-center px-6 py-12 gap-12 overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <ReservationForm />
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">LUXURY CARS FROM ₹10,000/DAY</h1>
        <p className="mb-6 text-gray-300">Treat yourself in INDIA</p>
        <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
          <Slider {...settings}>
            {carImages.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Car ${index + 1}`} className="w-full object-cover" />
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
