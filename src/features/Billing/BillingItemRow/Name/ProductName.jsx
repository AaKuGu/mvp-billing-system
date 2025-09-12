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
        // onBlur={(e) => {
        //   const newBilling = [...billingItems];
        //   if (selectedProductFromDB) {
        //     newBilling[i].productName = selectedProductFromDB.productName;
        //   } else {
        //     newBilling[i].productName = [
        //       { lang: "eng", value: e.target.value },
        //       { lang: "hi", value: "" },
        //     ];
        //   }
        //   setBillingItems(newBilling);
        // }}
      />
    </>
  );
};

export default ProductName;
