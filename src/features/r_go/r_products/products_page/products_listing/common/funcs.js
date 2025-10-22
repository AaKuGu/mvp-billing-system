import toast from "react-hot-toast";

export const handleDelete = async (id, setProducts, products, setLoading) => {
  if (!confirm("Are you sure you want to delete this product?")) {
    setLoading(false);
    return;
  }

  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.success) {
      toast.success(data?.message);

      const updatedProducts = products.filter((p) => p._id !== id);
      setProducts(updatedProducts);

      // ✅ update localStorage as well
      window.localStorage.setItem("products", JSON.stringify(updatedProducts));
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    console.error("Error deleting product:", err);
  } finally {
    setLoading(false);
  }
};
