import ViewDetails from "@/features/products/productListing/viewDetails/ViewDetails";

const page = ({ params }) => {
  const { productId } = params;

  return <ViewDetails productId={productId} />;
};

export default page;
