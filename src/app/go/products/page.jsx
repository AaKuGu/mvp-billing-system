"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setProducts(products.filter((p) => p._id !== id));
        alert("✅ Product deleted successfully");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 text-black">
      {/* Header */}
      <header className="w-full text-center text-2xl font-semibold mb-4">
        Products
      </header>

      {/* Top Controls */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link
          href={`products/create`}
          className="bg-green-700 hover:bg-green-800 px-5 py-2 text-white rounded-lg transition w-full sm:w-auto text-center"
        >
          Create Product
        </Link>
      </div>

      {/* Product List */}
      <div className="w-full">
        <header className="w-full text-center text-xl font-medium mb-3">
          List of Products
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-300">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-sm sm:text-base">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Cost Price</th>
                    <th className="p-2 border">Wholesale Price</th>
                    <th className="p-2 border">Retail Price</th>
                    <th className="p-2 border">Price Points</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr
                      key={p._id}
                      className="text-center hover:bg-gray-50 transition"
                    >
                      <td className="p-2 border">{p.productName}</td>
                      <td className="p-2 border">₹{p.costPrice}</td>
                      <td className="p-2 border">₹{p.wholesalePrice}</td>
                      <td className="p-2 border">₹{p.retailPrice}</td>
                      <td className="p-2 border">
                        {p.pricePoints?.map((pp, i) => (
                          <span
                            key={i}
                            className="block text-sm sm:text-base text-gray-700"
                          >
                            {pp.unit} - ₹{pp.price}
                          </span>
                        ))}
                      </td>
                      <td className="p-2 border flex flex-col sm:flex-row gap-2 justify-center">
                        <Link
                          href={`/go/products/update/${p._id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4">
              {filteredProducts.map((p) => (
                <div
                  key={p._id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <p className="font-semibold">{p.productName}</p>
                  <p>Cost Price: ₹{p.costPrice}</p>
                  <p>Wholesale Price: ₹{p.wholesalePrice}</p>
                  <p>Retail Price: ₹{p.retailPrice}</p>
                  <div className="mt-2">
                    <p className="font-medium">Price Points:</p>
                    {p.pricePoints?.map((pp, i) => (
                      <span
                        key={i}
                        className="block text-sm text-gray-700 ml-2"
                      >
                        {pp.unit} - ₹{pp.price}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link
                      href={`/go/products/update/${p._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition w-full text-center"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition w-full"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
