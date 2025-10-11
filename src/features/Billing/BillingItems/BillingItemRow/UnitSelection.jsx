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
  const handleChange = (value) => {
    setUnit(value);
    const updated = [...billingItems];
    updated[index] = {
      ...updated[index],
      itemDetails: {
        ...updated[index].itemDetails,
        unit: value,
      },
    };
    setBillingItems(updated);
  };

  return (
    <div className="flex-1 w-full">
      <Label>Unit</Label>
      {customProduct ? (
        <input
          type="text"
          value={unit}
          onChange={(e) => handleChange(e.target.value)}
          className="border px-2 py-1 w-full"
          placeholder="Enter custom unit"
        />
      ) : (
        <Select value={unit} onChange={(e) => handleChange(e.target.value)}>
          {rowData?.dataFromDB?.units?.length &&
            rowData.dataFromDB.units.map((item, idx) => (
              <option key={idx} value={item.unitName} className="text-black">
                {item.unitName}
              </option>
            ))}
        </Select>
      )}
    </div>
  );
};

export default UnitSelection;
