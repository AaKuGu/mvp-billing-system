import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import BillingItemRow from "./BillingItemRow";
import { emptyBillProduct } from "./constant";
import PlusMinusButtons from "./PlusMinusButtons";

const BillingItems = ({ billingItems, setBillingItems }) => {
  const [products, setProducts] = useState([]);
  const [fuse, setFuse] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);

          // Initialize Fuse
          const fuseInstance = new Fuse(data.products, {
            keys: ["productName"],
            includeScore: true,
            threshold: 0.4, // typo-tolerant
            ignoreLocation: false, // prioritize prefix matches
            minMatchCharLength: 1,
          });
          setFuse(fuseInstance);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <header className="font-bold text-lg">Billing Items</header>

      <div className="flex flex-col gap-2 mt-2">
        {billingItems.map((d, i) => (
          <BillingItemRow
            key={i}
            d={d}
            i={i}
            billingItems={billingItems}
            setBillingItems={setBillingItems}
            fuse={fuse}
          />
        ))}
      </div>

      {/* Plus / Minus Buttons */}
      <PlusMinusButtons setBillingItems={setBillingItems} />

      {JSON.stringify(billingItems[0]?.pricePoints)}
      {JSON.stringify(billingItems[0]?.productName)}
    </div>
  );
};

export default BillingItems;
