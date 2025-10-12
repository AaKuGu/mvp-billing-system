import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import React from "react";
import { onChangeHandler } from "./funcs";

const UnitPriceDecide = ({ i, d, setProduct }) => {
  const profit =
    (parseFloat(d?.unitSellingPrice) || 0) - (parseFloat(d?.unitCost) || 0);

  return (
    <div key={i} className={`bg-white p-3`}>
      <h1>Per {d?.unitName}</h1>
      <div>
        <Label>Cost Price</Label> :&nbsp;&nbsp;
        <span>{d.unitCost}</span>
      </div>
      <div>
        <Label>Margin %</Label>
        <Input
          type="number"
          value={d?.unitSellingPercentage}
          onChange={(e) =>
            onChangeHandler(e, i, "unitSellingPercentage", setProduct)
          }
        />
      </div>
      <div>
        <Label>Unit Selling Price</Label>
        <Input
          type="number"
          value={d?.unitSellingPrice}
          onChange={(e) =>
            onChangeHandler(e, i, "unitSellingPrice", setProduct)
          }
        />
      </div>

      {/* ✅ New profit display */}
      {d?.unitSellingPrice && (
        <div>
          <Label>Unit Profit</Label>:&nbsp;
          <Input value={profit.toFixed(2)} readOnly={true} />
        </div>
      )}
    </div>
  );
};

export default UnitPriceDecide;
