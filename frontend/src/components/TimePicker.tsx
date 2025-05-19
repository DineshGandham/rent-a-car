import React from 'react';

const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    options.push(`${String(h).padStart(2, '0')}:00`);
    options.push(`${String(h).padStart(2, '0')}:30`);
  }
  return options.map(time => {
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return {
      label: `${String(hour).padStart(2, '0')}:${minute} ${parseInt(hour) >= 12 ? 'PM' : 'AM'}`,
      value: time,
    };
  });
};

const timeOptions = generateTimeOptions();

const TimePicker = ({ label, time, setTime }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label} Time</label>
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full p-3 border border-red-400 rounded bg-white text-gray-800 focus:outline-none focus:border-red-600 transition-colors duration-300 mt-2"
      >
        <option value="">{label} Time</option>
        {timeOptions.map((t, i) => (
          <option key={i} value={t.value}>{t.label}</option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;
