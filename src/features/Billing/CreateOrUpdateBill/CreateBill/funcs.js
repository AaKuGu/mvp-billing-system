import Fuse from "fuse.js";

export const fetchProducts = async (setFuse) => {
  try {
    const productsStr = window.localStorage.getItem("products");
    if (productsStr) {
      const products = JSON.parse(productsStr); // ✅ parse string to array

      // Fuse only on English product name
      const fuseInstance = new Fuse(products, {
        keys: [
          {
            name: "productName",
            getFn: (product) => {
              // const eng = product.productName?.find((p) => p.lang === "eng");
              // return eng ? eng.value : "";
              return product.productName
            },
          },
        ],
        includeScore: true,
        threshold: 0.4,
        ignoreLocation: false,
        minMatchCharLength: 1,
      });

      setFuse(fuseInstance);
    } else {
      console.warn("No products found in localStorage");
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};
