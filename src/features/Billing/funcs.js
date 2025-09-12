import Fuse from "fuse.js";

export const fetchProducts = async (setFuse) => {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    if (data.success) {
      // Fuse only on English product name
      const fuseInstance = new Fuse(data.products, {
        keys: [
          {
            name: "productNameEng",
            getFn: (product) => {
              const eng = product.productName?.find((p) => p.lang === "eng");
              return eng ? eng.value : "";
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
      console.error("Failed to fetch products:", data.message);
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};
