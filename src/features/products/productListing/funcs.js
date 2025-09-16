import { fetchAllProducts } from "../apiCall";

export const fetchProducts = async (setProducts, setLoading, searchTerm) => {
  const cachedProducts = window.localStorage.getItem("products");

  if (cachedProducts) {
    setProducts(JSON.parse(cachedProducts));
    setLoading(false);
  } else {
    const data = await fetchAllProducts(searchTerm);
    if (data && data.products) {
      setProducts(data.products);
      window.localStorage.setItem("products", JSON.stringify(data.products));
    }
    setLoading(false);
  }
};
