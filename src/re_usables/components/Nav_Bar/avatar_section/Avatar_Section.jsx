"use client";

import React, { useState } from "react";
import Avatar from "./Avatar";
import { authClient } from "@/lib/auth-client";

const Avatar_Section = ({ data }) => {
  const [clickedAvatar, setClickedAvatar] = useState(false);


  return (
    <div onClick={() => setClickedAvatar((prev) => !prev)}>
      <Avatar />
    </div>
  );
};

export default Avatar_Section;
