import { fetchAProduct_api } from "./apiCalls";

export const getAProductDetails = async (productId, setProduct) => {
  const data = await fetchAProduct_api(productId);
  if (data && data.success) {
    console.log("data ; ", data);
    setProduct(data.product);
  }
};
