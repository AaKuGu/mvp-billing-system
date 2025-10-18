import Link from "next/link";
import React from "react";
import { handleDelete } from "../../funcs";
import { BlueButton, GreenButton, RedButton } from "@/shared/components/Button";
import useProductListingStore from "../../store";
import ViewUpdateDelete from "@/shared/components/ViewUpdateDelete";
import TableData from "./TableData";

const ListingCard = ({ p, index, setLoading, setProducts, products }) => {
  const mainUnit = p.units?.[0]; // Level 1 unit

  return (
    <tr key={p._id} className="text-start hover:bg-gray-50 transition">
      <TableData>{index + 1}.</TableData>
      <TableData>{p.productName}</TableData>
      <TableData align="right">{mainUnit?.totalQuantity}</TableData>
      <TableData align="left">{mainUnit?.unitName}</TableData>
      <TableData>
        {mainUnit?.unitCost ? `₹${mainUnit.unitCost}` : "-"}
      </TableData>
      <TableData>
        {mainUnit?.unitSellingPrice ? `₹${mainUnit.unitSellingPrice}` : "-"}
      </TableData>

      <td className="p-2 border flex flex-col sm:flex-row gap-2 justify-center">
        <ViewUpdateDelete
          actions={{
            view: `/go/products/${p._id}`,
            update: `/go/products/update/${p._id}`,
            delete: true, // presence of `delete` triggers button
          }}
          onDelete={() =>
            handleDelete(p._id, setProducts, products, setLoading)
          }
        />
      </td>
    </tr>
  );
};

export default ListingCard;
