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
import {
  ArrowRight,
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  Video,
  Zap,
} from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "code",
    icon: Code,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },

  {
    label: "Video Generation",
    icon: Video,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
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
                    <tool.icon className={cn("w-5 h-5", tool.color)} />
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
