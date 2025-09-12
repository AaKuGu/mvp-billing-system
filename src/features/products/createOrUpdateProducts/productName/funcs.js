export const handleChange = (lang, value, setProductDetails) => {
  setProductDetails((prev) => ({
    ...prev,
    productName: prev.productName.map((item) =>
      item.lang === lang ? { ...item, value } : item
    ),
  }));
};

export const getValue = (lang, productDetails) =>
  productDetails?.productName?.find((item) => item.lang === lang)?.value || "";
