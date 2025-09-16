import React from "react";
import Header from "@/shared/components/ui/Header";
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
  // const filteredProducts = products.filter((p) =>
  //   p.productName
  //     .find((n) => n.lang === "eng")
  //     ?.value.toLowerCase()
  //     .includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="w-full">
      <Header>List of Products</Header>
      <>
        {/* Desktop Table */}
        <DesktopListing
          // filteredProducts={filteredProducts}
          setLoading={setLoading}
          filteredProducts={filteredProducts}
          setProducts={setProducts}
          products={products}
        />

        {/* Mobile Card View */}
        <MobileView
          // filteredProducts={filteredProducts}
          setLoading={setLoading}
          filteredProducts={filteredProducts}
          setProducts={setProducts}
          products={products}
        />
      </>
    </div>
  );
};

export default MainListing;
