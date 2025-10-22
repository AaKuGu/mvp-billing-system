import { getAProductDetails } from "../common/funcs";

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

//currently being used into products/view details only

export const is_stock_all_0_handler = (product) =>
  product.units[product.units.length - 1].totalQuantity === 0;
