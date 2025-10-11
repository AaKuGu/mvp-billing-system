"use client";
import React, { useState } from "react";

const Page = () => {
  const initialData = {
    productName: "Fair-25",
    units: [
      {
        level: 1,
        unitName: "Truck",
        perParentQuantity: null,
        totalQuantity: 10,
        totalCost: 1500000,
        pointer: null,
      },
      {
        level: 2,
        unitName: "Peti",
        perParentQuantity: 10,
        totalQuantity: 100,
        pointer: 100,
      },
      {
        level: 3,
        unitName: "Patta",
        perParentQuantity: 10,
        totalQuantity: 1000,
        pointer: 1000,
      },
      {
        level: 4,
        unitName: "Pcs",
        perParentQuantity: 10,
        totalQuantity: 10000,
        pointer: 10000,
      },
    ],
  };

  const [stock, setStock] = useState(initialData);
  const [selectedUnit, setSelectedUnit] = useState("Peti");
  const [userInputQuantity, setUserInputQuantity] = useState(0);

  // Build units array for dropdown (level1Unit + subUnits)
  // Build units array for dropdown
  const unitsArray = stock.units.map((u, idx) => ({
    level: u.level,
    key: `unit-${idx}`,
    unit: u.unitName,
    quantity: u.totalQuantity,
  }));

  const calculateStock = () => {
    setStock((prev) => {
      const updated = { ...prev };
      const soldQty = userInputQuantity;

      // Find the index of the selected unit
      const unitIndex = updated.units.findIndex(
        (u) => u.unitName === selectedUnit
      );
      if (unitIndex === -1) return prev;

      const currentUnit = updated.units[unitIndex];
      if (soldQty > currentUnit.totalQuantity) {
        alert("Not enough stock!");
        return prev;
      }

      // 🔹 Reduce current unit
      currentUnit.totalQuantity -= soldQty;

      const difference = currentUnit.pointer - currentUnit.totalQuantity;
      const a = Math.floor(difference / currentUnit.perParentQuantity);

      if (a >= 1) {
        currentUnit.pointer -= currentUnit.perParentQuantity * a;
      }

      let t = 1; // start with 1 for multiplication

      for (let i = unitIndex + 1; i <= updated.units.length - 1; i++) {
        t *= updated.units[i].perParentQuantity;

        updated.units[i] = {
          ...updated.units[i],
          totalQuantity: updated.units[i].totalQuantity - soldQty * t,
        };

        const currentUnit = updated.units[i];

        const difference = currentUnit.pointer - currentUnit.totalQuantity;

        const a = Math.floor(difference / currentUnit.perParentQuantity);

        if (a >= 1) {
          currentUnit.pointer -= currentUnit.perParentQuantity * a;
        }
      }
      const upperIndexStart = unitIndex - 1;

      const func = (a, index) => {
        if (index < 0) {
          return;
        }

        const current = updated.units[index];
        current.totalQuantity -= a;
        const difference = current.pointer - current.totalQuantity;
        const b = Math.floor(difference / current.perParentQuantity);

        if (b >= 1) {
          current.pointer -= b * current.perParentQuantity;
          func(b, index - 1);
        }
      };
      func(a, upperIndexStart);

      // alert("updated : " + JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{stock.productName} - Units</h2>

      <div className="mb-2">
        Quantity:{" "}
        <input
          type="number"
          min={0}
          value={userInputQuantity}
          onChange={(e) => setUserInputQuantity(Number(e.target.value))}
          className="border-[2px] border-black px-2 py-1"
        />
      </div>

      <div className="mb-2">
        Select Unit:{" "}
        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          className="border border-black px-2 py-1"
        >
          {unitsArray.map((u, idx) => (
            <option key={idx} value={u.unit}>
              {u.unit} (Qty: {u.quantity})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={calculateStock}
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Update Stock
      </button>

      <pre className="mt-4 p-2 bg-gray-100 border">
        {JSON.stringify(stock, null, 2)}
      </pre>
    </div>
  );
};

export default Page;
