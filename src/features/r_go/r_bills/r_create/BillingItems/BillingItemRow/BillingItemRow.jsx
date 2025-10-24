import React, { useEffect, useState } from "react";
import ProductName from "./Name/ProductName";
import SearchedProductsSuggestions from "./Name/SearchedProductsSuggestions";
import Quantity from "./Quantity";
import UnitSelection from "./UnitSelection";
import TotalPrice from "./totalPrice/TotalPrice";
import RemoveButton from "./remove/RemoveButton";
import UnitPrice from "./unitPrice/UnitPrice";
import { units } from "@/re_usables/components/constants";
import { roundTo } from "@/re_usables/funcs";

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
  const [unitName, setUnitName] = useState("pcs");
  const [unitPrice, setUnitPrice] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [customProduct, setCustomProduct] = useState(true);

  console.log("billing items : billings items row : ", billingItems);

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
    // alert("one runs" + JSON.stringify(billingItems));

    if (customProduct) {
      if (unitName && quantity && unitPrice) {
        // If unitPrice changes → update totalPrice
        setTotalPrice(roundTo(unitPrice * quantity));
        const _billingItems = [...billingItems];
        _billingItems[index].itemDetails = {
          ..._billingItems[index].itemDetails,
          quantity: quantity,
          totalPrice: roundTo(unitPrice * quantity),
          // totalPrice: Number(unitPrice) * quantity,
        };
        setBillingItems(_billingItems);
      }
    } else {
      if (unitName && quantity && rowData.dataFromDB) {
        let totalPrice = roundTo(unitPrice * quantity);

        // alert(totalPrice);

        setTotalPrice(totalPrice);
        const _billingItems = [...billingItems];
        _billingItems[index].itemDetails = {
          ..._billingItems[index].itemDetails,
          quantity: quantity,
          totalPrice,
        };
        setBillingItems(_billingItems);
      }
    }
  }, [unitPrice, quantity, unitName, customProduct, rowData.dataFromDB]);

  useEffect(() => {
    // alert("unit price change" + JSON.stringify(billingItems));
    if (unitName && quantity && unitPrice) {
      setTotalPrice(roundTo(unitPrice * quantity));
      const _billingItems = [...billingItems];
      _billingItems[index].itemDetails = {
        ..._billingItems[index].itemDetails,
        // totalPrice: unitPrice * quantity,
        totalPrice: roundTo(unitPrice * quantity),
      };
      setBillingItems(_billingItems);
    }
  }, [unitPrice]);

  useEffect(() => {
    // alert("unit changed to : " + JSON.stringify(billingItems));
    if (!customProduct) {
      rowData?.dataFromDB?.units?.find((d) => {
        if (d.unitName === unitName) {
          setUnitPrice(roundTo(d.unitSellingPrice));
          return true;
        }
      });
    }
  }, [unitName]);

  useEffect(() => {
    // alert("total price change" + JSON.stringify(billingItems));
    if (unitName && quantity && totalPrice) {
      setUnitPrice(roundTo(totalPrice / quantity));
      const _billingItems = [...billingItems];
      _billingItems[index].itemDetails = {
        ..._billingItems[index].itemDetails,
        unitPrice: roundTo(totalPrice / quantity),
      };
      setBillingItems(_billingItems);
    }
  }, [totalPrice]);

  useEffect(() => {
    // alert("row data changed" + JSON.stringify(billingItems));
    if (rowData) {
      const itemDetails = rowData.itemDetails;

      // alert("item details : " + JSON.stringify(itemDetails));

      const qty = itemDetails.quantity; // ✅ no shadowing

      setQuantity(qty);
      setName(itemDetails.productName);
      setUnitName(itemDetails.unitName);
      // setUnit(_unit.engLabel);
      setUnitPrice(itemDetails.unitPrice);
      setTotalPrice(itemDetails.totalPrice);
    }
  }, []);

  return (
    <div
      className="flex flex-col md:flex-row  w-full text-black p-1 gap-4 relative items-center "
      key={key}
    >
      <div>{index + 1}.</div>

      <div className="flex flex-col md:flex-row w-full text-black gap-4 relative items-center border-b">
        <div className="relative flex-1 w-full ">
          <ProductName
            setSearchedProducts={setSearchedProducts}
            billingItems={billingItems}
            fuse={fuse}
            name={name}
            setName={setName}
            setUnitName={setUnitName}
            setTotalPrice={setTotalPrice}
            setUnitPrice={setUnitPrice}
            index={index}
            setBillingItems={setBillingItems}
            setCustomProduct={setCustomProduct}
          />
          {/* {JSON.stringify(searchedProducts)} */}
          <SearchedProductsSuggestions
            searchedProducts={searchedProducts}
            setBillingItems={setBillingItems}
            setSearchedProducts={setSearchedProducts}
            billingItems={billingItems}
            index={index}
            name={name}
            setName={setName}
            setUnitName={setUnitName}
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
          unitName={unitName}
          name={name}
          customProduct={customProduct}
        />
        <UnitSelection
          rowData={rowData}
          billingItems={billingItems}
          setBillingItems={setBillingItems}
          index={index}
          setUnitName={setUnitName}
          unitName={unitName}
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
    </div>
  );
};

export default BillingItemRow;
