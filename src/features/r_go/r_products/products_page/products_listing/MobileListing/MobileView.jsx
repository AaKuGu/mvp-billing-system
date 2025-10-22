import React from "react";
import { handleDelete } from "../common/funcs";
import Link from "next/link";
import { RedButton } from "@/re_usables/components/Button";
import ViewUpdateDelete from "@/re_usables/components/ViewUpdateDelete";

const MobileView = ({
  products,
  setProducts,
  setLoading,
  filteredProducts,
}) => {
  return (
    <div className="sm:hidden space-y-4 h-full px-2 pb-4">
      {filteredProducts.map((product, i) => (
        <div
          key={product._id}
          className="border rounded-lg p-4 shadow-sm bg-white"
        >
          <div className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">S.No:</span> {i + 1}
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {product.productName}
          </h2>

          {product.units?.map((unit, idx) => (
            <div key={idx} className="text-sm space-y-1 bg-gray-50 p-2 rounded">
              <p>
                <span className="font-medium">Level:</span> {unit.level}
              </p>
              <p>
                <span className="font-medium">Quantity:</span>{" "}
                {unit.totalQuantity} {unit.unitName}
              </p>
              <p>
                <span className="font-medium">Unit Cost:</span> ₹{unit.unitCost}
              </p>
              <p>
                <span className="font-medium">Total Cost:</span> ₹
                {unit.totalCost}
              </p>
              <p>
                <span className="font-medium">Selling %:</span>{" "}
                {unit.unitSellingPercentage}%
              </p>
              <p>
                <span className="font-medium">Selling Price:</span> ₹
                {unit.unitSellingPrice}
              </p>
            </div>
          ))}

          <div className="flex gap-2 mt-4">
            <ViewUpdateDelete
              actions={{
                view: `/go/products/${product._id}`,
                update: `/go/products/update/${product._id}`,
                delete: true,
              }}
              onDelete={() => {
                setLoading(true);
                handleDelete(product._id, setProducts, products, setLoading);
              }}
            />
            {/* <Link
              href={`/go/products/update/${product._id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition w-full text-center"
            >
              Update
            </Link>
            <RedButton
              onClick={() => {
                setLoading(true);
                handleDelete(product._id, setProducts, products, setLoading);
              }}
            >
              Delete
            </RedButton> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileView;
