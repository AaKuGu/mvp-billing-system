import React from "react";
import { Input } from "@/shared/components/form/Input";
import Header from "../../../../shared/components/ui/Header";
import Label from "@/shared/components/form/Label";
import { getValue, handleChangeForName } from "./funcs";
import Select from "@/shared/components/form/Select";
import { category } from "./constant";

const ProductName = ({ productDetails, setProductDetails }) => {
  return (
    <div className={`flex flex-col gap-2`}>
      <Header htmlFor="">Product Name</Header>
      <div className="flex items-center gap-2">
        <Label styles="min-w-[50px]">Category&nbsp;:</Label>
        <Select
          name="category"
          id="category"
          onChange={(e) => {
            const temp = { ...productDetails };
            temp.category = e.target.value;
            setProductDetails(temp);
          }}
          value={productDetails?.category}
        >
          {category?.map((d, i) => {
            return (
              <option key={i} value={d?.name}>
                {d?.label}
              </option>
            );
          })}
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Label styles="min-w-[50px]">English&nbsp;:</Label>
        <Input
          type="text"
          placeholder={`Type English Name`}
          value={getValue("eng", productDetails)}
          onChange={(e) =>
            handleChangeForName("eng", e.target.value, setProductDetails)
          }
        />
      </div>
      <div className="flex items-center gap-2">
        <Label styles="min-w-[50px]">Hindi&nbsp;:</Label>
        <Input
          type="text"
          placeholder={`Type Hindi Name`}
          value={getValue("hi", productDetails)}
          onChange={(e) =>
            handleChangeForName("hi", e.target.value, setProductDetails)
          }
        />
      </div>
    </div>
  );
};

export default ProductName;
