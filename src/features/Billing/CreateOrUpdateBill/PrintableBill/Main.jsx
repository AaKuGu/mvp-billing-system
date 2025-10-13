import React from "react";
import TableData from "./TableData";
import { dataStyle, srStyle } from "./css";

const Main = ({ billingItems }) => {
  return (
    <div className="h-full">
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

      <span className={`text-sm`}>
        {/* {JSON.stringify(billingItems[0].itemDetails.unit)} */}
        {/* {JSON.stringify(billingItems[0].itemDetails)} */}
      </span>

      <table className="w-full border-collapse text-sm">
        <tbody>
          {billingItems.map((item, i) => {
            const _itemDetails = item.itemDetails;
            const unitPrice = _itemDetails.unitPrice;
            const quantity = Number(_itemDetails?.quantity) || 0;
            const unit = _itemDetails.unitName;
            const totalPrice = Number(_itemDetails.totalPrice) || 0;
            const productName = _itemDetails.productName;

            return (
              <TableData
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
