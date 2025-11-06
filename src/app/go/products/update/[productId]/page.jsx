import Update_Page_Server from "@/features/r_go/r_products/(create_update)/r_update/Update_Page_Server";
// import Update_Product from "@/features/r_go/r_products/(create_update)/r_update/Update_Product";
import React from "react";

const page = ({ params }) => {
  const { productId } = params;
  return (
    // <Update_Product productId={productId} />
    <Update_Page_Server productId={productId} />
  );
};

export default page;
