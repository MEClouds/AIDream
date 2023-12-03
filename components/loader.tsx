import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className=" w-11 h-11 relative animate-pulse">
        <Image alt="logo" fill src="/logo.png" />
      </div>
      <p className="text-sm text-muted-foreground">AIDream Thinking...</p>
    </div>
  );
};

export default Loader;
