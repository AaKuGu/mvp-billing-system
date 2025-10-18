import { fetchAProduct_api } from "../../apiCall";

export const getAProductDetails = async (productId, setProduct, setLoading) => {
  const data = await fetchAProduct_api(productId);
  if (data && data.success) {
    setProduct(data.product);
  }
  setLoading(false);
};

export const initialApiCall = async (
  productId,
  getOneProductByProductId,
  setProduct,
  setLoading
) => {
  const _product = getOneProductByProductId(productId);
  if (_product) {
    setProduct(_product);
  } else {
    setLoading(true);
    await getAProductDetails(productId, setProduct, setLoading);
  }
};
