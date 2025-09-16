import React from "react";
import { handleDelete, renderPriceArray } from "../funcs";
import Link from "next/link";
import { RedButton } from "@/shared/components/Button";

const MobileView = ({
  products,
  setProducts,
  setLoading,
  filteredProducts,
}) => {
  return (
    <div className="sm:hidden space-y-4 h-full">
      {filteredProducts.map((p, i) => (
        <div key={p._id} className="border rounded-lg p-4 shadow-sm bg-white">
          <div className="mb-5 flex">
            <p className="font-medium">S.No:</p>
            {i + 1}
          </div>
          <p className="font-semibold">
            {p.productName.find((n) => n.lang === "eng")?.value || ""}
            {p.productName.find((n) => n.lang === "hi")?.value || ""}
          </p>
          <div className="mt-2">
            <p className="font-medium">Cost:</p>
            {renderPriceArray(p.cost)}
          </div>
          <div className="mt-2">
            <p className="font-medium">Category:</p>
            {p?.category}
          </div>
          <div className="mt-2">
            <p className="font-medium">Wholesale:</p>
            {renderPriceArray(p.wholesale)}
          </div>
          <div className="mt-2">
            <p className="font-medium">Retail:</p>
            {renderPriceArray(p.retail)}
          </div>
          <div className="flex gap-2 mt-3">
            <Link
              href={`/go/products/update/${p._id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition w-full text-center"
            >
              Update
            </Link>
            <RedButton
              onClick={() => {
                setLoading(true);
                handleDelete(p._id, setProducts, products, setLoading);
              }}
            >
              Delete
            </RedButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileView;
