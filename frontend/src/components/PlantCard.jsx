import React from "react";

const PlantCard = ({ plant, toggleAvailability }) => {
  return (
    <div className="bg-green-100 rounded-xl shadow-md p-4 flex flex-col items-center">
      {/* Plant Image */}
      <img
  src={plant.image}
  alt={plant.name}
  className="w-full h-40 object-cover rounded-md mb-3"
/>


      {/* Plant Name */}
      <h2 className="text-2xl font-bold text-center">{plant.name}</h2>

      {/* Price */}
      <p className="text-green-700 font-semibold">${plant.price.toFixed(2)}</p>

      {/* Description */}
      <p className="text-sm text-gray-700 text-center mt-1">{plant.description}</p>

      {/* Availability Badge + Button */}
      <div className="mt-3 w-full flex flex-col items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm mb-2 ${
            plant.available ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
          }`}
        >
          {plant.available ? "In Stock" : "Out of Stock"}
        </span>
        <button
          onClick={() => toggleAvailability(plant.id)}
          className={`w-full px-4 py-2 rounded-lg font-semibold ${
            plant.available
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {plant.available ? "Mark as Out of Stock" : "Mark as In Stock"}
        </button>
      </div>
    </div>
  );
};

export default PlantCard;
