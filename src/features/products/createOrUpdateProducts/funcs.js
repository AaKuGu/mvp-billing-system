// 🔧 Generic change handler
import toast from "react-hot-toast";

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
  setLoading
) => {
  e.preventDefault();

  try {
    const url =
      createOrUpdate === "update" && productId
        ? `/api/products/${productId}`
        : "/api/products";

    const method = createOrUpdate === "update" ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productDetails),
    });

    const data = await res.json();

    if (data.success) {
      toast.success(
        createOrUpdate === "update"
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
    } else {
      toast.error("❌ Failed: " + data.message);
    }
  } catch (err) {
    console.error("❌ Error submitting product:", err);
    toast.error("❌ Error submitting product");
  } finally {
    setLoading(false);
  }
};

export const fetchProduct = async (
  setLoading,
  setProductDetails,
  productId
) => {
  try {
    setLoading(true);
    const res = await fetch(`/api/products/${productId}`);
    const data = await res.json();

    console.log("Fetched product data:", data);

    if (data.success && data.product) {
      setProductDetails({
        productName: data.product.productName || "",
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
      console.error("❌ Failed to load product:", data.message);
    }
  } catch (err) {
    console.error("❌ Error fetching product:", err);
  } finally {
    setLoading(false);
  }
};
