// Used for bill summary in create/update and in bill listing
export const calculateGrandTotal = (
  billingItems,
  set_pricing_details,
  discount,
  gst_percent
) => {
  const item_details = onlyItemDetailsHandler(billingItems);

  const all_items_price = item_details?.reduce((acc, item) => {
    const _totalPrice = Number(item?.totalPrice) || 0;
    return acc + _totalPrice;
  }, 0);

  // // 1️⃣ Calculate the total of all items

  // console.log("total price : ", totalPrice);
  // console.log("total price : ", totalPrice);

  // 2️⃣ Apply discount (ensure it doesn't go below 0)
  const price_after_discount = Math.max(all_items_price - discount, 0);
  console.log("price_after_discount:", price_after_discount);

  // 3️⃣ Calculate GST on the discounted price
  const gst_amount = (price_after_discount * gst_percent) / 100;
  console.log("gst_amount:", gst_amount);

  // 4️⃣ Add GST to get price after GST
  const price_after_gst = price_after_discount + gst_amount;

  // 5️⃣ Round off to nearest rupee
  const rounded_value = Math.round(price_after_gst);

  // 6️⃣ Calculate round-off difference (can be +ve or -ve)
  const round_off = Number((rounded_value - price_after_gst).toFixed(2));

  // 7️⃣ Final grand total after round-off
  const grand_total = rounded_value;

  const pricing_details = {
    discount,
    price_before_discount: Number(all_items_price?.toFixed(2)),
    price_after_discount: price_after_discount,
    gst_percent,
    gst_amount: Number(gst_amount?.toFixed(2)),
    price_after_gst: Number(price_after_gst?.toFixed(2)),
    round_off,
    grand_total,
  };

  if (typeof window !== "undefined" && localStorage) {
    localStorage.setItem("pricing_details", JSON.stringify(pricing_details));
  }

  set_pricing_details(pricing_details);

  // return {
  //   price_before_discount: totalPrice,
  //   price_after_discount: price_after_discount,
  //   gst_percent,
  //   gst_amount: gst_amount.toFixed(2),
  //   price_after_gst: price_after_gst.toFixed(2),
  //   round_off,
  //   grand_total,
  // };
};

// Extract only item details from billing items
export const onlyItemDetailsHandler = (billingItems) => {
  return billingItems?.map((d) => d?.itemDetails);
};
  