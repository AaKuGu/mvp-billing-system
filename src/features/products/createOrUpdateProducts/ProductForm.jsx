import React from "react";
import FormField from "./ui/FormField";
import Label from "@/shared/components/form/Label";
import { Input } from "@/shared/components/form/Input";

const ProductForm = ({
  product,
  setProduct,
  mainOrSubUnit = "main",
  parentUnitPrice = null, // pass parent's unitPrice for sub-units
}) => {
  const handleChange = (field, value) => {
    setProduct((prev) => {
      const updated = { ...prev, [field]: value };

      // --- Auto unitPrice ---
      if (mainOrSubUnit === "main" && updated.quantity && updated.cost) {
        updated.unitPrice = (
          parseFloat(updated.cost) / parseFloat(updated.quantity)
        ).toFixed(2);
      }
      if (mainOrSubUnit === "sub" && parentUnitPrice && updated.quantity) {
        updated.unitPrice = (
          parseFloat(parentUnitPrice) / parseFloat(updated.quantity)
        ).toFixed(2);
      }

      // --- Auto sellingPrice ---
      if (updated.unitPrice && updated.margin) {
        updated.sellingPrice = (
          parseFloat(updated.unitPrice) *
          (1 + parseFloat(updated.margin) / 100)
        ).toFixed(2);
      }

      return updated;
    });
  };

  const data = {
    productName: "product name",
    unit: {
      type: "peti",
      quantity: 10,
      level: 1,
      subUnit: {
        type: "bundle",
        quantity: 120,
        level: 2,
        subUnit: {
          type: "pcs",
          quantity: 4,
          level: 3,
          subUnit: null,
        },
      },
    },
    totalCost: 1400,
    unitPrice: 140,
  };

  return (
    <div className="p-4 mb-4 border rounded bg-gray-50">
      {/* Product Name only for main */}
      {mainOrSubUnit === "main" && (
        <FormField>
          <Label>Product Name</Label>
          <Input
            type="text"
            placeholder="Product Name"
            value={product.product_name}
            onChange={(e) => handleChange("product_name", e.target.value)}
          />
        </FormField>
      )}

      {/* Buying Details */}
      <div className="mb-4">
        {mainOrSubUnit === "main" ? (
          <h3 className="font-semibold mb-2">Buying Details</h3>
        ) : (
          <h3 className="font-semibold mb-2"></h3>
        )}
        {JSON.stringify(product)}
        <div className="flex flex-col md:flex-row gap-2">
          <FormField>
            <Label>Unit</Label>
            <Input
              type="text"
              value={product.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
            />
          </FormField>
          <FormField>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={product.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
            />
          </FormField>
          {mainOrSubUnit === "main" && (
            <FormField>
              <Label>Total Cost</Label>
              <Input
                type="number"
                value={product.cost}
                onChange={(e) => handleChange("cost", e.target.value)}
              />
            </FormField>
          )}
          {/* <FormField>
            <Label>Unit Price</Label>
            <Input
              type="number"
              value={product.unitPrice}
              readOnly
              className="bg-gray-100"
            />
          </FormField> */}
        </div>

        {/* Hindi Buying Explanation */}
        {product.unit &&
          product.quantity &&
          product.unitPrice &&
          mainOrSubUnit === "main" && (
            <p className="mt-2 text-gray-700 text-sm">
              आपने <strong>{product.product_name}</strong> को{" "}
              <strong>{product.quantity}</strong> {product.unit} में ₹
              <strong>{product.cost}</strong> में खरीदा है। एक {product.unit} का
              दाम ₹<strong>{product.unitPrice}</strong>।
            </p>
          )}
      </div>
    </div>
  );
};

export default ProductForm;
