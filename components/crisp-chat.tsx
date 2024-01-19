"use client";

import React, { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
const CrispChat = () => {
  useEffect(() => {
    Crisp.configure(process.env.CRISP_WEBSITE_ID!);
  });
  return null;
};

export default CrispChat;
