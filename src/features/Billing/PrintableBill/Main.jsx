import React from "react";
import TableData from "./TableData";

const Main = ({ billingItems }) => {
  return (
    <div className="h-full">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {billingItems.map((item, i) => {
            const _itemDetails = item.itemDetails;
            const unitPrice = _itemDetails.unitPrice;
            const quantity = Number(_itemDetails?.quantity) || 0;
            const unit = _itemDetails.unit;
            const totalPrice = Number(_itemDetails.totalPrice) || 0;

            return (
              <TableData
                unitPrice={unitPrice}
                item={item}
                i={i}
                quantity={quantity}
                unit={unit}
                totalPrice={totalPrice}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
