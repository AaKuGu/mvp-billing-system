import React, { useEffect, useState, useCallback, useRef } from "react";
import { Input } from "@/re_usables/components/form/Input";
import Label from "@/re_usables/components/form/Label";
import { customer_suggestions_handler } from "./funcs";
import { authClient } from "@/lib/auth-client";
import { on_change_handler } from "@/re_usables/funcs";
import { use_customer_details } from "../store";

const Customer_Details = () => {
  const { customer_details, set_customer_details_keyValue } =
    use_customer_details();

  const { data: session } = authClient.useSession();

  const is_first_render = useRef(true);

  const user_id = session?.user?.id;
  const [customer_suggestions, set_customer_suggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleCustomerNameChange = (e) => {
    const value = e.target.value;

    set_customer_details_keyValue("customer_name", value);

    // clear the previous timeout if user keeps typing
    if (typingTimeout) clearTimeout(typingTimeout);

    // set a new timeout
    const timeout = setTimeout(async () => {
      if (value.trim().length > 0 && user_id) {
        const customers = await customer_suggestions_handler(user_id, value);
        set_customer_suggestions(customers);
      } else {
        set_customer_suggestions([]);
      }
    }, 400); // wait 400ms after user stops typing

    setTypingTimeout(timeout);
  };

  useEffect(() => {
    if (is_first_render.current) {
      is_first_render.current = false;
      return;
    }
    localStorage.setItem("customer_details", JSON.stringify(customer_details));
  }, [
    customer_details.customer_address_area,
    customer_details.customer_name,
    customer_details.whatsapp_num,
  ]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-2">
      <div className="w-full">
        <Label>Customer Name</Label>
        <Input
          type="text"
          value={customer_details?.customer_name}
          onChange={handleCustomerNameChange}
        />
        {customer_suggestions.length > 0 && (
          <div className="mt-2 bg-white shadow-md rounded p-2 max-h-48 overflow-y-auto">
            {customer_suggestions.map((cust) => (
              <div
                key={cust._id}
                className="p-1 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => {
                  setCustomerId(cust._id);
                  setCustomerName(cust.customerName);
                  setWhatsappNum(cust.whatsappNum || "");
                  setCustomerAddressArea(cust.customerAddressArea || "");
                  set_customer_suggestions([]); // close suggestions
                }}
              >
                <p className="font-medium">{cust.customerName}</p>
                {cust.whatsappNum && (
                  <p className="text-sm text-gray-500">{cust.whatsappNum}</p>
                )}
                {cust.customerAddressArea && (
                  <p className="text-sm text-gray-400">
                    {cust.customerAddressArea}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full">
        <Label>Whatsapp Number</Label>
        <Input
          type="number"
          value={customer_details?.whatsapp_num}
          onChange={(e) =>
            set_customer_details_keyValue("whatsapp_num", e.target.value)
          }
        />
      </div>
      <div className="w-full">
        <Label>Area</Label>
        <Input
          type="text"
          value={customer_details?.customer_address_area}
          onChange={(e) =>
            set_customer_details_keyValue(
              "customer_address_area",
              e.target.value
            )
          }
        />
      </div>
    </div>
  );
};

export default Customer_Details;
