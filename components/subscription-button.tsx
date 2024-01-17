"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import axios from "axios";

interface SubscriptionButtonProps {
  isSubscribed: boolean;
}
const SubscriptionButton = ({
  isSubscribed = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      variant={isSubscribed ? "default" : "ultimate"}
      onClick={onClick}
    >
      {isSubscribed ? "Mange your Subscription" : "Upgrade"}
      {!isSubscribed && <Zap className="w-3 h-3 mx-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
