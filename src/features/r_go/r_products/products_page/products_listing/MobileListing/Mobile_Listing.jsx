import React from "react";
import MobileCard from "./Mobile_Card";

const Mobile_Listing = ({ filteredProducts, products, setProducts }) => {
  return (
    <div className="md:hidden space-y-3">
      {filteredProducts.map((p, idx) => (
        <MobileCard
          key={p._id}
          p={p}
          index={idx}
          onDelete={() => alert("Delete clicked")}
          products={products}
          setProducts={setProducts}
        />
      ))}
    </div>
  );
};

export default Mobile_Listing;
