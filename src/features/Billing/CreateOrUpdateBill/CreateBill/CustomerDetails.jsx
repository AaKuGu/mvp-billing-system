import React from "react";
import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";

const CustomerDetails = ({
  customerName,
  setCustomerName,
  setWhatsappNum,
  whatsappNum,
  customerAddressArea,
  setCustomerAddressArea,
}) => {
  return (
    <div className={`w-full flex flex-col md:flex-row gap-2`}>
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
    </div>
  );
};

export default CustomerDetails;
