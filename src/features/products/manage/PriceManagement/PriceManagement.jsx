"use client";

import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import React, { useState } from "react";
import UnitPriceDecide from "./UnitPriceDecide";
import { product as product_seed } from "../seed";

const PriceManagement = () => {
  const [product, setProduct] = useState(product_seed);

  return (
    <div className={`w-full h-full `}>
      <Label>Product Name</Label>
      <Input readOnly={true} value={product?.productName} />
      {product.units.map((d, i) => {
        return <UnitPriceDecide i={i} d={d} setProduct={setProduct} />;
      })}
    </div>
  );
};

export default PriceManagement;
