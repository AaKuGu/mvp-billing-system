"use client";

import { fetchProducts } from "@/features/products/productListing/funcs";
import LoadingWrapper from "@/shared/components/Loading/LoadingWrapper";
import Header from "@/shared/components/ui/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MainListing from "./MainListing/MainListing";
import { Input } from "@/shared/components/form/Input";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts(setProducts, setLoading);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products); // show all if search empty
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = products.filter((product) =>
        product.productName.some(
          (d) => d.lang === "eng" && d.value.toLowerCase().includes(lowerSearch)
        )
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  return (
    <div className="w-full h-full p-4 sm:p-6 text-black border-[2px] border-black">
      <LoadingWrapper loading={loading}>
        <Header>Products</Header>
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <Input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link
            href={`products/create`}
            className="w-full bg-green-700 hover:bg-green-800 px-5 py-2 text-white rounded-lg transition w-full sm:w-auto text-center"
          >
            Create&nbsp;Product
          </Link>
        </div>

        {/* <MainListing
          setLoading={setLoading}
          loading={loading}
          searchTerm={searchTerm}
          filteredProducts={filteredProducts}
          setProducts={setProducts}
          products={products}
        /> */}
      </LoadingWrapper>
    </div>
  );
};

export default ProductListing;
