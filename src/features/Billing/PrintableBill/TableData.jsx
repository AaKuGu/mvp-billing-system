import React from "react";
import { dataStyle, srStyle } from "./css";

const TableData = ({ item, i, quantity, unit, unitPrice, totalPrice }) => {
  return (
    <tr key={item.id || i}>
      <td className={srStyle}>{i + 1}</td>
      <td className={dataStyle}>{item.itemDetails?.productName}</td>
      <td className={dataStyle}>
        {quantity} {unit} × ₹{unitPrice}
      </td>
      <td className={`w-[20%] border text-center p-1 py-2 md:p-2`}>
        ₹{totalPrice}
      </td>
    </tr>
  );
};

export default TableData;
