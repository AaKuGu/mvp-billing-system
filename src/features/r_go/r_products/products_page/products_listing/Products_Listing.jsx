import React, { useState } from "react";
import DesktopListing from "./DesktopListing/DesktopListing";
import Mobile_Listing from "./MobileListing/Mobile_Listing";

const ProductListing = ({
  setLoading,
  loading,
  searchTerm,
  filteredProducts,
  setProducts,
  products,
}) => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Products</h2>

        <DesktopListing
          products={products}
          setProducts={setProducts}
          filteredProducts={filteredProducts}
        />

        <Mobile_Listing
          products={products}
          setProducts={setProducts}
          filteredProducts={filteredProducts}
        />
      </div>
    </div>
  );
};

export default ProductListing;
