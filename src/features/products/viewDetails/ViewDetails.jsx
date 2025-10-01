"use client";

import React, { useEffect, useState } from "react";
import { useProductsStore } from "../store";
import { initialApiCall } from "./funcs";
import useLoadingStore from "@/store/loading";

const ViewDetails = ({ productId }) => {
  const { getOneProductByProductId } = useProductsStore();
  const [product, setProduct] = useState(null);
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    if (productId) {
      initialApiCall(
        productId,
        getOneProductByProductId,
        setProduct,
        setLoading
      );
    }
  }, [productId]);

  if (!productId)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Product Id not found
      </div>
    );

  if (!product) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Product Name */}
      <h1 className="text-2xl font-bold">{product.productName}</h1>

      {/* Units Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Level</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Per Parent Qty</th>
              <th className="p-2 border">Total Qty</th>
              <th className="p-2 border">Total Cost</th>
              <th className="p-2 border">Unit Cost</th>
              <th className="p-2 border">Selling Price</th>
              <th className="p-2 border">Selling %</th>
            </tr>
          </thead>
          <tbody>
            {product.units?.map((u) => (
              <tr key={u._id} className="text-center hover:bg-gray-50">
                <td className="p-2 border">{u.level}</td>
                <td className="p-2 border">{u.unitName}</td>
                <td className="p-2 border">{u.perParentQuantity ?? "-"}</td>
                <td className="p-2 border">{u.totalQuantity}</td>
                <td className="p-2 border">{u.totalCost}</td>
                <td className="p-2 border">{u.unitCost}</td>
                <td className="p-2 border">{u.unitSellingPrice}</td>
                <td className="p-2 border">{u.unitSellingPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Metadata */}
      <div className="text-xs text-gray-500">
        <p>Created: {new Date(product.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(product.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ViewDetails;
