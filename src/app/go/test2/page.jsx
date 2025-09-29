"use client";
import React, { useState } from "react";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    level1Unit: {
      unitName: "",
      totalQuantity: 0,
      totalPrice: 0,
    },
    subUnits: [],
  });

  const [subUnits, setSubUnits] = useState([]);

  // Handle main product details
  const handleChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      level1Unit: { ...prev.level1Unit, [field]: value },
    }));
  };

  // Add new sub-unit
  const addSubUnit = () => {
    setSubUnits((prev) => [...prev, { unitName: "", perParentQuantity: 0 }]);
  };

  // Update sub-unit
  const handleSubUnitChange = (index, field, value) => {
    const updated = [...subUnits];
    updated[index][field] = value;
    setSubUnits(updated);
  };

  // Calculate live preview
  const getProcessedSubUnits = () => {
    let parentQty = product.level1Unit.totalQuantity;
    return subUnits.map((su, idx) => {
      const totalQuantity = parentQty * su.perParentQuantity;
      parentQty = totalQuantity; // cascade to next level
      return {
        level: idx + 2,
        unitName: su.unitName,
        perParentQuantity: Number(su.perParentQuantity),
        totalQuantity,
        pointer: totalQuantity,
      };
    });
  };

  const saveProduct = () => {
    if (!product.level1Unit.unitName || !product.level1Unit.totalQuantity) {
      alert("Please enter product details first");
      return;
    }

    // Build the final structure
    const units = [
      {
        level: 1,
        unitName: product.level1Unit.unitName,
        perParentQuantity: null,
        totalQuantity: Number(product.level1Unit.totalQuantity),
        totalCost: Number(product.level1Unit.totalPrice),
        pointer: null,
      },
      ...getProcessedSubUnits(),
    ];

    const finalProduct = {
      productName: product.productName,
      units,
    };

    console.log("✅ Final Product:", finalProduct);
    alert("✅ Product saved! Check console.");
  };

  const previewUnits = getProcessedSubUnits();

  // Explanatory text for sub-unit form
  const getInstruction = (idx) => {
    if (idx === 0) {
      return `प्रत्येक ${
        product.level1Unit.unitName || "मुख्य यूनिट"
      } के छोटे units का विवरण भरें`;
    }
    const prevUnit = subUnits[idx - 1]?.unitName || `लेवल ${idx + 1} यूनिट`;
    return `प्रत्येक ${prevUnit} के छोटे units का विवरण भरें`;
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">प्रोडक्ट बनाइए</h2>

      {/* Product Name */}
      <div className="mb-3">
        <label className="block font-medium">प्रोडक्ट का नाम</label>
        <input
          type="text"
          value={product.productName}
          onChange={(e) =>
            setProduct({ ...product, productName: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>

      {/* Level 1 Unit */}
      <div className="mb-3">
        <label className="block font-medium">मुख्य यूनिट का नाम</label>
        <input
          type="text"
          value={product.level1Unit.unitName}
          onChange={(e) => handleChange("unitName", e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">मुख्य यूनिट की Quantity</label>
        <input
          type="number"
          value={product.level1Unit.totalQuantity}
          onChange={(e) =>
            handleChange("totalQuantity", Number(e.target.value))
          }
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">कुल कीमत (Total Price)</label>
        <input
          type="number"
          value={product.level1Unit.totalPrice}
          onChange={(e) => handleChange("totalPrice", Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      {/* Sub Units */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">सब यूनिट्स</h3>
        {subUnits.map((su, idx) => (
          <div key={idx} className="mb-3 p-3 border rounded bg-white">
            <p className="text-sm text-gray-600 mb-2 italic">
              {getInstruction(idx)}
            </p>

            <label className="block font-medium">
              सब यूनिट {idx + 1} का नाम
            </label>
            <input
              type="text"
              value={su.unitName}
              onChange={(e) =>
                handleSubUnitChange(idx, "unitName", e.target.value)
              }
              className="border p-2 w-full mb-2"
            />

            <label className="block font-medium">
              प्रति{" "}
              {idx === 0
                ? product.level1Unit.unitName || "मुख्य यूनिट"
                : subUnits[idx - 1]?.unitName || "ऊपरी यूनिट"}{" "}
              कितनी Quantity
            </label>
            <input
              type="number"
              value={su.perParentQuantity}
              onChange={(e) =>
                handleSubUnitChange(
                  idx,
                  "perParentQuantity",
                  Number(e.target.value)
                )
              }
              className="border p-2 w-full"
            />
          </div>
        ))}

        <button
          onClick={addSubUnit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + नया सब यूनिट जोड़ें
        </button>
      </div>

      {/* Preview Table */}
      {previewUnits.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">लाइव प्रीव्यू</h3>
          <table className="w-full border-collapse border border-gray-400 bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">लेवल</th>
                <th className="border p-2">यूनिट का नाम</th>
                <th className="border p-2">प्रति पैरेंट Quantity</th>
                <th className="border p-2">कुल Quantity</th>
                <th className="border p-2">Pointer</th>
              </tr>
            </thead>
            <tbody>
              {previewUnits.map((u, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{u.level}</td>
                  <td className="border p-2">{u.unitName}</td>
                  <td className="border p-2">{u.perParentQuantity}</td>
                  <td className="border p-2">{u.totalQuantity}</td>
                  <td className="border p-2">{u.pointer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Save */}
      <div className="mt-5">
        <button
          onClick={saveProduct}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          सेव करें
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
