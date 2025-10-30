"use client";

import React from "react";
import Product_Details_Form from "../common/Product_Details_Form";
import { saveAProduct } from "./funcs";

const Create_Product = () => {
  return <Product_Details_Form saveAProduct={saveAProduct} />;
};

export default Create_Product;
