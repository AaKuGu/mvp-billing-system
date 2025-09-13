"use client";

import { handleDelete } from "@/features/products/productListing/funcs";
import { RedButton } from "@/shared/components/Button";
import LoadingWrapper from "@/shared/components/Loading/LoadingWrapper";
import Header from "@/shared/components/ui/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "./apiCall";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await fetchAllProducts();
    if (data) {
      setProducts(data.products);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter((p) =>
    p.productName
      .find((n) => n.lang === "eng")
      ?.value.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // helper for rendering price arrays
  const renderPriceArray = (arr) =>
    arr?.length > 0 ? (
      arr.map((pp, i) => (
        <span key={i} className="block text-sm sm:text-base text-gray-700">
          {pp.unit} - ₹{pp.price}
        </span>
      ))
    ) : (
      <span className="text-gray-400 text-sm">N/A</span>
    );

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 text-black">
      {/* Header */}
      <LoadingWrapper loading={loading}>
        <Header>Products</Header>

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
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-sm sm:text-base">
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Cost</th>
                      <th className="p-2 border">Wholesale</th>
                      <th className="p-2 border">Retail</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr
                        key={p._id}
                        className="text-center hover:bg-gray-50 transition"
                      >
                        <td className="p-2 border ">
                          {p.productName.find((n) => n.lang === "eng")?.value ||
                            ""}
                          <br />
                          {p.productName.find((n) => n.lang === "hi")?.value ||
                            ""}
                        </td>

                        <td className="p-2 border">
                          {renderPriceArray(p.cost)}
                        </td>
                        <td className="p-2 border">
                          {renderPriceArray(p.wholesale)}
                        </td>
                        <td className="p-2 border">
                          {renderPriceArray(p.retail)}
                        </td>
                        <td className="p-2 border flex flex-col sm:flex-row gap-2 justify-center">
                          <Link
                            href={`/go/products/update/${p._id}`}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
                          >
                            Update
                          </Link>
                          <button
                            onClick={() => {
                              setLoading(true);
                              handleDelete(
                                p._id,
                                setProducts,
                                products,
                                setLoading
                              );
                            }}
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
                    <p className="font-semibold">
                      {p.productName.find((n) => n.lang === "eng")?.value || ""}
                      {p.productName.find((n) => n.lang === "hi")?.value || ""}
                    </p>
                    <div className="mt-2">
                      <p className="font-medium">Cost:</p>
                      {renderPriceArray(p.cost)}
                    </div>
                    <div className="mt-2">
                      <p className="font-medium">Wholesale:</p>
                      {renderPriceArray(p.wholesale)}
                    </div>
                    <div className="mt-2">
                      <p className="font-medium">Retail:</p>
                      {renderPriceArray(p.retail)}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Link
                        href={`/go/products/update/${p._id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition w-full text-center"
                      >
                        Update
                      </Link>
                      <RedButton
                        onClick={() => {
                          setLoading(true);
                          handleDelete(
                            p._id,
                            setProducts,
                            products,
                            setLoading
                          );
                        }}
                      >
                        Delete
                      </RedButton>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};

export default ProductListing;
