import { fetchAProduct_api } from "./apiCalls";

export const getAProductDetails = async (productId, setProduct, setLoading) => {
  const data = await fetchAProduct_api(productId);
  if (data && data.success) {
    setProduct(data.product);
  }
  setLoading(false);
};
