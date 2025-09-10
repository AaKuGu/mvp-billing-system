import React from "react";
import { Input } from "@/shared/components/form/Input";
import Header from "../../../shared/components/ui/Header";

const ProductName = ({ productDetails, setProductDetails }) => {
  return (
    <div className={`flex gap-2`}>
      <Header htmlFor="">Product Name</Header>
      <Input
        type="text"
        value={productDetails?.productName}
        onChange={(e) => {
          setProductDetails({
            ...productDetails,
            productName: e.target.value,
          });
        }}
      />
    </div>
  );
};

export default ProductName;
