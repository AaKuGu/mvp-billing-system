export const saveProduct = async (
  product,
  setLoading,
  setProduct,
  product_seed
) => {
  setLoading(true);
  const data = await saveAProductStock(product);
  if (data?.success) {
    toast.success(data?.message);
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [data?.newProduct, ...storedProducts];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProduct(product_seed);
  }
  setLoading(false);
};
