import { Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useReservation } from '../../hooks/Home/useReservation';

const customDatePickerStyles = {
  control: {
    borderColor: '#dc2626',
    '&:hover': {
      borderColor: '#b91c1c',
    },
  },
  daySelected: {
    backgroundColor: '#dc2626',
    color: 'white',
  },
  timeList: {
    backgroundColor: 'white',
  },
  timeListItemHover: {
    backgroundColor: '#f87171',
    color: 'white',
  },
};

const ReservationForm = () => {
    const { register, handleSubmit, onSubmit, errors,control,pickupDate } = useReservation();
  return (
    <>
      <style>{`
        /* Override react-datepicker default styles */
        .react-datepicker {
          font-family: 'Inter', sans-serif;
          border: 1px solid #dc2626; /* red-600 */
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
          border-radius: 0.5rem;
        }
        .react-datepicker__header {
          background-color: #dc2626; /* red-600 */
          border-bottom: none;
          color: white;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #dc2626 !important;
          color: white !important;
          border-radius: 0.5rem;
        }
        .react-datepicker__day:hover {
          background-color: #f87171; /* red-400 */
          color: white;
          border-radius: 0.5rem;
        }
        .react-datepicker__time-container {
          border-left: 1px solid #dc2626;
          background-color: white;
        }
        .react-datepicker__time-list-item:hover {
          background-color: #f87171; /* red-400 */
          color: white;
          font-weight: 600;
        }

        /* Responsive tweaks */
        @media (max-width: 640px) {
          form {
            padding: 0 1rem;
          }
          .react-datepicker {
            font-size: 0.9rem;
          }
          .react-datepicker__header {
            font-size: 1rem;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white text-gray-800 p-6 sm:p-8 rounded-lg shadow-lg max-w-md mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Car Reservation</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Locations */}
          <div>
            <label
              className="block mb-1 font-medium text-gray-600"
              htmlFor="pickupLocation"
            >
              Pick-up Location
            </label>
            <input
              id="pickupLocation"
              {...register('pickupLocation')}
              placeholder="Enter a City or Airport"
              className={`w-full p-3 border rounded ${
                errors.pickupLocation ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition`}
            />
            {errors.pickupLocation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pickupLocation.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block mb-1 font-medium text-gray-600"
              htmlFor="dropoffLocation"
            >
              Drop-off Location
            </label>
            <input
              id="dropoffLocation"
              {...register('dropoffLocation')}
              placeholder="Enter a City or Airport"
              className={`w-full p-3 border rounded ${
                errors.dropoffLocation ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition`}
            />
            {errors.dropoffLocation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dropoffLocation.message}
              </p>
            )}
            <small className="text-xs text-gray-500">
              If different from pick-up location
            </small>
          </div>

          {/* Pick-up Date & Time */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label
                className="block mb-1 font-medium text-gray-600"
                htmlFor="pickupDate"
              >
                Pick-up Date
              </label>
              <Controller
                control={control}
                name="pickupDate"
                render={({ field }) => (
                  <DatePicker
                    id="pickupDate"
                    placeholderText="Select pick-up date"
                    selected={field.value}
                    onChange={field.onChange}
                    minDate={new Date()}
                    className={`w-full p-3 border rounded ${
                      errors.pickupDate ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition`}
                    dateFormat="MMMM d, yyyy"
                  />
                )}
              />
              {errors.pickupDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pickupDate.message}
                </p>
              )}
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="block mb-1 font-medium text-gray-600"
                htmlFor="pickupTime"
              >
                Pick-up Time
              </label>
              <Controller
                control={control}
                name="pickupTime"
                render={({ field }) => (
                  <DatePicker
                    id="pickupTime"
                    selected={field.value}
                    onChange={field.onChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className={`w-full p-3 border rounded ${
                      errors.pickupTime ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition`}
                    placeholderText="Select pick-up time"
                  />
                )}
              />
              {errors.pickupTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pickupTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Drop-off Date & Time */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label
                className="block mb-1 font-medium text-gray-600"
                htmlFor="dropoffDate"
              >
                Drop-off Date
              </label>
              <Controller
                control={control}
                name="dropoffDate"
                render={({ field }) => (
                  <DatePicker
                    id="dropoffDate"
                    selected={field.value}
                    onChange={field.onChange}
                    minDate={pickupDate || new Date()}
                    className={`w-full p-3 border rounded ${
                      errors.dropoffDate ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition`}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select drop-off date"
                  />
                )}
              />
              {errors.dropoffDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dropoffDate.message}
                </p>
              )}
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="block mb-1 font-medium text-gray-600"
                htmlFor="dropoffTime"
              >
                Drop-off Time
              </label>
              <Controller
                control={control}
                name="dropoffTime"
                render={({ field }) => (
                  <DatePicker
                    id="dropoffTime"
                    selected={field.value}
                    onChange={field.onChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className={`w-full p-3 border rounded ${
                      errors.dropoffTime ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition`}
                    placeholderText="Select drop-off time"
                  />
                )}
              />
              {errors.dropoffTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dropoffTime.message}
                </p>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-6 w-full"
          >
            CONTINUE CAR RESERVATION
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};

export default ReservationForm;
