"use client";
import { GreenButton } from "@/re_usables/components/Button";
import { Input } from "@/re_usables/components/form/Input";
import Label from "@/re_usables/components/form/Label";
import Header from "@/re_usables/components/ui/Header";
import React, { useEffect } from "react";
import { unitCostSettingToProduct } from "../funcs";
import useLoadingStore from "@/store/loading";
import { addSubUnit, setLevel1Unit } from "./funcs";
import DisplayTable from "./DisplayTable";
import SubUnit_Form from "./SubUnit_Form";
import Mainunit_Form from "./Mainunit_Form";

const StockManagement = ({ product, setProduct }) => {
  useEffect(() => {
    const _product = unitCostSettingToProduct(product);
    setProduct(_product);
  }, [product?.units]);

  return (
    <div className=" w-full mx-auto rounded-lg ">
      <Header>Manage Stock</Header>

      <h2 className="text-xl font-bold mb-4">Create Product</h2>

      <div className="mb-3">
        <Label>Product Name</Label>
        <Input
          value={product?.productName}
          onChange={(e) =>
            setProduct({ ...product, productName: e.target.value })
          }
        />
      </div>

      <Mainunit_Form product={product} setProduct={setProduct} />

      {product?.units?.length === 0 && (
        <GreenButton onClick={() => setLevel1Unit("unitName", "", setProduct)}>
          Add Main Unit
        </GreenButton>
      )}

      <SubUnit_Form product={product} setProduct={setProduct} />

      {product?.units?.length > 0 && (
        <button
          onClick={() => addSubUnit(setProduct)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add New Unit
        </button>
      )}

      <DisplayTable product={product} />
    </div>
  );
};

export default StockManagement;
