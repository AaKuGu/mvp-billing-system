import React from "react";
import Headers from "./Headers";
import ListingCard from "./ListingCard/ListingCard";

const DesktopListing = ({
  //   filteredProducts,
  setProducts,
  products,
  setLoading,
  filteredProducts,
}) => {
  return (
    <div className="hidden sm:block overflow-x-auto rounded-lg text-normal">
      <table className="w-full min-w-[800px] border-none">
        <thead>
          <Headers />
        </thead>
        <tbody>
          {filteredProducts.map((p, i) => (
            <ListingCard
              p={p}
              key={p?._id}
              index={i}
              setProducts={setProducts}
              products={products}
              setLoading={setLoading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopListing;
