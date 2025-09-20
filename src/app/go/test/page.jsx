"use client";

import React, { useState, useEffect } from "react";
import { GreenButton } from "@/shared/components/Button";
import Header from "@/shared/components/ui/Header";

const Page = () => {
  const [products, setProducts] = useState([
    {
      name: "",
      quantity: 0,
      unit: "",
      cost: 0,
      unitCost: 0,
      subUnits: [],
    },
  ]);

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const addSubUnit = (productIndex) => {
    const newProducts = [...products];
    newProducts[productIndex].subUnits.push({
      quantity: 0,
      unit: "",
      unitCost: 0,
      subUnits: [],
    });
    setProducts(newProducts);
  };

  const handleSubUnitChange = (productIndex, subIndex, field, value) => {
    const newProducts = [...products];
    newProducts[productIndex].subUnits[subIndex][field] = value;

    // Auto calculate sub-unit cost based on its lowest units if present
    const subUnit = newProducts[productIndex].subUnits[subIndex];
    if (field === "quantity" && subUnit.subUnits.length > 0) {
      const totalLowestCost = subUnit.subUnits.reduce(
        (sum, lowest) => sum + lowest.unitCost * lowest.quantity,
        0
      );
      subUnit.unitCost = totalLowestCost / value;
    }

    setProducts(newProducts);
  };

  const addLowestUnit = (productIndex, subIndex) => {
    const newProducts = [...products];
    newProducts[productIndex].subUnits[subIndex].subUnits.push({
      quantity: 0,
      unit: "",
      unitCost: 0,
    });
    setProducts(newProducts);
  };

  const handleLowestUnitChange = (
    productIndex,
    subIndex,
    lowestIndex,
    field,
    value
  ) => {
    const newProducts = [...products];
    newProducts[productIndex].subUnits[subIndex].subUnits[lowestIndex][field] =
      value;

    // Auto update sub-unit cost when lowest unit cost or quantity changes
    const subUnit = newProducts[productIndex].subUnits[subIndex];
    if (subUnit.quantity > 0) {
      const totalLowestCost = subUnit.subUnits.reduce(
        (sum, lowest) => sum + lowest.unitCost * lowest.quantity,
        0
      );
      subUnit.unitCost = totalLowestCost / subUnit.quantity;
    }

    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      { name: "", quantity: 0, unit: "", cost: 0, unitCost: 0, subUnits: [] },
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col px-10 my-5">
      <Header>Products</Header>

      {products.map((product, pIdx) => (
        <div key={pIdx} className="border p-4 mb-4">
          <h2 className="font-semibold mb-2">Bulk Unit</h2>
          Name:{" "}
          <input
            type="text"
            className="border border-black mb-2"
            value={product.name}
            onChange={(e) => handleProductChange(pIdx, "name", e.target.value)}
          />
          <br />
          Quantity:{" "}
          <input
            type="number"
            className="border border-black mb-2"
            value={product.quantity}
            onChange={(e) =>
              handleProductChange(pIdx, "quantity", Number(e.target.value))
            }
          />
          <br />
          Unit:{" "}
          <input
            type="text"
            className="border border-black mb-2"
            value={product.unit}
            onChange={(e) => handleProductChange(pIdx, "unit", e.target.value)}
          />
          <br />
          Cost:{" "}
          <input
            type="number"
            className="border border-black mb-2"
            value={product.cost}
            onChange={(e) =>
              handleProductChange(pIdx, "cost", Number(e.target.value))
            }
          />
          <br />
          Unit Cost:{" "}
          <input
            type="number"
            className="border border-black mb-2"
            value={product.unitCost}
            onChange={(e) =>
              handleProductChange(pIdx, "unitCost", Number(e.target.value))
            }
          />
          <br />
          <GreenButton onClick={() => addSubUnit(pIdx)}>
            Add Sub Unit
          </GreenButton>
          {product.subUnits.map((sub, sIdx) => (
            <div key={sIdx} className="ml-6 mt-4 border p-2">
              <h3 className="font-semibold">Sub Unit</h3>
              Quantity:{" "}
              <input
                type="number"
                className="border border-black mb-2"
                value={sub.quantity}
                onChange={(e) =>
                  handleSubUnitChange(
                    pIdx,
                    sIdx,
                    "quantity",
                    Number(e.target.value)
                  )
                }
              />
              <br />
              Unit:{" "}
              <input
                type="text"
                className="border border-black mb-2"
                value={sub.unit}
                onChange={(e) =>
                  handleSubUnitChange(pIdx, sIdx, "unit", e.target.value)
                }
              />
              <br />
              Unit Cost:{" "}
              <input
                type="number"
                className="border border-black mb-2"
                value={sub.unitCost}
                readOnly
              />
              <br />
              <GreenButton onClick={() => addLowestUnit(pIdx, sIdx)}>
                Add Lowest Unit
              </GreenButton>
              {sub.subUnits.map((lowest, lIdx) => (
                <div key={lIdx} className="ml-6 mt-2 border p-2">
                  <h4 className="font-semibold">Lowest Unit</h4>
                  Quantity:{" "}
                  <input
                    type="number"
                    className="border border-black mb-2"
                    value={lowest.quantity}
                    onChange={(e) =>
                      handleLowestUnitChange(
                        pIdx,
                        sIdx,
                        lIdx,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                  <br />
                  Unit:{" "}
                  <input
                    type="text"
                    className="border border-black mb-2"
                    value={lowest.unit}
                    onChange={(e) =>
                      handleLowestUnitChange(
                        pIdx,
                        sIdx,
                        lIdx,
                        "unit",
                        e.target.value
                      )
                    }
                  />
                  <br />
                  Unit Cost:{" "}
                  <input
                    type="number"
                    className="border border-black mb-2"
                    value={lowest.unitCost}
                    onChange={(e) =>
                      handleLowestUnitChange(
                        pIdx,
                        sIdx,
                        lIdx,
                        "unitCost",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      <GreenButton onClick={addProduct}>Add New Product</GreenButton>
      <br />
      <br />
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};

export default Page;



	