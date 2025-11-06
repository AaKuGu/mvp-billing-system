import Product from "@/models/Product";
import { user_one_doc_ssr } from "@/re_usables/backend/utils/ssr/user_one_doc_ssr";
import React from "react";
import Update_Page_Client from "./Update_Page_Client";

const Update_Page_Server = async ({ productId }) => {
  const { data: product_details } = await user_one_doc_ssr(Product, {
    filter: { _id: productId },
  });
  //   return <div>{JSON.stringify(product_details, null, 2)}</div>;
  return <Update_Page_Client product_details={product_details} />;
};

export default Update_Page_Server;
