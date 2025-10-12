import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import React from "react";
import { clearSellingPriceAndPercentage, setLevel1Unit } from "./funcs";

const Mainunit_Form = ({ product, setProduct }) => {
  return (
    <>
      {product?.units?.length > 0 && (
        <>
          <div className="mb-3">
            <Label>Buying Unit Name</Label>
            <Input
              value={product.units[0].unitName}
              onChange={(e) =>
                setLevel1Unit("unitName", e.target.value, setProduct)
              }
            />
          </div>

          <div className="mb-3">
            <Label>Quantity</Label>
            <Input
              type="number"
              value={product.units[0].totalQuantity}
              onChange={(e) => {
                setLevel1Unit("totalQuantity", e.target.value, setProduct);
                //since change in quantity can affect pricing, reset those fields
                setProduct((prev) => ({
                  ...prev,
                  units: clearSellingPriceAndPercentage(prev.units),
                }));
              }}
            />
          </div>

          <div className="mb-3">
            <Label>Total Price</Label>
            <Input
              type="number"
              value={product.units[0].totalCost}
              onChange={(e) => {
                setLevel1Unit("totalCost", e.target.value, setProduct);
                //since change in cost can affect pricing, reset those fields
                setProduct((prev) => ({
                  ...prev,
                  units: clearSellingPriceAndPercentage(prev.units),
                }));
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Mainunit_Form;
