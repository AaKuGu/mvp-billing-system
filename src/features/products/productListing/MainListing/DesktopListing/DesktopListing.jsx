import React from "react";
import Headers from "./Headers";
import ListingCard from "./ListingCard";

const DesktopListing = ({
//   filteredProducts,
  setProducts,
  products,
  setLoading,
}) => {
  return (
    <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-300">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <Headers />
        </thead>
        <tbody>
          {/* {filteredProducts.map((p, i) => (
            <ListingCard
              p={p}
              key={p._id}
              index={i}
              setProducts={setProducts}
              products={products}
              setLoading={setLoading}
            />
          ))} */}
          {products.map((p, i) => (
            <ListingCard
              p={p}
              key={p._id}
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
