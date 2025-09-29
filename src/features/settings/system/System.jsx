import React from "react";
import { systemSettings } from "./constant";
import SettingsCard from "../settings_card/SettingsCard";

const System = () => {
  return (
    <div>
      {systemSettings?.map((d, i) => {
        return <SettingsCard data={d} key={i?.name} index={i} />;
      })}
    </div>
  );
};

export default System;
