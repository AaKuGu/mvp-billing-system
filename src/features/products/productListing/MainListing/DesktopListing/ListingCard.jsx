import Link from "next/link";
import React from "react";
import { handleDelete, renderPriceArray } from "../funcs";
// import { handleDelete, renderPriceArray } from "../funcs";

const ListingCard = ({ p, index, setLoading, setProducts, products }) => {
  return (
    <tr key={p._id} className="text-center hover:bg-gray-50 transition">
      <td className="p-2 border">{index + 1}</td>
      <td className="p-2 border ">
        {p.productName.find((n) => n.lang === "eng")?.value || ""}
        <br />
        {p.productName.find((n) => n.lang === "hi")?.value || ""}
      </td>
      <td className="p-2 border">{p.category}</td>
      <td className="p-2 border">{renderPriceArray(p.cost)}</td>
      <td className="p-2 border">{renderPriceArray(p.wholesale)}</td>
      <td className="p-2 border">{renderPriceArray(p.retail)}</td>
      <td className="p-2 border flex flex-col sm:flex-row gap-2 justify-center">
        <Link
          href={`/go/products/update/${p._id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
        >
          Update
        </Link>
        <button
          onClick={() => {
            setLoading(true);
            handleDelete(p._id, setProducts, products, setLoading);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListingCard;
