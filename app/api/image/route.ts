import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkUseLimit, increaseLimit } from "@/lib/use-limit";

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

import OpenAI from "openai";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
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
    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    if (!isSubscribed) {
      await increaseLimit();
    }
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Intternal error", { status: 500 });
  }
}
