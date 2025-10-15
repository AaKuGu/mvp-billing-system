import React from "react";
import { ListHeader } from "@/shared/components/ui/Header";
import MobileView from "./MobileListing/MobileView";
import DesktopListing from "./DesktopListing/DesktopListing";

const MainListing = ({
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

export default MainListing;
