import React from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'; // Use date-fns for formatting
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ label, date, setDate }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label} Date</label>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="dd/MM/yyyy"
        className="w-full p-3 border border-red-400 rounded bg-white text-gray-800 focus:outline-none focus:border-red-600 transition-colors duration-300 mt-2"
        placeholderText={`Select ${label} Date`}
      />
    </div>
  );
};

export default DatePickerComponent;
