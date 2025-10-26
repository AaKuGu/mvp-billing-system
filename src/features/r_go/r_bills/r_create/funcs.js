// import { fetchAllProducts } from "@/features/products/apiCall";
import { fetchAllProducts } from "@/features/r_go/r_products/products_page/apiCall";
import Fuse from "fuse.js";

const fuseHandler = (products, setFuse) => {
  // Fuse only on English product name
  const fuseInstance = new Fuse(products, {
    keys: [
      {
        name: "productName",
        getFn: (product) => {
          // const eng = product.productName?.find((p) => p.lang === "eng");
          // return eng ? eng.value : "";
          return product.productName;
        },
      },
    ],
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: false,
    minMatchCharLength: 1,
  });

  setFuse(fuseInstance);
};

export const fetchProducts = async (setFuse) => {
  try {
    let productsStr = window.localStorage.getItem("products");

    if (!productsStr) {
      const data = await fetchAllProducts();
      if (data?.success) {
        const products = data?.products;
        window.localStorage.setItem("products", JSON.stringify(products));
        fuseHandler(products, setFuse);
      }
    } else if (productsStr) {
      const products = JSON.parse(productsStr); // ✅ parse string to array
      fuseHandler(products, setFuse);
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

