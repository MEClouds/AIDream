import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkUseLimit, increaseLimit } from "@/lib/use-limit";
import { OpenAIStream, StreamingTextResponse } from "ai";

import OpenAI from "openai";
import { checkSubscription } from "@/lib/subscription";

export const config = {
  runtime: "edge",
};
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const instructionMessage: OpenAI.Chat.CreateChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are the best code generator , You must answer in markdown code snippets only, For explanations use code comments",
};
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
    const freeTrial = await checkUseLimit();
    const isSubscribed = await checkSubscription();
    if (!freeTrial && !isSubscribed) {
      return new NextResponse("Your free trial has expired.", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
      temperature: 0.7,
      stream: true,
    });

    if (!isSubscribed) {
      await increaseLimit();
    }
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Intternal error", { status: 500 });
  }
}
