"use client";
import Heading from "@/components/Heading";
import { Code } from "lucide-react";
import React from "react";

import * as z from "zod";
import { formSchema } from "./constants";
import { ZodError } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { useChat } from "ai/react";

const CodePage = () => {
  const ProModal = useProModal();
  const router = useRouter();
  const { messages, input, isLoading, error, handleInputChange, handleSubmit } =
    useChat({ api: "/api/code" });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      formSchema.parse(values);

      //Send user message to OpenAI using the useChat hook
      handleSubmit(e);
      if (error?.message.includes("Your free trial has expired.")) {
        ProModal.onOpen();
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        toast.error(error.errors[0].message || "Please enter a valid prompt.");
      } else {
        console.log("CODE_ERROR", error);
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };
  // Rendering the CodePage component
  return (
    <div>
      <Heading
        title="Code Generation"
        description="Advanced Code Generation form input text"
        icon={Code}
        iconColor="text-sky-500"
        bgColor="bg-sky-500/10"
      />
      <div className="px-4 lg:px-8">
        {/* Form for code generation */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ prompt: input }, e);
          }}
          className="rounded-2xl border-2 border-violet-500/20 w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
        >
          <div className="col-span-12 lg:col-span-10">
            <div className="m-0 p-0">
              {/* Input field for the code prompt */}
              <Input
                className="bg-slate-200 outline-none focus-visible:ring-offset-slate-200 focus-visible:ring-slate-200"
                disabled={isLoading}
                placeholder="Simple input form using Next.js with shadcn-ui"
                value={input}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Button to generate code */}
          <Button
            type="submit"
            className="col-span-12 lg:col-span-2 bg-slate-700 hover:bg-slate-900 w-full"
            disabled={isLoading}
          >
            Generate
          </Button>
        </form>
        {/* Section for displaying generated code and messages */}
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center bg-muted justify-center">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="There is no code generated here" />
          )}
          <div className="flex flex-col-reverse gap-y-r">
            {/* Displaying user and bot messages with generated code */}
            {messages.map((message) => (
              <div
                key={message.role}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white my-1 border border-black/10"
                    : "bg-muted "
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <div id="response">
                  {/* Displaying generated code using ReactMarkdown */}
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full m-y bg-cyan-800/10 p-3 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-cyan-700/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the CodePage component as the default export
export default CodePage;

// Heading: This is a custom component from "@/components/Heading",
// displaying a heading with an icon, title, and description.

// MessageSquare: An icon from the Lucide React library,
// representing a message square.

// React, useForm from react-hook-form, and various utilities from Zod and other libraries.

// Several UI components like Form, FormControl, FormField, FormItem, Input,
// and Button from "@/components/ui" that might be custom components with predefined styles.

// Form Initialization:

// useForm: It's a hook from the react-hook-form library for managing forms.
//  The formSchema from Zod is used as the resolver to handle form validation.

// isLoading: A boolean derived from the form state, indicating whether the form is currently submitting.

// onSubmit: An asynchronous function handling form submission.
// In this case, it logs the form values to the console.

// Component Structure:

// The component renders a Heading component with a title, description,
//  and an icon representing a message square.

// The main content includes a form with an input field and a "Generate" button.

// The form uses Tailwind CSS classes for styling:

// rounded-2xl: Applies rounded corners with a larger radius.
// border-2 border-violet-500/50: Adds a 2-pixel border with a violet color at 20% opacity.
// w-full: Sets the width to 100%.
// p-4 px-3 md:px-6: Sets padding with different values for various screen sizes.
// focus-within:shadow-sm: Applies a small shadow when the form is focused.
// grid grid-cols-12 gap-2: Creates a grid layout with 12 columns and a gap between them.
// The form consists of an input field (prompt) and a "Generate" button, both styled using Tailwind CSS.

// The contents output area is a simple div with some margin-top.

// Tailwind CSS Classes in Form Components:

// Various Tailwind CSS classes are applied to components, such as col-span-12, lg:col-span-10,
// lg:col-span-2, bg-violet-800, hover:bg-violet-900, etc., providing responsive and interactive styling.
