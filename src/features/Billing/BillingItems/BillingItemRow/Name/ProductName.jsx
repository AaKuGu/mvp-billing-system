import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import React, { useEffect } from "react";
import { onChangeHandler } from "../funcs";
import { productNameChangeHandler } from "./funcs";

const ProductName = ({
  setSearchedProducts,
  fuse,
  name,
  setName,
  billingItems,
  setBillingItems,
  index,
  setCustomProduct,
  setTotalPrice,
  setUnit,
  setUnitPrice,
}) => {
  return (
    <>
      {/* productname = {JSON.stringify(productName)} */}
      <Label className="block text-white">Product Name</Label>
      <Input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setCustomProduct(true);

          setTotalPrice(null);
          setUnitPrice(null);
          setUnit("pcs");

          productNameChangeHandler(
            billingItems,
            setBillingItems,
            index,
            e.target.value
          );

          if (!fuse || e.target.value.trim() === "") {
            setSearchedProducts([]);
            return;
          }
          const results = fuse.search(e.target.value);
          setSearchedProducts(results.map((r) => r.item));
        }}
        onBlur={() => {
          setSearchedProducts([]);
        }}
      />
    </>
  );
};

export default ProductName;
