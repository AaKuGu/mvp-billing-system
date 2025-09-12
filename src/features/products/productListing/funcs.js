export const handleDelete = async (id, setProducts, products, setLoading) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.success) {
      setProducts(products.filter((p) => p._id !== id));
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    console.error("Error deleting product:", err);
  } finally{
    setLoading(false);
  }
};
