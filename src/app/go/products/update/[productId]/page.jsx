import CreateOrUpdateProducts from "@/features/products/createOrUpdateProducts/createOrUpdateProducts";
import React from "react";

const page = ({ params }) => {
  const { productId } = params;
  return (
    <CreateOrUpdateProducts createOrUpdate="update" productId={productId} />
  );
};

export default page;
