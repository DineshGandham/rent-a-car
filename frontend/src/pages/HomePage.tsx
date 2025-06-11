import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import ReviewsSection from '../components/home/ReviewsSection';
import FooterCTA from '../components/home/FooterCTA';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ReviewsSection />
      <FooterCTA />
    </div>
  );
};

export default HomePage;