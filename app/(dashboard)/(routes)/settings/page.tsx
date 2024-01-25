import Heading from "@/components/Heading";
import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";
import React from "react";

const SettingPage = async () => {
  const isSubscribed = await checkSubscription;
  return (
    <div>
      <Heading
        title="Settings"
        description="Mange account settings."
        emj="⚙️"
        bgColor="bg-gray-500/10"
      />
      <div className="px-4 lg:px-8 space-y-3 ">
        <div className="text-muted-forground text-sm">
          {isSubscribed!
            ? " You are currently on premium plan."
            : "You are currently in free plan."}
        </div>
        <SubscriptionButton isSubscribed={!!isSubscribed} />
      </div>
    </div>
  );
};

export default SettingPage;
