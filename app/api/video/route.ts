import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkUseLimit, increaseLimit } from "../../../lib/use-limit";
import { checkSubscription } from "@/lib/subscription";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }
    //  old openai v3
    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages,
    // });
    const freeTrial = await checkUseLimit();
    const isSubscribed = await checkSubscription();
    if (!freeTrial && !isSubscribed) {
      return new NextResponse("Your free trial has expired.", { status: 403 });
    }
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );
    if (!isSubscribed) {
      await increaseLimit();
    }
    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
