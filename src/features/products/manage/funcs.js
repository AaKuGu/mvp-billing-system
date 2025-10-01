import toast from "react-hot-toast";
import { saveAProductStock, updateAProduct_api } from "./apiCalls";

const unitCostSettingToProduct = (product) => {
  let _product = { ...product };
  _product.units.forEach((d, i) => {
    if (i === 0) {
      d.unitCost = d.totalCost / d.totalQuantity;
    } else {
      const parentUnit = _product.units[i - 1];
      d.unitCost = parentUnit.unitCost / d.perParentQuantity;
    }
  });
  return _product;
};

export const saveProduct = async (product, setProduct, setLoading) => {
  setLoading(true);
  const _product = unitCostSettingToProduct(product);
  setProduct(_product);
  //   alert(JSON.stringify(_product));
  const data = await saveAProductStock(_product);
  //   alert(JSON.stringify(data));
  if (data?.success) {
    toast.success(data?.message);
  }
  setLoading(false);
};

export const udpateAProduct = async (
  productId,
  product,
  router,
  setLoading
) => {
  setLoading(true);
  const _product = unitCostSettingToProduct(product);
  const data = await updateAProduct_api(productId, _product);
  if (data.success) {
    toast.success(data?.message);
    // ✅ Update localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = storedProducts.map((p) => {
      if (p?._id === productId) {
        return { ...p, ...data.updatedProduct };
      } else return p;
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    router.push(`/go/products`);
  }
  setLoading(false);
};
