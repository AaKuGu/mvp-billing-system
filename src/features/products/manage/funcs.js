import toast from "react-hot-toast";
import { saveAProductStock, updateAProduct_api } from "./apiCalls";

//following is the helper function to set unitCost for each unit before saving or updating a product
export const unitCostSettingToProduct = (product) => {
  let _product = { ...product };
  _product?.units?.forEach((d, i) => {
    if (i === 0) {
      if (d?.totalCost && d?.totalQuantity)
        d.unitCost = parseFloat((d?.totalCost / d?.totalQuantity).toFixed(2));
    } else {
      const parentUnit = _product.units[i - 1];
      d.unitCost = parseFloat(
        (parentUnit?.unitCost / d?.perParentQuantity).toFixed(2)
      );
    }
  });

  console.log("After unitCost setting _product : ", _product);

  return _product;
};

export const saveProduct = async (product, setLoading) => {
  setLoading(true);
  // const _product = unitCostSettingToProduct(product);
  // setProduct(_product);
  // alert("save a product " + JSON.stringify(product));
  const data = await saveAProductStock(product);
  console.log("save a product data : ", data);
  // alert("data " + JSON.stringify(data));
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
  // const _product = unitCostSettingToProduct(product);
  const data = await updateAProduct_api(productId, product);
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
