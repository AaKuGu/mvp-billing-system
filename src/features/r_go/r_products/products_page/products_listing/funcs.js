import toast from "react-hot-toast";
import { delete_a_product_api_call } from "./api_calls";

export const handleDelete = async (id, setProducts, products) => {
  if (!confirm("Are you sure you want to delete this product?")) {
    return;
  }

  const response = await delete_a_product_api_call(id);

  if (response.success) {
    toast.success(response?.message);

    const updatedProducts = products.filter((p) => p._id !== id);
    setProducts(updatedProducts);

    // ✅ update localStorage as well
    window.localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  // try {
  //   const res = await fetch(`/api/products/${id}`, {
  //     method: "DELETE",
  //   });
  //   const data = await res.json();

  //   if (data.success) {
  //     toast.success(data?.message);

  //     const updatedProducts = products.filter((p) => p._id !== id);
  //     setProducts(updatedProducts);

  //     // ✅ update localStorage as well
  //     window.localStorage.setItem("products", JSON.stringify(updatedProducts));
  //   } else {
  //     alert("❌ " + data.message);
  //   }
  // } catch (err) {
  //   console.error("Error deleting product:", err);
  // } finally {
  //   setLoading(false);
  // }
};
