import React from "react";
import { ListHeader } from "@/re_usables/components/ui/Header";
import DesktopListing from "./DesktopListing/DesktopListing";
import MobileView from "./MobileListing/MobileView";

const Products_Listing = ({
  setLoading,
  loading,
  searchTerm,
  filteredProducts,
  setProducts,
  products,
}) => {
  return (
    <div className="w-full ">
      <ListHeader>List of Products</ListHeader>
      <div className={`h-[400px] md:h-[500px] overflow-y-auto`}>
        <DesktopListing
          // filteredProducts={filteredProducts}
          setLoading={setLoading}
          filteredProducts={filteredProducts}
          setProducts={setProducts}
          products={products}
        />

        <MobileView
          // filteredProducts={filteredProducts}
          setLoading={setLoading}
          filteredProducts={filteredProducts}
          setProducts={setProducts}
          products={products}
        />
      </div>
    </div>
  );
};

export default Products_Listing;
