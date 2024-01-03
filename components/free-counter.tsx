import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { FREE_TIER_COUNTS } from "@/constants";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { Progress } from "./ui/progress";

interface FreeCounterProps {
  limitCount: number;
}
const FreeCounter = ({ limitCount = 0 }: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3 ">
      <Card className=" bg-white/10 border-0">
        <CardContent className="py-5">
          <div className=" text-center text-sm text-white mb-3 space-y-2 ">
            <p>
              {limitCount}/{FREE_TIER_COUNTS} Free Generation
            </p>
            <Progress
              className="h-2"
              value={(limitCount / FREE_TIER_COUNTS) * 100}
            />
          </div>
          <Button variant="ultimate" className="w-full">
            Upgrade now <Zap className="w-3 h-3 mx-2 fill-white " />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
