import React from "react";

const MobileView = ({ product }) => {
  const unit = product.units?.[0]; // Since it's just one unit in the array

  return (
    <div className="lg:hidden p-4 space-y-4">
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {product.productName}
        </h2>

        {unit && (
          <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
            <p>
              <span className="font-medium">Level:</span> {unit.level}
            </p>
            <p>
              <span className="font-medium">Unit Name:</span> {unit.unitName}
            </p>
            <p>
              <span className="font-medium">Quantity:</span>{" "}
              {unit.totalQuantity}
            </p>
            <p>
              <span className="font-medium">Unit Cost:</span> ₹{unit.unitCost}
            </p>
            <p>
              <span className="font-medium">Total Cost:</span> ₹{unit.totalCost}
            </p>
            <p>
              <span className="font-medium">Selling %:</span>{" "}
              {unit.unitSellingPercentage}%
            </p>
            <p>
              <span className="font-medium">Selling Price:</span> ₹
              {unit.unitSellingPrice}
            </p>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500">
          <p>
            <span className="font-medium">Created:</span>{" "}
            {new Date(product.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Updated:</span>{" "}
            {new Date(product.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileView;
