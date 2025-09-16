import React, { useEffect, useState } from "react";
import ProductName from "./Name/ProductName";
import SearchedProductsSuggestions from "./Name/SearchedProductsSuggestions";
import Quantity from "./Quantity";
import UnitSelection from "./UnitSelection";
import TotalPrice from "./totalPrice/TotalPrice";
import RemoveButton from "./remove/RemoveButton";
import UnitPrice from "./unitPrice/UnitPrice";
import { units } from "@/shared/components/constants";

const BillingItemRow = ({
  key,
  rowData,
  index,
  billingItems,
  setBillingItems,
  fuse,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState("pcs");
  const [unitPrice, setUnitPrice] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [customProduct, setCustomProduct] = useState(true);

  useEffect(() => {
    console.log("always running");
    if (rowData.dataFromDB) {
      setCustomProduct(false);
    }
  }, [rowData.dataFromDB]);

  // useEffect(() => {
  //   // setUnit("pcs");
  //   // setQuantity(null); this is commencted as this was creating problem when upon first mount if data exists in localstorage and while setting it, it was always null, despite having values
  //   setUnitPrice(null);
  //   setTotalPrice(null);
  // }, [name]);

  useEffect(() => {
    if (customProduct) {
      if (unit && quantity && unitPrice) {
        // If unitPrice changes → update totalPrice
        setTotalPrice(Number(unitPrice) * Number(quantity));
        const _billingItems = [...billingItems];
        _billingItems[index].itemDetails = {
          ..._billingItems[index].itemDetails,
          quantity: Number(quantity),
          totalPrice: Number(unitPrice) * quantity,
        };
        setBillingItems(_billingItems);
      }
    } else {
      if (unit && quantity && rowData.dataFromDB) {
        const data = rowData.dataFromDB.wholesale.find((d) => d.unit === unit);
        if (data) {
          const dbUnitPrice = data.price;
          setUnitPrice(dbUnitPrice);
          setTotalPrice(dbUnitPrice * quantity);
          const _billingItems = [...billingItems];
          _billingItems[index].itemDetails = {
            ..._billingItems[index].itemDetails,
            quantity: Number(quantity),
            unitPrice: dbUnitPrice,
            totalPrice: dbUnitPrice * quantity,
          };
          setBillingItems(_billingItems);
        }
      }
    }
  }, [unitPrice, quantity, unit, customProduct, rowData.dataFromDB]);

  useEffect(() => {
    if (unit && quantity && unitPrice) {
      setTotalPrice(unitPrice * quantity);
      const _billingItems = [...billingItems];
      _billingItems[index].itemDetails = {
        ..._billingItems[index].itemDetails,
        totalPrice: unitPrice * quantity,
      };
      setBillingItems(_billingItems);
    }
  }, [unitPrice]);

  useEffect(() => {
    if (unit && quantity && totalPrice) {
      setUnitPrice(totalPrice / quantity);

      const _billingItems = [...billingItems];
      _billingItems[index].itemDetails = {
        ..._billingItems[index].itemDetails,
        unitPrice: totalPrice / quantity,
      };
      setBillingItems(_billingItems);
    }
  }, [totalPrice]);

  useEffect(() => {
    if (rowData) {
      const itemDetails = rowData.itemDetails;
      const qty = itemDetails.quantity; // ✅ no shadowing

      const _unit = units.find((d) => d.hiLabel === itemDetails.unit);
      setQuantity(Number(qty));
      setName(itemDetails.productName);
      setUnit(_unit.engLabel);
      setUnitPrice(itemDetails.unitPrice);
      setTotalPrice(itemDetails.totalPrice);
    }
  }, []);

  return (
    <div
      className="flex flex-col md:flex-row w-full text-black p-2 gap-4 relative items-center border-b"
      key={key}
    >
      <div>{index + 1}.</div>
      <div className="relative flex-1 w-[300px]">
        <ProductName
          setSearchedProducts={setSearchedProducts}
          billingItems={billingItems}
          fuse={fuse}
          name={name}
          setName={setName}
          setUnit={setUnit}
          setTotalPrice={setTotalPrice}
          setUnitPrice={setUnitPrice}
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
