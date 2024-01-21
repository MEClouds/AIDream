"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-32 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Great AI App for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-400">
          <TypewriterComponent
            options={{
              strings: [
                "AI Chatbot.",
                "Image Generation.",
                "Video Generation.",
                "Music Generation.",
                "Code Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-500">
        Create great content using AI 10x faster.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="ultimate"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            {isSignedIn ? "Go to Dashboard" : "Start for Free"}
          </Button>
        </Link>
      </div>
      <div className="text-zinc-500 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};

export default LandingHero;
