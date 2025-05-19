import React from 'react';
import { motion } from 'framer-motion';

const bookings = [
  {
    id: 1,
    car: 'BMW X5',
    image: '/images/car1.png',
    pickup: 'Mumbai Airport',
    dropoff: 'Pune City',
    date: '2025-05-10',
    time: '10:00 AM',
    status: 'Confirmed',
  },
  {
    id: 2,
    car: 'Audi A4',
    image: '/images/car2.png',
    pickup: 'Delhi Airport',
    dropoff: 'Gurgaon Sector 21',
    date: '2025-06-01',
    time: '2:30 PM',
    status: 'Pending',
  },
  {
    id: 3,
    car: 'Mercedes C-Class',
    image: '/images/car3.png',
    pickup: 'Bangalore',
    dropoff: 'Mysore',
    date: '2025-06-15',
    time: '9:00 AM',
    status: 'Cancelled',
  },
];

const statusColors = {
  Confirmed: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const Booking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 pt-16 p-4 sm:p-6 md:p-8">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Bookings
      </motion.h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {bookings.map((booking, i) => (
          <motion.div
            key={booking.id}
            className="bg-white/80 text-gray-800 rounded-lg shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={booking.image}
              alt={booking.car}
              className="w-full sm:w-32 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold">{booking.car}</h2>
              <p className="text-sm">
                <strong>Pickup:</strong> {booking.pickup}
              </p>
              <p className="text-sm">
                <strong>Drop-off:</strong> {booking.dropoff}
              </p>
              <p className="text-sm">
                <strong>Date:</strong> {booking.date} | <strong>Time:</strong> {booking.time}
              </p>
            </div>

            <span
              className={`inline-block mt-2 sm:mt-0 px-3 py-1 text-sm font-semibold rounded-full ${statusColors[booking.status]}`}
            >
              {booking.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
