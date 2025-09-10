"use client";

import { Input } from "@/shared/components/form/Input";
import React, { useEffect, useState } from "react";
import { units } from "../constant";
import { BlueButton, GreenButton } from "@/shared/components/Button";
import Select from "@/shared/components/form/Select";
import Header from "../../../shared/components/ui/Header";
import Label from "./ui/Label";
import BuyingCostPrice from "./BuyingCostPrice";
import ProductName from "./ProductName";
import MainPriceComponent from "./MainPriceComponent";
import { fetchProduct, handleSave } from "./funcs";

const CreateOrUpdateProducts = ({ createOrUpdate, productId }) => {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    cost: [{ unit: "pcs", price: 0 }],
    wholesale: [{ unit: "pcs", price: 0 }],
    retail: [{ unit: "pcs", price: 0 }],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (createOrUpdate === "update" && productId) {
      fetchProduct(setLoading, setProductDetails, productId);
    }
  }, [createOrUpdate, productId]);

  // const fetchProduct = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(`/api/products/${productId}`);
  //     const data = await res.json();

  //     console.log("Fetched product data:", data);

  //     if (data.success && data.product) {
  //       setProductDetails({
  //         productName: data.product.productName || "",
  //         cost: data.product.cost?.length
  //           ? data.product.cost
  //           : [{ unit: "pcs", price: 0 }],
  //         wholesale: data.product.wholesale?.length
  //           ? data.product.wholesale
  //           : [{ unit: "pcs", price: 0 }],
  //         retail: data.product.retail?.length
  //           ? data.product.retail
  //           : [{ unit: "pcs", price: 0 }],
  //       });
  //     } else {
  //       console.error("❌ Failed to load product:", data.message);
  //     }
  //   } catch (err) {
  //     console.error("❌ Error fetching product:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="w-full h-full bg-white flex flex-col px-10 py-5">
      <Header>
        {createOrUpdate === "update" ? "Update Product" : "Add Product"}
      </Header>

      <form
        className="border p-2 md:p-5 space-y-6"
        onSubmit={(e) =>
          handleSave(e, productDetails, createOrUpdate, productId)
        }
      >
        {/* Product Name */}
        <ProductName
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />

        {/* Cost Price */}
        <BuyingCostPrice
          setProductDetails={setProductDetails}
          productDetails={productDetails}
        />

        {/* Wholesale Section */}
        <MainPriceComponent
          header="Wholesale Price"
          main="wholesale"
          productDetails={productDetails}
          units={units}
          setProductDetails={setProductDetails}
        />

        {/* Retail Section */}
        <MainPriceComponent
          header="Retail Price"
          main="retail"
          productDetails={productDetails}
          units={units}
          setProductDetails={setProductDetails}
        />

        {/* Save button */}
        <GreenButton type="submit" disabled={loading}>
          {loading
            ? "Loading..."
            : createOrUpdate === "update"
            ? "Update Product"
            : "Save Product"}
        </GreenButton>
      </form>
    </div>
  );
};

export default CreateOrUpdateProducts;
