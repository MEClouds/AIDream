import { checkSubscription } from "@/lib/subscription";
import { checkUseLimit, increaseLimit } from "@/lib/use-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
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
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });
    if (!isSubscribed) {
      await increaseLimit();
    }

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CONVERSTION_ERROR]", error);
    return new NextResponse("Intternal error", { status: 500 });
  }
}
