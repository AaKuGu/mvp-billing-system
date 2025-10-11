import Manage from "@/features/products/manage/Manage";
import React from "react";

const page = ({ params }) => {
  const { productId } = params;
  return (
    <Manage createOrUpdate="update" productId={productId} />
    // <CreateOrUpdateProducts createOrUpdate="update" productId={productId} />
  );
};

export default page;
