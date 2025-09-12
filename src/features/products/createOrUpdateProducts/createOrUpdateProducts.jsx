"use client";

import { Input } from "@/shared/components/form/Input";
import React, { useEffect, useState } from "react";
import { units } from "@/shared/components/constants";
import { BlueButton, GreenButton } from "@/shared/components/Button";
import Select from "@/shared/components/form/Select";
import Header from "../../../shared/components/ui/Header";
import Label from "../../../shared/components/form/Label";
import BuyingCostPrice from "./BuyingCostPrice";
import ProductName from "./productName/ProductName";
import MainPriceComponent from "./MainPriceComponent";
import { fetchProduct, handleSave } from "./funcs";
import Form from "@/shared/components/form/Form";
import LoadingWrapper from "@/shared/components/Loading/LoadingWrapper";
import { emptyProductDetails } from "./constant";

const CreateOrUpdateProducts = ({ createOrUpdate, productId }) => {
  const [productDetails, setProductDetails] = useState(emptyProductDetails);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (createOrUpdate === "update" && productId) {
      setLoading(true);
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
    <div className="w-full h-full bg-white flex flex-col px-2 py-2 md:px-5 md:py-5 ">
      <LoadingWrapper loading={loading}>
        <Header>
          {createOrUpdate === "update" ? "Update Product" : "Add Product"}
        </Header>
        <Form
          onSubmit={(e) => {
            setLoading(true);
            handleSave(
              e,
              productDetails,
              createOrUpdate,
              productId,
              setLoading,
              setProductDetails
            );
          }}
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
        </Form>
      </LoadingWrapper>
    </div>
  );
};

export default CreateOrUpdateProducts;
