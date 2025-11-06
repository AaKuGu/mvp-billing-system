"use client";

import React, { useEffect, useState } from "react";
import StockManagement from "./StockManagement/StockManagement";
import PriceManagement from "./PriceManagement/PriceManagement";
import { product as product_seed } from "./seed";
import { unitCostSettingToProduct } from "./funcs";
import { GreenButton } from "@/re_usables/components/Button";
import { useRouter } from "next/navigation";

const Product_Details_Form = ({
  createOrUpdate = "create",
  product_details = null,
  udpateAProduct,
  saveAProduct,
}) => {
  const [product, setProduct] = useState(product_seed);

  const router = useRouter();

  useEffect(() => {
    if (createOrUpdate === "update") setProduct(product_details);
  }, [product_details]);

  return (
    <div
      className={`w-full min-h-screen overflow-y-auto bg-gray-100 flex flex-col p-6 `}
    >
      <StockManagement product={product} setProduct={setProduct} />
      <PriceManagement product={product} setProduct={setProduct} />
      <GreenButton
        onClick={async () => {
          if (createOrUpdate === "create") {
            await saveAProduct(product, setProduct, product_seed);
          } else if (createOrUpdate === "update") {
            await udpateAProduct(product_details?._id, product, router);
          }
        }}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Save Now
      </GreenButton>
    </div>
  );
};

export default Product_Details_Form;
