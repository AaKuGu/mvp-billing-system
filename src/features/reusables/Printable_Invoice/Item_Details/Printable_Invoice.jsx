import React from "react";
import Business_Details from "./Business_Details";
import Invoice_Info from "./Invoice_Info";
import Customer_Details from "./Customer_Details";
import Item_Details from "./Item_Details";
import Footer from "./Footer";
const Printable_Invoice = ({ bill }) => {
  const {
    business_details,
    customer_details,
    bill_number,
    createdAt,
    item_details,
    pricing_details,
  } = bill;

  const {
    businessName = "",
    businessDescription = "",
    businessTagline = "",
    businessEmail = "",
    businessContactNo = "",
    businessAddress = "",
    gstNumber = "",
  } = business_details || {};

  const { _id } = bill;

  const created_date = new Date(createdAt).toLocaleString();

  return (
    <div
      id="printable-area"
      className="max-w-3xl mx-auto bg-white p-8 shadow-md border border-gray-300"
    >
      <Business_Details
        business_details={{
          businessName,
          businessDescription,
          businessTagline,
          gstNumber,
        }}
      />

      <div className="mb-6 flex justify-between text-sm text-gray-700">
        <Invoice_Info invoice_info={{ bill_number, id: _id, created_date }} />
        <Customer_Details customer_details={customer_details} />
      </div>

      <Item_Details data={{ item_details, pricing_details }} />
      <Footer data={{ businessAddress, businessEmail, businessContactNo }} />
    </div>
  );
};

export default Printable_Invoice;
