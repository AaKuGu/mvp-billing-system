import React from "react";
import TableData from "./TableData";
import { dataStyle, srStyle } from "./css";

const Main = ({ itemDetails }) => {
  return (
    <div className="h-fit w-full">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className={srStyle}>No.</th>
            <th className={dataStyle}>Product</th>
            <th className={dataStyle}>Calculation</th>
            <th className={`w-[20%] border text-center p-1 py-2 md:p-2`}>
              Total
            </th>
          </tr>
        </thead>
      </table>

      <table className="w-full border-collapse text-sm">
        <tbody>
          {itemDetails.map((item, i) => {
            const unitPrice = item.unitPrice;
            const quantity = Number(item?.quantity) || 0;
            const unit = item.unitName;
            const totalPrice = Number(item.totalPrice) || 0;
            const productName = item.productName;

            return (
              <TableData
                key={i}
                unitPrice={unitPrice}
                item={item}
                i={i}
                quantity={quantity}
                unit={unit}
                totalPrice={totalPrice}
                productName={productName}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
