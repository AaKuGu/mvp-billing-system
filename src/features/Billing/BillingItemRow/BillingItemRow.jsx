import React, { useEffect, useState } from "react";
import ProductName from "./Name/ProductName";
import SearchedProductsSuggestions from "./Name/SearchedProductsSuggestions";
import Quantity from "./Quantity";
import UnitSelection from "./UnitSelection";
import TotalPrice from "./totalPrice/TotalPrice";
import RemoveButton from "./remove/RemoveButton";
import UnitPrice from "./unitPrice/UnitPrice";
import { emptyBillProduct } from "../constant";

const BillingItemRow = ({
  key,
  rowData,
  index,
  billingItems,
  setBillingItems,
  fuse,
}) => {
  // const [query, setQuery] = useState(d?.productName || "");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("pcs");
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [customProduct, setCustomProduct] = useState(true);
  // const [selectedUnit, setSelectedUnit] = useState(
  //   d?.wholesale?.[0]?.unit || ""
  // );

  // console.log("selectedproduct from db : ", selectedProductFromDB);

  // const isCustomProduct = d?.isProductFromDB === false;

  // For DB product → fixed calculation
  // const customUnitPrice = d?.unitPrice || 0;

  // Handlers for custom product

  // const [selectedUnit, setSelectedUnit] = useState(
  //   d?.selectedUnit || d?.wholesale?.[0]?.unit || "pcs"
  // );

  //following will contain the data got from server of the products,
  //  you could use prouductsFromServer type of state, but since
  //  i was using fuse, and if its already storing the data of
  // that so why to create another state for the same purpose
  const fuseDocs = fuse?._docs;

  // Make sure billingItems also has this unit at mount
  // React.useEffect(() => {
  //   if (!d?.selectedUnit) {
  //     const updated = [...billingItems];
  //     updated[i] = { ...d, selectedUnit };
  //     setBillingItems(updated);
  //   }
  // }, []);

  // useEffect(() => {
  //   const newBilling = [...billingItems];

  //   // reset only if user types a custom product (not selecting from DB yet)
  //   newBilling[i] = {
  //     ...emptyBillProduct,
  //     productName: query, // keep the typed query
  //   };

  //   setBillingItems(newBilling);
  // }, [query]);

  // useEffect(() => {
  //   if (selectedProductFromDB) {
  //     if (d?.unit && d?.quantity) {
  //       const unitValue = selectedProductFromDB.wholesale.find(
  //         (f) => f.unit === d.unit.engLabel
  //       );
  //       const newBilling = [...billingItems];
  //       newBilling[i].unitPrice = unitValue?.price;
  //       newBilling[i].totalPrice = unitValue?.price * d?.quantity;
  //       setBillingItems(newBilling);
  //     }
  //   }
  // }, [d?.unit, d?.quantity, selectedProductFromDB]);

  useEffect(() => {
    console.log("always running");
    if (rowData.dataFromDB) {
      setCustomProduct(false);
    }
  }, [rowData.dataFromDB]);

  useEffect(() => {
    setUnit("");
    setQuantity(0);
    setUnitPrice(0);
    setTotalPrice(0);
  }, [name]);

  useEffect(() => {
    if (!customProduct) {
      if (unit && quantity) {
        const data = rowData.dataFromDB.wholesale.find((d) => d.unit === unit);
        alert(JSON.stringify(data));
        const unitPrice = data.price;
        setUnitPrice(unitPrice);
        setTotalPrice(unitPrice * quantity);
      }
    }
  }, [rowData.itemDetails.unit, rowData.itemDetails.quantity]);

  return (
    <div className="flex w-full text-black p-2 gap-4 relative items-center border-b">
      {/* Product Name */}
      <div className="relative flex-1 w-[300px]">
        <ProductName
          setSearchedProducts={setSearchedProducts}
          billingItems={billingItems}
          fuse={fuse}
          name={name}
          setName={setName}
          index={index}
          setBillingItems={setBillingItems}
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
      <UnitPrice unitPrice={unitPrice} customProduct={customProduct} />
      <TotalPrice customProduct={customProduct} totalPrice={totalPrice} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* name = {name} */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* rowData = {JSON.stringify(rowData?.dataFromDB?.wholesale)} */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* rowData.itemDetails.unit = {rowData.itemDetails.unit} */}
      {/* billingItems = {JSON.stringify(billingItems)} */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* searchedProducts = {JSON.stringify(searchedProducts)} */}
    </div>
  );
};

export default BillingItemRow;
