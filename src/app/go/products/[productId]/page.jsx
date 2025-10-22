import Product_Details_Page from "@/features/r_go/r_products/r_product_Id/Product_Details_Page";

const page = ({ params }) => {
  const { productId } = params;

  return <Product_Details_Page productId={productId} />;
};

export default page;
