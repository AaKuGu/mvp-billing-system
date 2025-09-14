import React from "react";
import Header from "@/shared/components/ui/Header";
import MobileView from "./MobileListing/MobileView";
import DesktopListing from "./DesktopListing/DesktopListing";

const MainListing = ({
  setLoading,
  loading,
  products,
  searchTerm,
  setProducts,
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
          setProducts={setProducts}
          products={products}
          setLoading={setLoading}
        />

        {/* Mobile Card View */}
        <MobileView
          setProducts={setProducts}
          products={products}
          // filteredProducts={filteredProducts}
          setLoading={setLoading}
        />
      </>
    </div>
  );
};

export default MainListing;
