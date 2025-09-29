"use client";
import { GreenButton, RoundButtonClose } from "@/shared/components/Button";
import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import Header from "@/shared/components/ui/Header";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { product as product_seed } from "../seed";
import { saveProduct } from "./funcs";

const StockManagement = () => {
  const [product, setProduct] = useState(product_seed);

  // Add Level 1 unit (buying unit)
  const setLevel1Unit = (field, value) => {
    setProduct((prev) => {
      let units = [...prev.units];
      if (units.length === 0) {
        // if level 1 not added yet
        units.push({
          level: 1,
          unitName: "",
          perParentQuantity: null,
          totalQuantity: 0,
          totalCost: 0,
          pointer: null,
        });
      }
      units[0] = {
        ...units[0],
        [field]:
          field === "totalQuantity" || field === "totalCost"
            ? Number(value)
            : value,
      };
      return { ...prev, units };
    });
  };

  // Add new sub-unit
  const addSubUnit = () => {
    setProduct((prev) => {
      const units = [...prev.units];
      const level = units.length + 1;
      units.push({
        level,
        unitName: "",
        perParentQuantity: 0,
        totalQuantity: 0,
        pointer: 0,
      });
      return { ...prev, units };
    });
  };

  // Update sub-unit fields
  const updateSubUnit = (index, field, value) => {
    setProduct((prev) => {
      const units = [...prev.units];
      units[index] = {
        ...units[index],
        [field]: field === "perParentQuantity" ? Number(value) : value,
      };

      // recalc quantities for all sub-units after this
      let parentQty = units[0]?.totalQuantity || 0;
      for (let i = 1; i < units.length; i++) {
        units[i].totalQuantity = parentQty * units[i].perParentQuantity;
        units[i].pointer = units[i].totalQuantity;
        parentQty = units[i].totalQuantity;
      }

      return { ...prev, units };
    });
  };

  const unitCloseHandler = (idx) => {
    // alert(idx + 1);
    const unitsData = product.units;
    // alert(JSON.stringify(_a));
    const filteredData = unitsData.filter((_, i) => i <= idx);
    // alert(JSON.stringify(filteredData));
    setProduct((prev) => ({ ...prev, units: filteredData }));
  };

  return (
    <div className="p-6 w-full mx-auto bg-gray-100 rounded-lg shadow">
      <Header>Manage Stock</Header>

      <h2 className="text-xl font-bold mb-4">Create Product</h2>

      {/* Product Name */}
      <div className="mb-3">
        <Label>Product Name</Label>
        <Input
          value={product.productName}
          onChange={(e) =>
            setProduct({ ...product, productName: e.target.value })
          }
        />
      </div>

      {/* Level 1 Unit */}
      {product.units.length > 0 && (
        <>
          <div className="mb-3">
            <Label>Buying Unit Name</Label>
            <Input
              value={product.units[0].unitName}
              onChange={(e) => setLevel1Unit("unitName", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Label>Quantity</Label>
            <Input
              type="number"
              value={product.units[0].totalQuantity}
              onChange={(e) => setLevel1Unit("totalQuantity", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Label>Total Price</Label>
            <Input
              type="number"
              value={product.units[0].totalCost}
              onChange={(e) => setLevel1Unit("totalCost", e.target.value)}
            />
          </div>
        </>
      )}

      {product.units.length === 0 && (
        <GreenButton onClick={() => setLevel1Unit("unitName", "")}>
          Add Main Unit
        </GreenButton>
      )}

      {/* Sub Units */}
      {product.units.slice(1).map((su, idx) => (
        <div
          key={idx + 1}
          className="mb-3 p-3 py-4 border rounded bg-white relative"
        >
          <div className={`absolute top-2 right-2 `}>
            <RoundButtonClose onClick={() => unitCloseHandler(idx)} />
          </div>

          <Label>Sub Unit Name</Label>
          <Input
            value={su.unitName}
            onChange={(e) => updateSubUnit(idx + 1, "unitName", e.target.value)}
          />

          <Label>
            How many {su.unitName || "sub-units"} in 1{" "}
            {product.units[idx].unitName}
          </Label>
          <Input
            type="number"
            value={su.perParentQuantity}
            onChange={(e) =>
              updateSubUnit(idx + 1, "perParentQuantity", e.target.value)
            }
          />
        </div>
      ))}

      {product.units.length > 0 && (
        <button
          onClick={addSubUnit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add New Unit
        </button>
      )}

      {product.units.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">लाइव प्रीव्यू</h3>
          <table className="w-full border-collapse border border-gray-400 bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">लेवल</th>
                <th className="border p-2">यूनिट का नाम</th>
                <th className="border p-2">प्रति पैरेंट Quantity</th>
                <th className="border p-2">कुल Quantity</th>
              </tr>
            </thead>
            <tbody>
              {product.units.map((u) => (
                <tr key={u.level}>
                  <td className="border p-2">{u.level}</td>
                  <td className="border p-2">{u.unitName}</td>
                  <td className="border p-2">{u.perParentQuantity ?? "-"}</td>
                  <td className="border p-2">{u.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Save */}
      <div className="mt-5">
        <button
          onClick={() => saveProduct(product, setProduct)}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Save Now
        </button>
      </div>
    </div>
  );
};

export default StockManagement;
