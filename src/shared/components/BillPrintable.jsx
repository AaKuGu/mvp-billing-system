import React from "react";

const BillPrintable = ({ customer, billItems, getTotal }) => {
  const date = new Date().toLocaleString();

  return (
    <div
      style={{ padding: "20px", fontFamily: "Arial", width: "400px" }}
      id="bill-printable"
    >

      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>My Store</h2>
      <div style={{ marginBottom: "10px" }}>
        <strong>Customer:</strong> {customer.name || "N/A"} <br />
        <strong>WhatsApp:</strong> {customer.whatsapp || "N/A"} <br />
        <strong>Date:</strong> {date}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #000" }}>Product</th>
            <th style={{ borderBottom: "1px solid #000" }}>Qty</th>
            <th style={{ borderBottom: "1px solid #000" }}>Unit Price</th>
            <th style={{ borderBottom: "1px solid #000" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {billItems.map((item, i) => {
            let price = 0;
            if (item.priceType === "retail") price = item.retailPrice;
            else if (item.priceType === "wholesale")
              price = item.wholesalePrice;
            else if (item.priceType === "custom") price = item.customPrice;
            else if (item.priceType.startsWith("unit:")) {
              const point = item.pricePoints.find(
                (p) => p.unit === item.selectedUnit
              );
              price = point ? point.price : 0;
            }
            const total = price * item.quantity;

            return (
              <tr key={i}>
                <td style={{ padding: "4px 0" }}>{item.productName}</td>
                <td style={{ textAlign: "center" }}>{item.quantity}</td>
                <td style={{ textAlign: "right" }}>₹{price}</td>
                <td style={{ textAlign: "right" }}>₹{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        style={{ textAlign: "right", marginTop: "10px", fontWeight: "bold" }}
      >
        Grand Total: ₹{getTotal().toLocaleString()}
      </div>

      <div style={{ marginTop: "20px", textAlign: "center", fontSize: "12px" }}>
        Thank you for shopping with us!
      </div>
    </div>
  );
};

export default BillPrintable;
