import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import React, { useEffect } from "react";
import { onChangeHandler } from "../funcs";
import {
  already_added_and_0_stock_product_filter_handler,
  productNameChangeHandler,
} from "./funcs";

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
  setUnitName,
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

          // alert("custom product true : " + e.target.value);

          setCustomProduct(true);

          setTotalPrice(null);
          setUnitPrice(null);
          setUnitName("Pcs");

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

          //following func will help not listing the same product already added into billingItems also whose last unit stock is 0
          const already_added_and_0_stock_product_filter =
            already_added_and_0_stock_product_filter_handler(
              results,
              billingItems
            );

          setSearchedProducts(
            already_added_and_0_stock_product_filter.map((r) => r.item)
          );
        }}
        onBlur={() => {
          setSearchedProducts([]);
        }}
      />
    </>
  );
};

export default ProductName;
