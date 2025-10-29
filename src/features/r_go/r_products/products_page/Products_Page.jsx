"use client";

import Header, { MainHeader } from "@/re_usables/components/ui/Header";
import React, { useEffect, useState } from "react";
import { Input } from "@/re_usables/components/form/Input";
import { useProductsStore } from "../store";
import { CreateButton } from "@/re_usables/components/Button";
import { fetchProducts } from "../productListing/funcs";
import Products_Listing from "./products_listing/Products_Listing";

const ProductListingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState();
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
    <div className="w-full h-full p-4 sm:p-6 text-black relative flex flex-col">
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

      <Products_Listing
        setLoading={setLoading}
        loading={loading}
        searchTerm={searchTerm}
        filteredProducts={filteredProducts}
        setProducts={setProducts}
        products={products}
      />
    </div>
  );
};

export default ProductListingPage;
