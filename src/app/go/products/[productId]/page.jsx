import ViewDetails from "@/features/products/viewDetails/ViewDetails";

const page = ({ params }) => {
  const { productId } = params;

  return <ViewDetails  productId={productId} />;
};

export default page;
