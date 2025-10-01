import Link from "next/link";
import React from "react";
import { handleDelete } from "../funcs";
import { BlueButton, GreenButton, RedButton } from "@/shared/components/Button";
import useProductListingStore from "../store";

const ListingCard = ({ p, index, setLoading, setProducts, products }) => {
  const mainUnit = p.units?.[0]; // Level 1 unit

  return (
    <tr key={p._id} className="text-center hover:bg-gray-50 transition">
      {/* Serial No. */}
      <td className="p-2 border">{index + 1}</td>

      {/* Product Name */}
      <td className="p-2 border">{p.productName}</td>

      {/* Main Unit Name */}
      <td className="p-2 border">{mainUnit?.unitName || "-"}</td>

      {/* Stock (total quantity of main unit) */}
      <td className="p-2 border">{mainUnit?.totalQuantity ?? "-"}</td>

      {/* Cost Price of main unit */}
      <td className="p-2 border">
        {mainUnit?.unitCost ? `₹${mainUnit.unitCost}` : "-"}
      </td>

      {/* Selling Price of main unit */}
      <td className="p-2 border">
        {mainUnit?.unitSellingPrice ? `₹${mainUnit.unitSellingPrice}` : "-"}
      </td>

      {/* Actions */}
      <td className="p-2 border flex flex-col sm:flex-row gap-2 justify-center">
        <Link
          href={`/go/products/${p._id}`}
          className={`bg-green-500 text-white px-5 py-2 rounded 
        transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          View
        </Link>
        <Link
          href={`/go/products/update/${p._id}`}
          className={`bg-blue-500 text-white px-5 py-2 rounded 
        transition disabled:opacity-50 disabled:cursor-not-allowed`}
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
      </td>
    </tr>
  );
};

export default ListingCard;
