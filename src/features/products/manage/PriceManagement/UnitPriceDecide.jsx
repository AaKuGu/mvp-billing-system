import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import React from "react";
import { onChangeHandler } from "./funcs";

const UnitPriceDecide = ({ i, d, setProduct }) => {
  return (
    <div key={i} className={`border border-[2px] border-black p-3`}>
      <h1>Per {d?.unitName}</h1>
      <div>
        <Label>Cost Price</Label> :&nbsp;&nbsp;
        <span>{JSON.stringify(d.unitCost)}</span>
      </div>
      <div>
        <Label>Margin %</Label>
        <Input
          value={d?.unitSellingPercentage}
          onChange={(e) =>
            onChangeHandler(e, i, "unitSellingPercentage", setProduct)
          }
        />
      </div>
      <div>
        <Label>Final Selling Price</Label>
        <Input
          value={d?.unitSellingPrice}
          onChange={(e) =>
            onChangeHandler(e, i, "unitSellingPrice", setProduct)
          }
        />
      </div>
    </div>
  );
};

export default UnitPriceDecide;
