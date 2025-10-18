"use client";

import React, { useEffect, useState } from "react";
import { useProductsStore } from "../../store";
import { initialApiCall } from "./funcs";
import useLoadingStore from "@/store/loading";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";

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

      <MobileView product={product} />
      <DesktopView product={product} />

      {/* Metadata */}
      <div className="text-xs text-gray-500">
        <p>Created: {new Date(product.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(product.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ViewDetails;
