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
  // Get products from localStorage
  const storedProducts =
    JSON.parse(window.localStorage.getItem("products")) || [];

  // alert(JSON.stringify(storedProducts));

  // Filter product names in English matching the searchTerm (case-insensitive)
  const matchedNames = storedProducts
    .map((product) =>
      product.productName?.find(
        (name) =>
          name?.lang === "eng" &&
          name?.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(Boolean); // remove undefined values

  // Update state
  setProductNames(matchedNames);
};
