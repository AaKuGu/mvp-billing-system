"use client";

import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import React, { useState } from "react";
import UnitPriceDecide from "./UnitPriceDecide";
import { GreenButton } from "@/shared/components/Button";
import { savePricing } from "./funcs";
import useLoadingStore from "@/store/loading";
import Header from "@/shared/components/ui/Header";

const PriceManagement = ({ product, setProduct }) => {
  const { setLoading, loading } = useLoadingStore();

  return (
    <div className={`w-full h-full my-10 `}>
      <Header>Manage Pricing</Header>
      <div className={`flex flex-col gap-5 w-full `}>
        {product?.units.map((d, i) => {
          return <UnitPriceDecide i={i} d={d} setProduct={setProduct} />;
        })}
      </div>

      {/* <GreenButton loading={loading} onClick={() => savePricing(setLoading)}>
        Save
      </GreenButton> */}
    </div>
  );
};

export default PriceManagement;
