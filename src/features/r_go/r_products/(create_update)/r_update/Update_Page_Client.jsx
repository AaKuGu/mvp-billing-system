"use client";

import React, { useEffect, useState } from "react";
import Product_Details_Form from "../common/Product_Details_Form";
import { getAProductDetails } from "../../common/funcs";
import { useProductsStore } from "../../store";
import { udpateAProduct } from "./funcs";

const Update_Page_Client = ({ product_details }) => {
  // const [product_details, set_product_details] = useState(product_details);

  // const { getOneProductByProductId } = useProductsStore();

  // const initialApiCallForUpdate = async () => {
  //   const _product = getOneProductByProductId(productId);
  //   if (_product) {
  //     set_product_details(_product);
  //   } else {
  //     await getAProductDetails(productId, set_product_details);
  //   }
  // };

  // useEffect(() => {
  //   if (productId) {
  //     const data = getOneProductByProductId(productId);
  //     set_product_details(data);
  //     if (!data) {
  //       initialApiCallForUpdate();
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   setprodu
  // },[])

  return (
    <Product_Details_Form
      createOrUpdate={`update`}
      product_details={product_details}
      udpateAProduct={udpateAProduct}
    />
  );
};

export default Update_Page_Client;
