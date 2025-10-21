import React from "react";
import Avatar_Section from "./avatar_section/Avatar_Section";
import Logo from "./Logo";

const Nav_Bar = ({ data }) => {
  return (
    <div className={`w-full flex justify-between gap-2 px-5 py-2`}>
      <Logo/>
      <Avatar_Section data={data} />
    </div>
  );
};

export default Nav_Bar;
