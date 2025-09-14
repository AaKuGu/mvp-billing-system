import { fetchAllProducts } from "../../apiCall";

export const handleChangeForName = (lang, value, setProductDetails) => {
  setProductDetails((prev) => ({
    ...prev,
    productName: prev.productName.map((item) =>
      item.lang === lang ? { ...item, value } : item
    ),
  }));
};

export const getValue = (lang, productDetails) =>
  productDetails?.productName?.find((item) => item.lang === lang)?.value || "";

export const fetchProductsNames = async (searchTerm, setProductNames) => {
  const data = await fetchAllProducts(searchTerm, true);
  if (data && data.success) {
    setProductNames(data?.products);
  }
};
