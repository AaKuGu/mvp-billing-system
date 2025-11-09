import React from "react";
import DesktopListingCard from "./DesktopListingCard";

const DesktopListing = ({filteredProducts, products, setProducts}) => {
  return (
    <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
              #
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
              Product
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase">
              Stock
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase">
              Cost
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase">
              Selling
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase">
              Profit
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p, idx) => (
            <DesktopListingCard
              key={p._id}
              p={p}
              index={idx}
              onDelete={() => alert("Delete clicked")}
              products={products}
              setProducts={setProducts}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopListing;
