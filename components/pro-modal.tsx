import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { Check, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
const tools = [
  {
    label: "Conversation",
    emj: "💭",
    color: "text-violet-500",
    bgColor: "bg-gray-500/10",
    href: "/conversation",
  },
  {
    label: "code Generation",
    emj: "👨‍💻",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    href: "/code",
  },
  {
    label: "Image Generation",
    emj: "🖌️",
    color: "text-pink-500",
    bgColor: "bg-gray-500/10",
    href: "/image",
  },
  {
    label: "Music Generation",
    emj: "🎶",
    color: "text-green-500",
    bgColor: "bg-gray-500/10",
    href: "/music",
  },

  {
    label: "Video Generation",
    emj: "🎞️",

    color: "text-orange-500",
    bgColor: "bg-gray-500/10",
    href: "/video",
  },
];
const ProModal = () => {
  const ProModal = useProModal();
  const [loading, setLoading] = useState(false);
  const onSubscibe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      // console.log(error, "STRIPE_CLIENT_ERROR");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={ProModal.isOpen} onOpenChange={ProModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" flex justify-center items-center flex-col  gap-y-4 pb-1">
            <div className="flex justify-center items-center gap-x-2 font-bold py-1">
              Upgrade Now
              <Badge variant={"ultimate"} className="uppercase text-sm py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className=" text-center pr-2 space-y-2 text-slate-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className=" p-2 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-3 ">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <div className="w-5 h-5 text-l">{tool.emj}</div>
                  </div>
                  <div className=" font-semibold text-sm">{tool.label}</div>
                </div>
                <Check />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscibe}
            size="lg"
            variant="ultimate"
            className="w-full"
          >
            Upgrade <Zap className="fill-white w-4 h-4 mx-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
