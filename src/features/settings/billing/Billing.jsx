import React from "react";
import { billingSettings } from "./constant";
import SettingsCard from "../settings_card/SettingsCard";

const Billing = () => {
  return (
    <div>
      {billingSettings?.map((d, i) => {
        return <SettingsCard data={d} key={i?.name} index={i} />;
      })}
    </div>
  );
};

export default Billing;
