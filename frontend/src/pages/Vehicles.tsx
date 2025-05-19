import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const vehicles = [
  {
    name: 'VW Golf VII',
    price: 37.4,
    image: '/images/car1.png',
    specs: {
      model: 'Limousine',
      doors: 4,
      seats: 5,
      luggage: '2 Suitcases / 2 Bags',
      transmission: 'Automatic',
      airConditioning: 'Yes',
      minAge: '25 years',
    },
  },
  {
    name: 'Audi A1 S-LINE',
    price: 42.0,
    image: '/images/car2.png',
    specs: {
      model: 'Sedan',
      doors: 4,
      seats: 5,
      luggage: '2 Suitcases / 1 Bag',
      transmission: 'Automatic',
      airConditioning: 'Yes',
      minAge: '23 years',
    },
  },
];

const fadeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Vehicles = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700 px-6 md:px-12 py-12 gap-12 overflow-hidden">
      <motion.h1
        className="text-3xl md:text-4xl font-semibold text-white text-center drop-shadow-lg"
        initial="hidden"
        animate="visible"
        variants={fadeVariant}
      >
        Vehicle Models - <span className="font-normal text-gray-200">Our rental fleet at a glance</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
        {/* Sidebar */}
        <div className="bg-white/40 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg">
          {vehicles.map((car, i) => (
            <button
              key={car.name}
              className={`w-full text-left px-4 py-6 text-white text-lg border-b border-white/20 transition-all duration-300 ${
                selected === i
                  ? 'bg-red-600/80 font-semibold'
                  : 'hover:bg-white/20'
              }`}
              onClick={() => setSelected(i)}
            >
              {car.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={vehicles[selected].image}
              src={vehicles[selected].image}
              alt={vehicles[selected].name}
              className="w-full max-w-md object-cover rounded-lg shadow-xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariant}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
        </div>

        <motion.div
          className="bg-white/40 backdrop-blur-lg rounded-xl p-6 text-white shadow-xl"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariant}
          transition={{ duration: 0.4 }}
        >
          <div className="text-lg font-bold bg-red-600/80 rounded-md px-4 py-3 mb-4 text-center">
            ${vehicles[selected].price.toFixed(2)}{' '}
            <span className="text-sm font-normal">rent per day</span>
          </div>

          <table className="w-full text-sm mb-6">
            <tbody>
              {Object.entries(vehicles[selected].specs).map(([key, val]) => (
                <tr key={key} className="border-t border-white/20">
                  <td className="py-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </td>
                  <td className="py-2 text-right">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <motion.button
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaCalendarAlt className="text-white" />
            RESERVE NOW
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Vehicles;
