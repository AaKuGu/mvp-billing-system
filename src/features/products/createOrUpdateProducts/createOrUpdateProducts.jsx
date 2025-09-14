"use client";

import React, { useEffect, useState } from "react";
import { units } from "@/shared/components/constants";
import Header from "../../../shared/components/ui/Header";
import BuyingCostPrice from "./BuyingCostPrice";
import ProductName from "./productName/ProductName";
import MainPriceComponent from "./MainPriceComponent";
import { fetchAProduct, handleSave } from "./funcs";
import Form from "@/shared/components/form/Form";
import LoadingWrapper from "@/shared/components/Loading/LoadingWrapper";
import { emptyProductDetails } from "./constant";
import { GreenButton } from "@/shared/components/Button";

const CreateOrUpdateProducts = ({ createOrUpdate, productId }) => {
  const [productDetails, setProductDetails] = useState(emptyProductDetails);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (createOrUpdate === "update" && productId) {
      setLoading(true);
      fetchAProduct(setLoading, setProductDetails, productId);
    }
  }, [createOrUpdate, productId]);

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
            createOrUpdate={createOrUpdate}
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
