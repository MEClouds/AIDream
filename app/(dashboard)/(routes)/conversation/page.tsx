// Import the necessary dependencies
"use client";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useProModal } from "@/hooks/use-pro-modal";
import Loader from "@/components/loader";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import FormatResponse from "@/components/formatResponse";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import { MessageSquare } from "lucide-react";
import * as z from "zod";
import Heading from "@/components/Heading";
import { ZodError } from "zod";
import { formSchema } from "./constants";
// Define the component
const ConverstationPage = () => {
  // Initialize necessary hooks and state
  const ProModal = useProModal();
  const router = useRouter();
  const { messages, input, isLoading, handleInputChange, handleSubmit, error } =
    useChat({ api: "/api/conversation" });

  // Define the function to handle form submission
  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      formSchema.parse(values);
      // Send user message to OpenAI using the useChat hook
      await handleSubmit(e);

      // Check for specific error conditions
      if (error?.message.includes("Your free trial has expired.")) {
        ProModal.onOpen();
      }

      // Perform additional actions after successful submission if needed
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message || "Please enter a valid prompt.");
      } else {
        // Handle  other errors
        console.log("[CONVERSATION_ERROR]", error);
        toast.error("Something went wrong");
      }

      // Log the error to the console
    } finally {
      // Refresh the router
      router.refresh();
    }
  };

  // Render the component
  return (
    <div>
      <Heading
        title="Conversation"
        description="Our Advanced AI Chatbot model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          {/* Render the form with the useChat hook */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({ prompt: input }, e);
            }}
            className="rounded-2xl border-2 border-violet-500/20 w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <div className="col-span-12 lg:col-span-10">
              <div className="m-0 p-0">
                {/* Input field using the useChat hook */}
                <Input
                  className="border-slate-200 outline-none focus-visible:ring-offset-slate-200 focus-visible:ring-slate-200 bg-slate-200"
                  disabled={isLoading}
                  placeholder="How do I use tailwindcss"
                  value={input}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button
              type="submit"
              className=" col-span-12 lg:col-span-2 bg-slate-700 hover:bg-slate-900 w-full "
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center bg-muted justify-center">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="There is no Conversation here" />
          )}

          <div className="flex flex-col-reverse gap-y-r">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "p-8 w-full mt-1 flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted "
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <div>
                  {/* Display the message content */}
                  <div id="response">
                    <FormatResponse content={message.content} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConverstationPage;
