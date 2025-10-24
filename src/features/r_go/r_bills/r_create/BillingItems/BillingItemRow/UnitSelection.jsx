import { units } from "@/re_usables/components/constants";
import { Input } from "@/re_usables/components/form/Input";
import Label from "@/re_usables/components/form/Label";
import Select from "@/re_usables/components/form/Select";
import React from "react";

const UnitSelection = ({
  unitName,
  setUnitName,
  rowData,
  billingItems,
  setBillingItems,
  index,
  customProduct,
}) => {
  const handleChange = (value) => {
    setUnitName(value);
    const updated = [...billingItems];
    updated[index] = {
      ...updated[index],
      itemDetails: {
        ...updated[index].itemDetails,
        unitName: value,
      },
    };
    setBillingItems(updated);
  };

  return (
    <div className="flex-1 w-full">
      <Label>Unit</Label>
      {customProduct ? (
        <Input
          type="text"
          value={unitName}
          onChange={(e) => handleChange(e.target.value)}
          className="border px-2 py-1 w-full"
          placeholder="Enter custom unit"
        />
      ) : (
        <Select value={unitName} onChange={(e) => handleChange(e.target.value)}>
          {rowData?.dataFromDB?.units?.length &&
            rowData.dataFromDB.units.map((item, idx) => (
              <option key={idx} value={item.unitName} className="text-black">
                {item.unitName + `-` + item.totalQuantity}
              </option>
            ))}
        </Select>
      )}
    </div>
  );
};

export default UnitSelection;
