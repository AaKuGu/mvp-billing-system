import React, { useEffect, useState } from "react";
import ProductName from "./Name/ProductName";
import SearchedProductsSuggestions from "./Name/SearchedProductsSuggestions";
import Quantity from "./Quantity";
import UnitSelection from "./UnitSelection";
import TotalPrice from "./totalPrice/TotalPrice";
import RemoveButton from "./remove/RemoveButton";
import UnitPrice from "./unitPrice/UnitPrice";

const BillingItemRow = ({
  key,
  rowData,
  index,
  billingItems,
  setBillingItems,
  fuse,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("pcs");
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [customProduct, setCustomProduct] = useState(true);

  useEffect(() => {
    console.log("always running");
    if (rowData.dataFromDB) {
      setCustomProduct(false);
    }
  }, [rowData.dataFromDB]);

  useEffect(() => {
    setUnit("pcs");
    setQuantity(0);
    setUnitPrice(0);
    setTotalPrice(0);
  }, [name]);

  useEffect(() => {
    if (customProduct) {
      if (unit && quantity) {
        // If unitPrice changes → update totalPrice
        // setTotalPrice(Number(unitPrice) * Number(quantity));
      }
    } else {
      if (unit && quantity && rowData.dataFromDB) {
        const data = rowData.dataFromDB.wholesale.find((d) => d.unit === unit);
        if (data) {
          const dbUnitPrice = data.price;
          setUnitPrice(dbUnitPrice);
          setTotalPrice(dbUnitPrice * quantity);
        }
      }
    }
  }, [unitPrice, quantity, unit, customProduct, rowData.dataFromDB]);

  useEffect(() => {
    if (unit && quantity && unitPrice) {
      setTotalPrice(unitPrice * quantity);
    }
  }, [unitPrice]);

  useEffect(() => {
    if (unit && quantity && totalPrice) {
      setUnitPrice(totalPrice / quantity);
    }
  }, [totalPrice]);

  return (
    <div
      className="flex flex-col md:flex-row w-full text-black p-2 gap-4 relative items-center border-b"
      key={key}
    >
      <div className="relative flex-1 w-[300px]">
        <ProductName
          setSearchedProducts={setSearchedProducts}
          billingItems={billingItems}
          fuse={fuse}
          name={name}
          setName={setName}
          index={index}
          setBillingItems={setBillingItems}
          setCustomProduct={setCustomProduct}
        />
        <SearchedProductsSuggestions
          searchedProducts={searchedProducts}
          setBillingItems={setBillingItems}
          setSearchedProducts={setSearchedProducts}
          billingItems={billingItems}
          index={index}
          name={name}
          setName={setName}
          setUnit={setUnit}
          setQuantity={setQuantity}
          setUnitPrice={setUnitPrice}
          setTotalPrice={setTotalPrice}
        />
      </div>
      <Quantity
        billingItems={billingItems}
        rowData={rowData}
        index={index}
        setBillingItems={setBillingItems}
        setQuantity={setQuantity}
        quantity={quantity}
      />
      <UnitSelection
        rowData={rowData}
        billingItems={billingItems}
        setBillingItems={setBillingItems}
        index={index}
        setUnit={setUnit}
        unit={unit}
        customProduct={customProduct}
      />
      <UnitPrice
        unitPrice={unitPrice}
        customProduct={customProduct}
        setUnitPrice={setUnitPrice}
      />
      <TotalPrice
        customProduct={customProduct}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      />
      <RemoveButton
        billingItems={billingItems}
        setBillingItems={setBillingItems}
        id={rowData.id}
        index={index}
      />
    </div>
  );
};

export default BillingItemRow;
