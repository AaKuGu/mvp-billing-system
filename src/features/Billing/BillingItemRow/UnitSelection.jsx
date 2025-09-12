import { units } from "@/shared/components/constants";
import Label from "@/shared/components/form/Label";
import Select from "@/shared/components/form/Select";
import React from "react";

const UnitSelection = ({
  unit,
  setUnit,
  rowData,
  billingItems,
  setBillingItems,
  index,
  customProduct,
}) => {
  return (
    <div className="flex-1">
      <Label>Unit</Label>
      <Select
        value={unit}
        onChange={(e) => {
          setUnit(e.target.value);
          const hiValue = units.find((d) => d.engLabel === e.target.value);
          const updated = [...billingItems];
          updated[index] = {
            ...updated[index],
            itemDetails: {
              ...updated[index].itemDetails,
              unit: hiValue.hiLabel,
            },
            unit: { engLabel: e.target.value, hiLabel: hiValue.hiLabel },
          };
          setBillingItems(updated);
        }}
      >
        {customProduct
          ? units?.map((item, idx) => (
              <option key={idx} value={item.engLabel} className="text-black">
                {item.engLabel}
              </option>
            ))
          : rowData.dataFromDB?.wholesale?.map((item, idx) => (
              <option key={idx} value={item.unit}>
                {item.unit}
              </option>
            ))}
      </Select>
    </div>
  );
};

export default UnitSelection;
