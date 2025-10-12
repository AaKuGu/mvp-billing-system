import { RoundButtonClose } from "@/shared/components/Button";
import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import React from "react";
import {
  clearSellingPriceAndPercentage,
  unitCloseHandler,
  updateSubUnit,
} from "./funcs";

const SubUnit_Form = ({ product, setProduct }) => {
  return (
    <>
      {product?.units?.slice(1).map((su, idx) => (
        <div
          key={idx + 1}
          className="mb-3 p-3 py-4 border rounded bg-white relative"
        >
          <div className={`absolute top-2 right-2 `}>
            <RoundButtonClose
              onClick={() => unitCloseHandler(idx, product, setProduct)}
            />
          </div>

          <Label>Sub Unit Name</Label>
          <Input
            value={su.unitName}
            onChange={(e) =>
              updateSubUnit(idx + 1, "unitName", e.target.value, setProduct)
            }
          />

          <Label>
            How many {su.unitName || "sub-units"} in 1{" "}
            {product.units[idx].unitName}
          </Label>
          <Input
            type="number"
            value={su.perParentQuantity}
            onChange={(e) => {
              updateSubUnit(
                idx + 1,
                "perParentQuantity",
                e.target.value,
                setProduct
              );
              //since change in perParentQuantity can affect pricing, reset those fields
              setProduct((prev) => ({
                ...prev,
                units: clearSellingPriceAndPercentage(prev.units),
              }));
            }}
          />
        </div>
      ))}
    </>
  );
};

export default SubUnit_Form;
