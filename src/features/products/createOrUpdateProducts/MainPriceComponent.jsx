import React from "react";
import Header from "../../../shared/components/ui/Header";
import Label from "./ui/Label";
import Select from "@/shared/components/form/Select";
import { Input } from "@/shared/components/form/Input";
import { BlueButton, GreenButton } from "@/shared/components/Button";
import { handleChange, addRow, removeRow } from "./funcs";
const MainPriceComponent = ({
  header,
  main,
  productDetails,
  setProductDetails,
  units,
}) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-red-50 rounded-lg shadow">
      <Header>{header}</Header>

      {productDetails?.[main]?.map((row, index) => (
        <div key={index} className="flex items-end gap-3 w-full border-b pb-2">
          {/* Unit Select */}
          <div className="flex flex-col w-1/3">
            <Label htmlFor={`${main}-unit-${index}`}>Unit</Label>
            <Select
              id={`${main}-unit-${index}`}
              value={row.unit}
              onChange={(e) =>
                handleChange(
                  main,
                  index,
                  "unit",
                  e.target.value,
                  setProductDetails
                )
              }
            >
              {units.map((d, i) => (
                <option key={i} value={d.engLabel}>
                  {d?.engLabel} {d?.hiLabel}
                </option>
              ))}
            </Select>
          </div>

          {/* Price Input */}
          <div className="flex flex-col w-1/3">
            <Label htmlFor={`${main}-price-${index}`}>Price</Label>
            <Input
              type="number"
              id={`${main}-price-${index}`}
              value={row.price}
              onChange={(e) =>
                handleChange(
                  main,
                  index,
                  "price",
                  e.target.value,
                  setProductDetails
                )
              }
            />
          </div>

          {/* Remove Button */}
          <div className="flex flex-col w-1/4">
            <Label className="invisible">Remove</Label>
            <GreenButton
              onClick={(e) => {
                e.preventDefault();
                removeRow(main, index, setProductDetails);
              }}
            >
              Remove
            </GreenButton>
          </div>
        </div>
      ))}

      {/* Add More Button */}
      <div>
        <BlueButton
          onClick={(e) => {
            e.preventDefault();
            addRow(main, setProductDetails);
          }}
        >
          + Add More
        </BlueButton>
      </div>
    </div>
  );
};

export default MainPriceComponent;
