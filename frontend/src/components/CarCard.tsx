const CarCard = ({ car }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={car.imageUrl} alt={car.brand} className="h-48 w-full object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{car.brand} {car.model}</h2>
          <p className="text-gray-600">${car.pricePerDay}/day</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    );
  };
  
  export default CarCard;
  