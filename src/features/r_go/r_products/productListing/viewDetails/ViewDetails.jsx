"use client";

import React, { useEffect, useState } from "react";
import { useProductsStore } from "../../store";
import { initialApiCall, is_stock_all_0_handler } from "./funcs";
import useLoadingStore from "@/store/loading";
import Card from "./Card";

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

  const is_stock_all_0 = is_stock_all_0_handler(product);

  return (
    <div className="p-4 space-y-4">
      {/* Product Name */}
      <h1 className="text-2xl font-bold">{product.productName}</h1>

      {/* {JSON.stringify(is_stock_all_0)} */}

      <span className={`text-red-500`}>
        {is_stock_all_0 &&
          "The Stock of this product is 0 , it can not be added into bills"}
      </span>

      <div className="bg-white shadow rounded p-4 space-y-4">
        <h2 className="text-lg font-semibold mb-2">
          📦 Unit Hierarchy for: {product.productName}
        </h2>

        {product.units.map((unit, index) => {
          const isLast = index === product.units.length - 1;
          const next = product.units[index + 1];
          const containsText = next
            ? `Contains: ${next.perParentQuantity} ${next.unitName}${
                next.perParentQuantity > 1 ? "s" : ""
              }`
            : null;

          return (
            <Card product={product} containsText={containsText} index={index} unit={unit} />
          );
        })}
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
