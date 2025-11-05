import CustomError from "@/re_usables/backend/utils/error/CustomError";

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

// utils/validators/productValidator.js

export const validateProductInput = (product, errorContext) => {
  if (!product || typeof product !== "object") {
    throw new CustomError("Invalid product input", 400, errorContext);
  }

  const { productName, units } = product;

  // Validate Product Name
  if (
    !productName ||
    typeof productName !== "string" ||
    productName.trim() === ""
  ) {
    throw new CustomError(
      "Product name is required and must be a string",
      400,
      errorContext
    );
  }

  // Validate Units Array
  if (!Array.isArray(units) || units.length === 0) {
    throw new CustomError(
      "Units array is required and cannot be empty",
      400,
      errorContext
    );
  }

  units.forEach((unit, index) => {
    const level = index + 1;

    const commonChecks = () => {
      if (
        !unit.unitName ||
        typeof unit.unitName !== "string" ||
        unit.unitName.trim() === ""
      ) {
        throw new CustomError(
          `Unit at level ${level} must have a valid unitName`,
          400,
          errorContext
        );
      }

      if (typeof unit.totalQuantity !== "number" || unit.totalQuantity <= 0) {
        throw new CustomError(
          `Unit at level ${level} must have totalQuantity > 0`,
          400,
          errorContext
        );
      }

      if (typeof unit.unitCost !== "number" || unit.unitCost <= 0) {
        throw new CustomError(
          `Unit at level ${level} must have unitCost > 0`,
          400,
          errorContext
        );
      }
    };

    // Level 1 rules
    if (index === 0) {
      commonChecks();

      if (typeof unit.totalCost !== "number" || unit.totalCost <= 0) {
        throw new CustomError(
          "Level 1 unit must have totalCost > 0",
          400,
          errorContext
        );
      }
    } else {
      // Sub units rules
      commonChecks();

      if (
        typeof unit.perParentQuantity !== "number" ||
        unit.perParentQuantity <= 0
      ) {
        throw new CustomError(
          `Sub-unit at level ${level} must have perParentQuantity > 0`,
          400,
          errorContext
        );
      }
    }
  });

  return { productName, units }; // sanitized
};
