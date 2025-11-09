import toast from "react-hot-toast";
import { updateAProduct_api } from "./apiCalls";
import { revalidatePath } from "next/cache";

export const udpateAProduct = async (productId, product, router) => {
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
    revalidatePath("/products");
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    router.push(`/go/products`);
  }
};
