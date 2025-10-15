"use client";

import { fetchProducts } from "@/features/products/productListing/funcs";
import LoadingWrapper from "@/shared/components/Loading/LoadingWrapper";
import Header, { MainHeader } from "@/shared/components/ui/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MainListing from "./MainListing/MainListing";
import { Input } from "@/shared/components/form/Input";
import { useProductsStore } from "../store";
import { CreateButton } from "@/shared/components/Button";

const ProductListingPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { products, setProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts(setProducts, setLoading);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products); // show all if search empty
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(lowerSearch)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  return (
    <div className="w-full h-full p-4 sm:p-6 text-black relative">
      <LoadingWrapper loading={loading}>
        <MainHeader>Products</MainHeader>
        {/* <Header>Products</Header> */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <Input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CreateButton href={`products/create`}>
            Create&nbsp;Product
          </CreateButton>
        </div>

        {/* {JSON.stringify(products)} */}

        <MainListing
          setLoading={setLoading}
          loading={loading}
          searchTerm={searchTerm}
          filteredProducts={filteredProducts}
          setProducts={setProducts}
          products={products}
        />
      </LoadingWrapper>
    </div>
  );
};

export default ProductListingPage;
