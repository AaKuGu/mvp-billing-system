"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const productsInDB = [
    { name: "Kaveri", price: 100 },
    { name: "Fair", price: 25 },
  ];

  const [items, setItems] = useState([{ name: "", price: "" }]);

  // Handle name change
  const handleNameChange = (index, value) => {
    const newItems = [...items];
    newItems[index].name = value;

    // check if product exists in DB
    const foundProduct = productsInDB.find(
      (p) => p.name.toLowerCase() === value.toLowerCase()
    );
    if (foundProduct) {
      newItems[index].price = foundProduct.price; // override with DB price
    }
    setItems(newItems);
  };

  // Handle price change
  const handlePriceChange = (index, value) => {
    const newItems = [...items];
    newItems[index].price = value;
    setItems(newItems);
  };

  // Add new row
  const addRow = () => {
    setItems([...items, { name: "", price: "" }]);
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-xl font-bold">Product Test Page</h1>

      {items.map((item, i) => (
        <div key={i} className="flex gap-4 items-end border p-3 rounded">
          {/* Product Name */}
          <div className="flex-1">
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleNameChange(i, e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div className="flex-1">
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => handlePriceChange(i, e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter price"
            />
          </div>
        </div>
      ))}

      {/* Add new product row button */}
      <button
        onClick={addRow}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        {/* <Plus size={18} /> */}
        Add Product
      </button>

      {/* Debug output */}
      <pre className="bg-gray-100 p-3 rounded mt-4">
        {JSON.stringify(items, null, 2)}
      </pre>
    </div>
  );
};

export default Page;
