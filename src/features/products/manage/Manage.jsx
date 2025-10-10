"use client";

import React, { useEffect, useState } from "react";
import StockManagement from "./StockManagement/StockManagement";
import PriceManagement from "./PriceManagement/PriceManagement";
import { product as product_seed } from "./seed";
import { saveProduct, udpateAProduct, unitCostSettingToProduct } from "./funcs";
import { GreenButton } from "@/shared/components/Button";
import useLoadingStore from "@/store/loading";
import { useProductsStore } from "../store";
import { getAProductDetails } from "../viewDetails/funcs";
import { useRouter } from "next/navigation";

const Manage = ({ createOrUpdate = "create", productId }) => {
  const [product, setProduct] = useState(product_seed);

  const { setLoading } = useLoadingStore();

  const { getOneProductByProductId } = useProductsStore();

  const router = useRouter();

  const initialApiCallForUpdate = async () => {
    const _product = getOneProductByProductId(productId);
    if (_product) {
      setProduct(_product);
    } else {
      setLoading(true);
      await getAProductDetails(productId, setProduct, setLoading);
    }
  };

  useEffect(() => {
    if (createOrUpdate === "update" && productId) {
      const data = getOneProductByProductId(productId);
      setProduct(data);
      if (!data) {
        initialApiCallForUpdate();
      }
    }
  }, []);

  return (
    <div
      className={`w-full min-h-screen overflow-y-auto bg-gray-100 flex flex-col p-6 `}
    >
      <StockManagement product={product} setProduct={setProduct} />
      <PriceManagement product={product} setProduct={setProduct} />
      <GreenButton
        onClick={async () => {
          // alert("product to save : " + JSON.stringify(product));

          if (createOrUpdate === "create") {
            // alert("create is active");
            await saveProduct(product, setLoading);
          } else if (createOrUpdate === "update") {
            udpateAProduct(productId, product, router, setLoading);
          }
        }}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Save Now
      </GreenButton>
    </div>
  );
};

export default Manage;
