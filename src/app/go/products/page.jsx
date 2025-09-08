"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setProducts(products.filter((p) => p._id !== id)); // update UI
        alert("✅ Product deleted successfully");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="w-full min-h-screen p-6 text-black">
      <header className="w-full text-center text-black text-2xl mb-4">
        Products
      </header>

      <div className="w-full flex items-center justify-end mb-4">
        <Link
          href={`products/create`}
          className="bg-green-700 px-5 py-2 text-white rounded-lg"
        >
          Create Product
        </Link>
      </div>

      <div className="w-full">
        <header className="w-full text-center text-black text-xl mb-3">
          List of Products
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Cost Price</th>
                <th className="p-2 border">Wholesale Price</th>
                <th className="p-2 border">Retail Price</th>
                <th className="p-2 border">Price Points</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="text-center">
                  <td className="p-2 border">{p.productName}</td>
                  <td className="p-2 border">₹{p.costPrice}</td>
                  <td className="p-2 border">₹{p.wholesalePrice}</td>
                  <td className="p-2 border">₹{p.retailPrice}</td>
                  <td className="p-2 border">
                    {p.pricePoints?.map((pp, i) => (
                      <span key={i} className="block">
                        {pp.unit} - ₹{pp.price}
                      </span>
                    ))}
                  </td>
                  <td className="p-2 border flex gap-2 justify-center">
                    <Link
                      href={`/go/products/update/${p._id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Page;
