"use client";
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BillingPage = () => {
  const [customer, setCustomer] = useState({ name: "", whatsapp: "" });
  const [products, setProducts] = useState([]); // fetched products
  const [searchResults, setSearchResults] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchIndex, setActiveSearchIndex] = useState(null); // which item's search is active

  // fetch products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // search products
  const handleSearch = (query, searchIndex) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    if (!products || products.length === 0) return;

    const results = products.filter((p) =>
      p.productName?.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  // add product to bill (insert after specific index)
  const addProduct = (product, afterIndex) => {
    if (!product) return;

    const newItem = {
      _id: product._id,
      productName: product.productName,
      retailPrice: product.retailPrice || 0,
      wholesalePrice: product.wholesalePrice || 0,
      pricePoints: product.pricePoints || [],
      quantity: 1,
      priceType: "wholesale",
      customPrice: product.wholesalePrice || 0,
      selectedUnit: null,
    };

    setBillItems((prev) => {
      const newItems = [...prev];
      newItems.splice(afterIndex + 1, 0, newItem);
      return newItems;
    });

    // Clear search
    setSearchResults([]);
    setSearchQuery("");
    setActiveSearchIndex(null);
  };

  // add first product or show search for first item
  const addFirstProduct = (product = null) => {
    if (product) {
      // Add actual product
      setBillItems([
        {
          _id: product._id,
          productName: product.productName,
          retailPrice: product.retailPrice || 0,
          wholesalePrice: product.wholesalePrice || 0,
          pricePoints: product.pricePoints || [],
          quantity: 1,
          priceType: "wholesale",
          customPrice: product.wholesalePrice || 0,
          selectedUnit: null,
        },
      ]);
      setSearchResults([]);
      setSearchQuery("");
      setActiveSearchIndex(null);
    } else {
      // Show search for first item
      setActiveSearchIndex(0);
    }
  };

  // toggle search box for specific item
  const toggleSearch = (index) => {
    if (activeSearchIndex === index) {
      // Close search
      setActiveSearchIndex(null);
      setSearchResults([]);
      setSearchQuery("");
    } else {
      // Open search for this item
      setActiveSearchIndex(index);
      setSearchResults([]);
      setSearchQuery("");
    }
  };

  // remove product
  const removeProduct = (index) => {
    setBillItems((prev) => prev.filter((_, i) => i !== index));
  };

  // update quantity / price
  const updateItem = (index, field, value) => {
    setBillItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // calculate total
  const getTotal = () => {
    return billItems.reduce((sum, item) => {
      let price = 0;

      if (item.priceType === "retail") {
        price = item.retailPrice;
      } else if (item.priceType === "wholesale") {
        price = item.wholesalePrice;
      } else if (item.priceType === "custom") {
        price = item.customPrice;
      } else if (item.priceType.startsWith("unit:")) {
        // pricePoints selected
        const unit = item.selectedUnit;
        const point = item.pricePoints.find((p) => p.unit === unit);
        price = point ? point.price : 0;
      }

      return sum + price * item.quantity;
    }, 0);
  };

  const generatePdf = async () => {
    const node = document.getElementById("bill-root");
    if (!node) return;

    const canvas = await html2canvas(node, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 40; // 20pt margin
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let cursor = 20;
    pdf.addImage(imgData, "PNG", 20, cursor, imgWidth, imgHeight);

    // download
    pdf.save(`bill-${Date.now()}.pdf`);
  };

  const generateCleanPdf = async () => {
    const billElement = document.getElementById("bill-printable");
    if (!billElement) return;

    // Use html2canvas to render the DOM element
    const canvas = await html2canvas(billElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    // Convert canvas to PNG explicitly
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData); // now recognized as PNG
    const pdfWidth = pageWidth - 40; // 20pt margin each side
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 20, 20, pdfWidth, pdfHeight);
    pdf.save(`bill-${Date.now()}.pdf`);
  };

  const sendWhatsApp = async () => {
    const billElement = document.getElementById("bill-printable");
    if (!billElement) return;

    // Generate PDF blob
    const canvas = await html2canvas(billElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth - 40;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 20, 20, pdfWidth, pdfHeight);

    // Save PDF locally (user can attach to WhatsApp)
    pdf.save(`bill-${Date.now()}.pdf`);

    // Open WhatsApp Web / App with prefilled message
    const phone = customer.whatsapp; // number with country code, e.g., 91XXXXXXXXXX
    // Ensure country code is prefixed (e.g., 91 for India)
    let formattedPhone = phone.toString();
    if (!formattedPhone.startsWith("91")) {
      formattedPhone = "91" + formattedPhone;
    }
    const message = encodeURIComponent(
      `Hello ${customer.name},\nYour bill has been generated. Please see the attached PDF.`
    );

    window.open(`https://wa.me/${formattedPhone}?text=${message}`, "_blank");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
        {/* Header */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">
          New Bill
        </h1>

        {/* Customer Info */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-700 text-center sm:text-left">
            Customer Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="WhatsApp Number"
              value={customer.whatsapp}
              onChange={(e) =>
                setCustomer({ ...customer, whatsapp: e.target.value })
              }
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Bill Items */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center sm:text-left">
            Bill Items
          </h2>

          {billItems.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <p className="mb-4">
                No items added yet. Click the button below to add your first
                product.
              </p>
              <button
                onClick={() => addFirstProduct()}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                + Add First Product
              </button>

              {/* 🔧 RESTORED: Search for first product */}
              {activeSearchIndex === 0 && (
                <div className="mt-4 max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products by name..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value, 0)}
                      className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    {searchResults.length > 0 && (
                      <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {searchResults.map((product) => (
                          <div
                            key={product._id}
                            onClick={() => addFirstProduct(product)}
                            className="p-3 cursor-pointer hover:bg-blue-50 border-b border-gray-200 last:border-b-0"
                          >
                            <div className="font-medium text-gray-800">
                              {product.productName}
                            </div>
                            <div className="text-sm text-gray-600">
                              Retail: ₹{product.retailPrice} | Wholesale: ₹
                              {product.wholesalePrice}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {billItems.map((item, index) => (
                <div key={`${item._id}-${index}`}>
                  {/* Product Item */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">
                      {/* Product Name */}
                      <div className="flex-1 min-w-[160px]">
                        <span className="font-medium text-gray-800">
                          {item.productName}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-600 mb-1">
                          Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, "quantity", +e.target.value)
                          }
                          className="border border-gray-300 w-24 sm:w-20 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Price Type */}
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-600 mb-1">
                          Price Type
                        </label>
                        <select
                          value={item.priceType}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateItem(index, "priceType", val);
                            if (val.startsWith("unit:")) {
                              updateItem(
                                index,
                                "selectedUnit",
                                val.replace("unit:", "")
                              );
                            }
                          }}
                          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="retail">
                            Retail ₹{item.retailPrice}
                          </option>
                          <option value="wholesale">
                            Wholesale ₹{item.wholesalePrice}
                          </option>
                          <option value="custom">Custom Price</option>
                          {item.pricePoints.map((pp) => (
                            <option key={pp._id} value={`unit:${pp.unit}`}>
                              {pp.unit} ₹{pp.price}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Custom Price */}
                      {item.priceType === "custom" && (
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-600 mb-1">
                            Custom Price
                          </label>
                          <input
                            type="number"
                            value={item.customPrice}
                            onChange={(e) =>
                              updateItem(index, "customPrice", +e.target.value)
                            }
                            className="border border-gray-300 w-28 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}

                      {/* Item Total */}
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-600 mb-1">
                          Total
                        </label>
                        <span className="font-semibold text-green-600">
                          ₹
                          {(() => {
                            let price = 0;
                            if (item.priceType === "retail")
                              price = item.retailPrice;
                            else if (item.priceType === "wholesale")
                              price = item.wholesalePrice;
                            else if (item.priceType === "custom")
                              price = item.customPrice;
                            else if (item.priceType.startsWith("unit:")) {
                              const point = item.pricePoints.find(
                                (p) => p.unit === item.selectedUnit
                              );
                              price = point ? point.price : 0;
                            }
                            return (price * item.quantity).toLocaleString();
                          })()}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleSearch(index)}
                          className={`${
                            activeSearchIndex === index
                              ? "bg-orange-500 hover:bg-orange-600"
                              : "bg-green-500 hover:bg-green-600"
                          } text-white px-3 py-2 rounded`}
                        >
                          {activeSearchIndex === index ? "Cancel" : "+ Add"}
                        </button>
                        <button
                          onClick={() => removeProduct(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 🔧 RESTORED: Inline Search Box under each item */}
                  {activeSearchIndex === index && (
                    <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Add product after "{item.productName}"
                      </h3>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search products by name..."
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value, index)}
                          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        {searchResults.length > 0 && (
                          <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            {searchResults.map((product) => (
                              <div
                                key={product._id}
                                onClick={() => addProduct(product, index)}
                                className="p-3 cursor-pointer hover:bg-blue-50 border-b border-gray-200 last:border-b-0"
                              >
                                <div className="font-medium text-gray-800">
                                  {product.productName}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Retail: ₹{product.retailPrice} | Wholesale: ₹
                                  {product.wholesalePrice}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-lg font-medium text-gray-700">
              Grand Total:
            </span>
            <span className="text-2xl font-bold text-green-600">
              ₹{getTotal().toLocaleString()}
            </span>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
              Generate Bill
            </button>
            <button className="flex-1 sm:flex-none bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium">
              Save as Draft
            </button>
          </div>
        </div>

        {/* Printable Bill */}
        <div className="mt-6 overflow-x-auto">
          <div id="bill-printable" className="w-full max-w-lg mx-auto">
            <div className="p-4 font-sans">
              <h2 className="text-center mb-4 text-lg font-bold">
                Bhaiya Ji Cosmetics
              </h2>
              <h2 className="text-center mb-4 text-lg font-bold">8090159071</h2>
              <div className="mb-4 text-sm">
                <strong>Customer:</strong> {customer.name || "N/A"} <br />
                <strong>WhatsApp:</strong> {customer.whatsapp || "N/A"} <br />
              </div>

              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border-b p-2 text-left">Product</th>
                    <th className="border-b p-2 text-center">Calculation</th>
                    <th className="border-b p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {billItems.map((item, i) => {
                    let price = 0;
                    if (item.priceType === "retail") price = item.retailPrice;
                    else if (item.priceType === "wholesale")
                      price = item.wholesalePrice;
                    else if (item.priceType === "custom")
                      price = item.customPrice;
                    else if (item.priceType.startsWith("unit:")) {
                      const point = item.pricePoints.find(
                        (p) => p.unit === item.selectedUnit
                      );
                      price = point ? point.price : 0;
                    }
                    const total = price * item.quantity;
                    const unitName = item.selectedUnit || "pcs";

                    return (
                      <tr key={i}>
                        <td className="p-2">{item.productName}</td>
                        <td className="p-2 text-center">
                          {item.quantity} {unitName} × ₹{price}
                        </td>
                        <td className="p-2 text-right font-semibold">
                          ₹{total}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="text-right mt-4 font-bold">
                Grand Total: ₹{getTotal().toLocaleString()}
              </div>

              <div className="mt-6 text-center text-xs text-gray-500">
                Thank you for shopping with us!
              </div>
            </div>
          </div>
        </div>

        {/* PDF + WhatsApp Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={generateCleanPdf}
            className="flex-1 sm:flex-none bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download Bill PDF
          </button>
          <button
            onClick={sendWhatsApp}
            className="flex-1 sm:flex-none bg-green-500 text-white px-4 py-2 rounded"
          >
            Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
