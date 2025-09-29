// "use client";
// import React, { useState } from "react";

// const Page = () => {
//   const initialData = {
//     productName: "Fair-25",
//     totalLevels: 4,
//     level1Unit: {
//       unitName: "truck",
//       totalQuantity: 10,
//       totalPrice: 150000000,
//     },
//     level2Unit: {
//       unitName: "peti",
//       perLevel1UnitQuantity: 100, // 1 peti = 100 patta
//       totalQuantity: 1000,
//       pointer: 1000, // running balance
//     },
//     level3Unit: {
//       unitName: "patta",
//       perLevel2UnitQuantity: 100, // 1 patta = 4 pcs
//       totalQuantity: 100000,
//       pointer: 100000,
//     },
//     level4Unit: {
//       unitName: "pcs",
//       perLevel3UnitQuantity: 5,
//       totalQuantity: 500000,
//       pointer: 500000,
//     },
//   };

//   const [stock, setStock] = useState(initialData);
//   const [selectedUnit, setSelectedUnit] = useState("peti");
//   const [userInputQuantity, setUserInputQuantity] = useState(0);

//   // Dynamically build array of units for select dropdown
//   const unitsArray = Array.from({ length: stock.totalLevels }, (_, i) => {
//     const levelKey = `level${i + 1}Unit`;
//     const unitObj = stock[levelKey];
//     return {
//       level: i + 1,
//       key: levelKey,
//       unit: unitObj.unitName,
//       quantity: unitObj.totalQuantity,
//     };
//   });

//   const calculateStock = () => {
//     const levelKey = Object.keys(stock).find(
//       (k) => stock[k]?.unitName === selectedUnit
//     );
//     if (!levelKey) return;

//     const currentLevel = Number(levelKey.match(/\d+/)[0]); // get level number

//     setStock((prev) => {
//       const updated = { ...prev };
//       const soldQty = userInputQuantity;
//       const currentUnit = updated[levelKey];

//       if (soldQty > currentUnit.totalQuantity) {
//         alert("Not enough stock!");
//         return prev;
//       }

//       // 🔹 Reduce current unit
//       currentUnit.totalQuantity -= soldQty;

//       // 🔹 Recursive child reduction
//       const reduceChildUnits = (level, quantity) => {
//         const childLevel = level + 1;
//         const childKey = `level${childLevel}Unit`;
//         const childUnit = updated[childKey];
//         if (!childUnit) return;

//         const perUnitQty =
//           childUnit[`perLevel${level}UnitQuantity`] ||
//           childUnit.perLevel1UnitQuantity ||
//           1;

//         const reduction = quantity * perUnitQty;

//         childUnit.totalQuantity -= reduction;

//         // 🔹 Adjust pointer properly
//         if (childUnit.pointer - childUnit.totalQuantity >= perUnitQty) {
//           const multiples = Math.floor(
//             (childUnit.pointer - childUnit.totalQuantity) / perUnitQty
//           );
//           childUnit.pointer -= multiples * perUnitQty;
//         }

//         // Recurse further
//         reduceChildUnits(childLevel, reduction);
//       };

//       reduceChildUnits(currentLevel, soldQty);

//       // 🔹 Cascade parent reduction (pointer logic)
//       const reduceParentUnits = (level) => {
//         const currentKey = `level${level}Unit`;
//         const currentUnit = updated[currentKey];
//         const parentLevel = level - 1;
//         if (parentLevel < 1) return;

//         const parentKey = `level${parentLevel}Unit`;
//         const parentUnit = updated[parentKey];

//         const perUnitQty =
//           currentUnit[`perLevel${parentLevel}UnitQuantity`] ||
//           currentUnit.perLevel1UnitQuantity;

//         const consumed = currentUnit.pointer - currentUnit.totalQuantity;
//         const reduceFromParent = Math.floor(consumed / perUnitQty);

//         if (reduceFromParent > 0) {
//           parentUnit.totalQuantity -= reduceFromParent;
//           currentUnit.pointer -= reduceFromParent * perUnitQty; // proper pointer decrement
//         }

//         reduceParentUnits(parentLevel);
//       };

//       reduceParentUnits(currentLevel);

//       return updated;
//     });
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">{stock.productName} - Units</h2>

//       <div className="mb-2">
//         Quantity:{" "}
//         <input
//           type="number"
//           min={0}
//           value={userInputQuantity}
//           onChange={(e) => setUserInputQuantity(Number(e.target.value))}
//           className="border-[2px] border-black px-2 py-1"
//         />
//       </div>

//       <div className="mb-2">
//         Select Unit:{" "}
//         <select
//           value={selectedUnit}
//           onChange={(e) => setSelectedUnit(e.target.value)}
//           className="border border-black px-2 py-1"
//         >
//           {unitsArray.map((u, idx) => (
//             <option key={idx} value={u.unit}>
//               {u.unit} (Qty: {u.quantity})
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         onClick={calculateStock}
//         className="bg-blue-500 text-white px-4 py-1 rounded"
//       >
//         Update Stock
//       </button>

//       <pre className="mt-4 p-2 bg-gray-100 border">
//         {JSON.stringify(stock, null, 2)}
//       </pre>
//     </div>
//   );
// };

// export default Page;

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

  // const calculateStock = () => {
  //   setStock((prev) => {
  //     const updated = { ...prev };
  //     const soldQty = userInputQuantity;

  //     // Find the index of the selected unit
  //     const unitIndex = updated.units.findIndex(
  //       (u) => u.unitName === selectedUnit
  //     );
  //     if (unitIndex === -1) return prev;

  //     const currentUnit = updated.units[unitIndex];
  //     if (soldQty > currentUnit.totalQuantity) {
  //       alert("Not enough stock!");
  //       return prev;
  //     }

  //     // 🔹 Reduce current unit
  //     currentUnit.totalQuantity -= soldQty;

  //     const difference = currentUnit.pointer - currentUnit.totalQuantity;

  //     const a = Math.floor(difference / currentUnit.perParentQuantity);

  //     if (a >= 1) {
  //       currentUnit.pointer -= currentUnit.perParentQuantity * a;
  //     }

  //     // alert("currentUnit : " + JSON.stringify(currentUnit));

  //     // alert("unit Index : " + unitIndex);

  //     // alert("units length : " + updated.units.length);

  //     let t = 1; // start with 1 for multiplication

  //     for (let i = unitIndex + 1; i <= updated.units.length - 1; i++) {
  //       // alert("updated.units[i] : " + JSON.stringify(updated.units[i]));

  //       t *= updated.units[i].perParentQuantity;

  //       // alert("t: " + t);
  //       // alert("i: " + i);

  //       updated.units[i] = {
  //         ...updated.units[i],
  //         totalQuantity: updated.units[i].totalQuantity - soldQty * t,
  //       };

  //       const currentUnit = updated.units[i];

  //       const difference = currentUnit.pointer - currentUnit.totalQuantity;

  //       const a = Math.floor(difference / currentUnit.perParentQuantity);

  //       if (a >= 1) {
  //         currentUnit.pointer -= currentUnit.perParentQuantity * a;
  //       }
  //     }

  //     const func = () => {
  //       if (a >= 1) {
  //         const currentUnit = updated.units[i];
  //         currentUnit.totalQuantity -= a;
  //         const b = Math.floor(a / currentUnit.perParentQuantity);
  //         if (b > 1) {
  //           currentUnit.pointer -= currentUnit.perParentQuantity * b;
  //           const upperUnit = updated.units[i - 1];
  //           upperUnit.totalQuantity -= b;
  //           const d = Math.floor(b / upperUnit.perParentQuantity);
  //           if(d>1){

  //           }
  //           // const c = Math.floor()
  //         }
  //       }
  //     };

  //     // alert("updated : " + JSON.stringify(updated));

  //     return updated;
  //   });
  // };

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
