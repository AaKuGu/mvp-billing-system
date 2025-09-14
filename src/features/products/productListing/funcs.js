import toast from "react-hot-toast";
import { fetchAllProducts } from "../apiCall";

export const fetchProducts = async (setProducts, setLoading, searchTerm) => {
  const data = await fetchAllProducts(searchTerm);
  if (data) {
    setProducts(data.products);
  }
  setLoading(false);
};
