"use client";

import React, { useEffect, useState } from "react";
import Product_Details_Form from "../common/Product_Details_Form";
import { getAProductDetails } from "../../common/funcs";
import { useProductsStore } from "../../store";
import { udpateAProduct } from "./funcs";

const Update_Product = ({ productId }) => {
  const [product_details, set_product_details] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getOneProductByProductId } = useProductsStore();

  const initialApiCallForUpdate = async () => {
    const _product = getOneProductByProductId(productId);
    if (_product) {
      set_product_details(_product);
    } else {
      setLoading(true);
      await getAProductDetails(productId, set_product_details, setLoading);
    }
  };

  useEffect(() => {
    if (productId) {
      const data = getOneProductByProductId(productId);
      set_product_details(data);
      if (!data) {
        initialApiCallForUpdate();
      }
    }
  }, []);

  return (
    <Product_Details_Form
      createOrUpdate={`update`}
      product_details={product_details}
      udpateAProduct={udpateAProduct}
    />
  );
};

export default Update_Product;
