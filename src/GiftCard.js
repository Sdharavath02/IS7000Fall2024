// src/components/GiftCard/GiftCard.js
import React from "react";

const GiftCard = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-3xl font-bold text-center mb-4">Gift Card</h2>
      <p className="text-lg text-gray-700 text-center mb-6">Give the gift of choice with our gift cards!</p>
      <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
        Buy Gift Card
      </button>
    </div>
  );
};

export default GiftCard;
