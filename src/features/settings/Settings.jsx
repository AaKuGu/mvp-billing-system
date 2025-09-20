import Header from "@/shared/components/ui/Header";
import React from "react";
import { settings } from "./constant";
import SettingsCard from "./settings_card/SettingsCard";

const Settings = () => {
  return (
    <div className={`w-full h-full flex flex-col gap-2 md:px-3 px-1`}>
      <Header>Settings</Header>
      <main className={`w-full h-full bg-white flex flex-col gap-2`}>
        {settings?.map((d, i) => {
          return <SettingsCard data={d} key={i?.name} index={i} />;
        })}
      </main>
    </div>
  );
};

export default Settings;
