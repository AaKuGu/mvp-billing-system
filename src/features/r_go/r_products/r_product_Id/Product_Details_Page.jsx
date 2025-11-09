"use client";

import React, { useEffect, useState } from "react";
import { initialApiCall, is_stock_all_0_handler } from "./funcs";
import Card from "./Card";
import { useProductsStore } from "../store";

// const Product_Details_Page = ({ productId }) => {
// const { getOneProductByProductId } = useProductsStore();
// const [product, setProduct] = useState(null);

// console.log("product : ", product);

// useEffect(() => {
//   if (productId) {
//     initialApiCall(productId, getOneProductByProductId, setProduct);
//   }
// }, [productId]);

// const is_stock_all_0 = is_stock_all_0_handler(product);

//   return (
//     <div className="p-4 space-y-4">
//       {/* Product Name */}
//       <h1 className="text-2xl font-bold">{product?.productName}</h1>

//       <span className={`text-red-500`}>
//         {is_stock_all_0 &&
//           "The Stock of this product is 0 , it can not be added into bills"}
//       </span>

//       <div className="bg-white shadow rounded p-4 space-y-4">
//         <h2 className="text-lg font-semibold mb-2">
//           📦 Unit Hierarchy for: {product?.productName}
//         </h2>

//         {product?.units.map((unit, index) => {
//           const isLast = index === product.units.length - 1;
//           const next = product.units[index + 1];
//           const containsText = next
//             ? `Contains: ${next.perParentQuantity} ${next.unitName}${
//                 next.perParentQuantity > 1 ? "s" : ""
//               }`
//             : null;

//           return (
//             <Card
//               product={product}
//               containsText={containsText}
//               index={index}
//               unit={unit}
//             />
//           );
//         })}
//       </div>

//       {/* Metadata */}
//       <div className="text-xs text-gray-500">
//         <p>Created: {new Date(product?.createdAt).toLocaleString()}</p>
//         <p>Updated: {new Date(product?.updatedAt).toLocaleString()}</p>
//       </div>
//     </div>
//   );
// };

// export default Product_Details_Page;

// Sample product data for demonstration

// Sample data for demonstration
const sampleProduct = {
  productName: "Premium Basmati Rice",
  units: [
    {
      _id: "1",
      level: 1,
      unitName: "Bori (Bag)",
      totalQuantity: 20,
      perParentQuantity: 1,
      unitCost: 4500,
      unitSellingPrice: 5200,
      unitSellingPercentage: 15.56,
    },
    {
      _id: "2",
      level: 2,
      unitName: "kg",
      totalQuantity: 1000,
      perParentQuantity: 50,
      unitCost: 90,
      unitSellingPrice: 104,
      unitSellingPercentage: 15.56,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const StockCard = ({ unit, containsInfo, isFirst }) => {
  const profit = unit.unitSellingPrice - unit.unitCost;
  const isOutOfStock = unit.totalQuantity === 0;

  return (
    <div
      className={`bg-gradient-to-br ${
        isFirst ? "from-blue-50 to-blue-100" : "from-green-50 to-green-100"
      } rounded-lg p-4 sm:p-5 border-2 ${
        isFirst ? "border-blue-300" : "border-green-300"
      } shadow-sm`}
    >
      {/* Header with unit name and stock */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl">{isFirst ? "📦" : "⚖️"}</span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800">
              {unit.unitName}
            </h3>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {isFirst ? "Main Packing" : "Selling Unit"}
            </p>
          </div>
        </div>

        <div
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
            isOutOfStock
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          } font-bold text-sm sm:text-base w-fit`}
        >
          {isOutOfStock ? "Out of Stock!" : `${unit.totalQuantity} Available`}
        </div>
      </div>

      {/* Contains info */}
      {containsInfo && (
        <div className="bg-white rounded-md p-3 mb-4 border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600">
            <span className="font-semibold">📊 Conversion:</span> 1{" "}
            {unit.unitName} = {containsInfo.quantity} {containsInfo.childUnit}
          </p>
        </div>
      )}

      {/* Stock Info */}
      <div className="bg-white rounded-lg p-3 sm:p-4 space-y-3">
        <div className="text-center border-b pb-3">
          <p className="text-xs text-gray-500 uppercase mb-1">Current Stock</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">
            {unit.totalQuantity}{" "}
            <span className="text-base sm:text-lg text-gray-600">
              {unit.unitName}
            </span>
          </p>
        </div>

        {/* Pricing Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-yellow-50 rounded p-3 border border-yellow-200">
            <p className="text-xs text-gray-500 mb-1">💵 Cost Price</p>
            <p className="text-lg sm:text-xl font-bold text-gray-800">
              ₹{unit.unitCost}
            </p>
            <p className="text-xs text-gray-400">per {unit.unitName}</p>
          </div>

          <div className="bg-green-50 rounded p-3 border border-green-200">
            <p className="text-xs text-gray-500 mb-1">💰 Selling Price</p>
            <p className="text-lg sm:text-xl font-bold text-green-700">
              ₹{unit.unitSellingPrice}
            </p>
            <p className="text-xs text-gray-400">per {unit.unitName}</p>
          </div>
        </div>

        {/* Profit Display */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border-2 border-purple-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">
                📈 Profit per {unit.unitName}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-purple-700">
                ₹{profit.toFixed(2)}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                {unit.unitSellingPercentage.toFixed(1)}% margin
              </div>
            </div>
          </div>
        </div>

        {/* Total Value */}
        <div className="bg-gray-50 rounded p-3 border border-gray-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-600">
              Total Stock Value:
            </span>
            <span className="text-sm sm:text-lg font-bold text-gray-800">
              ₹{(unit.totalQuantity * unit.unitCost).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-600">
              If sold completely:
            </span>
            <span className="text-sm sm:text-lg font-bold text-green-600">
              ₹{(unit.totalQuantity * unit.unitSellingPrice).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-300">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              Total Profit:
            </span>
            <span className="text-base sm:text-xl font-bold text-purple-600">
              ₹{(unit.totalQuantity * profit).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailsPage = ({ productId }) => {
  const { getOneProductByProductId } = useProductsStore();
  const [product, setProduct] = useState(null);

  console.log("product : ", product);

  useEffect(() => {
    if (productId) {
      initialApiCall(productId, getOneProductByProductId, setProduct);
    }
  }, [productId]);

  // const product = sampleProduct;
  const isAllStockZero = product?.units.every((u) => u.totalQuantity === 0);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {product?.productName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Last updated:{" "}
                {new Date(product?.updatedAt).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🌾</div>
          </div>

          {isAllStockZero && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">⚠️</span>
                <div>
                  <p className="font-bold text-red-700 text-sm sm:text-base">
                    Stock Unavailable
                  </p>
                  <p className="text-xs sm:text-sm text-red-600">
                    This product is out of stock and cannot be added to bills
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stock Cards */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
            <span>📊</span> Stock Details
          </h2>

          {product?.units.map((unit, index) => {
            const isFirst = index === 0;
            const nextUnit = product.units[index + 1];
            const containsInfo = nextUnit
              ? {
                  quantity: nextUnit.perParentQuantity,
                  childUnit: nextUnit.unitName,
                }
              : null;

            return (
              <StockCard
                key={unit._id}
                unit={unit}
                containsInfo={containsInfo}
                isFirst={isFirst}
              />
            );
          })}
        </div>

        {/* Quick Summary */}
        <div className="mt-4 sm:mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <span>💡</span> Business Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm opacity-90">Total Investment</p>
              <p className="text-xl sm:text-2xl font-bold break-words">
                ₹
                {product?.units
                  .reduce((sum, u) => sum + u.totalQuantity * u.unitCost, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm opacity-90">Potential Revenue</p>
              <p className="text-xl sm:text-2xl font-bold break-words">
                ₹
                {product?.units
                  .reduce(
                    (sum, u) => sum + u.totalQuantity * u.unitSellingPrice,
                    0
                  )
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
