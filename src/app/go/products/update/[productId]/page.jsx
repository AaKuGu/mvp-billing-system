import Update_Product from "@/features/r_go/r_products/(create_update)/r_update/Update_Product";
import React from "react";

const page = ({ params }) => {
  const { productId } = params;
  return (
    // <Manage createOrUpdate="update" productId={productId} />
    <Update_Product productId={productId} />
    // <CreateOrUpdateProducts createOrUpdate="update" productId={productId} />
  );
};

export default page;
