import React from "react";
import Header from "../../../shared/components/ui/Header";
import Label from "../../../shared/components/form/Label";
import Select from "@/shared/components/form/Select";
import { Input } from "@/shared/components/form/Input";
import { units } from "@/shared/components/constants";

const BuyingCostPrice = ({ setProductDetails, productDetails }) => {
  console.log("BuyingCostPrice Rendered", productDetails?.cost);

  return (
    <div className="flex flex-col gap-3 p-4 bg-red-50 rounded-lg shadow">
      {/* Section Header */}
      <Header>Cost</Header>
      <div className="flex items-end gap-3 w-full">
        {/* Unit Select */}
        <div className="flex flex-col w-1/3">
          <Label htmlFor="costUnit">Unit</Label>
          <Select
            name="costUnit"
            id="costUnit"
            value={productDetails?.cost?.[0]?.unit}
            onChange={(e) => {
              setProductDetails({
                ...productDetails,
                cost: [{ ...productDetails.cost[0], unit: e.target.value }],
              });
            }}
          >
            <option value="">-- Select Unit --</option>
            {units.map((d, i) => (
              <option key={i} value={d.engLabel}>
                {d.engLabel} {d.hiLabel}
              </option>
            ))}
          </Select>
        </div>

        {/* Cost Price Input */}
        <div className="flex flex-col w-1/3">
          <Label htmlFor="costPrice">Cost Price</Label>
          <Input
            type="number"
            name="costPrice"
            id="costPrice"
            value={productDetails?.cost?.[0]?.price || ""}
            onChange={(e) => {
              setProductDetails({
                ...productDetails,
                cost: [{ ...productDetails.cost[0], price: e.target.value }],
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyingCostPrice;
