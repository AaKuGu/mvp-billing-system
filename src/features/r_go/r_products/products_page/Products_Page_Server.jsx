import { auth } from "@/lib/auth";
import Product from "@/models/Product";
import { user_docs_ssr } from "@/re_usables/backend/utils/ssr/user_docs_ssr";
import { headers } from "next/headers";
import React from "react";
import Products_Page_Client from "./Products_Page_Client";

const Products_Page_Server = async () => {
  await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const { data: products } = await user_docs_ssr(Product);

  return <Products_Page_Client products_={products} />;
};

export default Products_Page_Server;
