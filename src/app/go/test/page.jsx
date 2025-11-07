"use client";

import React, { useRef, useState } from "react";

const MobileNavForm = () => {
  const fieldsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = Math.min(currentIndex + 1, fieldsRef.current.length - 1);
    fieldsRef.current[nextIndex]?.focus();
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    fieldsRef.current[prevIndex]?.focus();
    setCurrentIndex(prevIndex);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = Math.min(index + 1, fieldsRef.current.length - 1);
      fieldsRef.current[nextIndex]?.focus();
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Bill Form</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Product Name"
          ref={(el) => (fieldsRef.current[0] = el)}
          onKeyDown={(e) => handleKeyDown(e, 0)}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          ref={(el) => (fieldsRef.current[1] = el)}
          onKeyDown={(e) => handleKeyDown(e, 1)}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <input
          type="number"
          placeholder="Unit Price"
          ref={(el) => (fieldsRef.current[2] = el)}
          onKeyDown={(e) => handleKeyDown(e, 2)}
          className="w-full border px-3 py-2 rounded mb-2"
        />
      </div>

      <div className="fixed bottom-4 left-0 w-full px-4 flex justify-between bg-white py-2 border-t">
        <button
          onClick={handlePrev}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MobileNavForm;
