export const queryToSearch = (productName) => {
  let query = {};

  if (productName) {
    // ✅ partial & case-insensitive match on English name
    query = {
      productName: {
        $elemMatch: {
          lang: "eng",
          value: { $regex: productName, $options: "i" }, // <-- regex
        },
      },
    };
  }

  return query;
};

export const finalProductsToSend = async (Product, query = {}, onlyNames) => {
  let products;
  if (onlyNames) {
    products = await Product.find(query)
      .sort({ createdAt: -1 })
      .select("productName");
  } else {
    products = await Product.find(query).sort({ createdAt: -1 });
  }

  return products;
};
