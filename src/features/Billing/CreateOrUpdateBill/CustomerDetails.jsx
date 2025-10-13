import React from "react";
import Label from "../../../shared/components/form/Label";
import { Input } from "@/shared/components/form/Input";

const CustomerDetails = ({
  customerName,
  setCustomerName,
  setWhatsappNum,
  whatsappNum,
  customerAddressArea,
  setCustomerAddressArea,
}) => {
  return (
    <>
      <div>
        <Label>Customer Name</Label>
        <Input
          type="text"
          value={customerName}
          onChange={(e) => {
            setCustomerName(e.target.value);
          }}
        />
      </div>
      <div>
        <Label>Whatsapp Number</Label>
        <Input
          type="number"
          value={whatsappNum}
          onChange={(e) => {
            setWhatsappNum(e.target.value);
          }}
        />
      </div>
      <div>
        <Label>Area</Label>
        <Input
          type="text"
          value={customerAddressArea}
          onChange={(e) => {
            setCustomerAddressArea(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default CustomerDetails;
