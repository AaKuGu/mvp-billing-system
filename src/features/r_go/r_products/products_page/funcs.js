// helper for rendering price arrays




export const renderPriceArray = (arr) =>
  arr?.length > 0 ? (
    arr.map((pp, i) => (
      <span key={i} className="block text-sm sm:text-base text-gray-700">
        {pp.unit} - ₹{pp.price}
      </span>
    ))
  ) : (
    <span className="text-gray-400 text-sm">N/A</span>
  );

import { fetchAllProducts } from "./apiCall";

export const fetchProducts = async (setProducts, setLoading, searchTerm) => {
  const cachedProducts = window.localStorage.getItem("products");

  // if (cachedProducts) {
  //   setProducts(JSON.parse(cachedProducts));
  //   setLoading(false);
  // } else {
  const data = await fetchAllProducts(searchTerm);
  if (data && data.products) {
    setProducts(data.products);
    window.localStorage.setItem("products", JSON.stringify(data.products));
  }
  setLoading(false);
  // }
};
