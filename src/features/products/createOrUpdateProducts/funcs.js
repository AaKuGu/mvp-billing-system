// 🔧 Generic change handler
import toast from "react-hot-toast";
import { emptyProductDetails } from "./constant";
import axios from "axios";
import { fetchAProduct_api, saveAProduct, updateAProduct } from "./apiCall";

export const handleChange = (type, index, field, value, setProductDetails) => {
  setProductDetails((prev) => {
    const updated = [...prev[type]];
    updated[index] = { ...updated[index], [field]: value };
    return { ...prev, [type]: updated };
  });
};

// 🔧 Generic add row
export const addRow = (type, setProductDetails) => {
  setProductDetails((prev) => ({
    ...prev,
    [type]: [...(prev[type] || []), { unit: "pcs", price: 0 }],
  }));
};

// 🔧 Generic remove row
export const removeRow = (type, index, setProductDetails) => {
  setProductDetails((prev) => {
    const updated = prev[type].filter((_, i) => i !== index);
    return { ...prev, [type]: updated };
  });
};

export const handleSave = async (
  e,
  productDetails,
  createOrUpdate,
  productId,
  setLoading,
  setProductDetails
) => {
  e.preventDefault();

  let data;

  if (createOrUpdate === "update") {
    updateHandler(data, productId, productDetails, setProductDetails);
  } else {
    createHandler(data, productDetails, setProductDetails);
  }

  setLoading(false);
};

const createHandler = async (data, productDetails, setProductDetails) => {
  data = await saveAProduct(productDetails);
  if (data) {
    toast.success(data.message);
    setProductDetails(emptyProductDetails);
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...storedProducts, data.newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }
};

const updateHandler = async (
  data,
  productId,
  productDetails,
  setProductDetails
) => {
  data = await updateAProduct(productId, productDetails);
  if (data?.success) {
    toast.success(data.message);
    setProductDetails(emptyProductDetails);
    // ✅ Update localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = storedProducts.map((p) => {
      if (p?._id === productId) {
        return { ...p, ...data.updatedProduct };
      } else return p;
    });

    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }
};

export const fetchAProduct = async (
  setLoading,
  setProductDetails,
  productId
) => {
  setLoading(true);

  const data = await fetchAProduct_api(productId);

  // console.log("Fetched product data:", data);

  if (data && data.product) {
    setProductDetails({
      productName: data.product.productName || "",
      category: data?.product?.category || "",
      cost: data.product.cost?.length
        ? data.product.cost
        : [{ unit: "pcs", price: 0 }],
      wholesale: data.product.wholesale?.length
        ? data.product.wholesale
        : [{ unit: "pcs", price: 0 }],
      retail: data.product.retail?.length
        ? data.product.retail
        : [{ unit: "pcs", price: 0 }],
    });
  } else {
    console.error("❌ Failed to load product");
  }
  setLoading(false);
};
