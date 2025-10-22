"use client";

import React, { useEffect, useState } from "react";
import Product_Details_Form from "../common/Product_Details_Form";
import { getAProductDetails } from "../../common/funcs";
import { useProductsStore } from "../../store";

const Update_Product = ({ productId }) => {
  const [product_details, set_product_details] = useState(null);

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
    if (createOrUpdate === "update" && productId) {
      const data = getOneProductByProductId(productId);
      setProduct(data);
      if (!data) {
        initialApiCallForUpdate();
      }
    }
  }, []);

  return (
    <Product_Details_Form
      createOrUpdate={`update`}
      product_details={product_details}
    />
  );
};

export default Update_Product;
