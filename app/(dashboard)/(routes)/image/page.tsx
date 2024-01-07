"use client";
import Heading from "@/components/Heading";
import { Download, ImageIcon, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import OpenAI from "openai";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";

const ImagePage = () => {
  const ProModal = useProModal();
  const router = useRouter();
  const [Images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      setImages([]);

      const response = await axios.post("/api/image", values);
      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);

      form.reset();
    } catch (error: any) {
      // TODO:
      if (error?.response?.status === 403) {
        ProModal.onOpen();
      }
      console.log(error);
    } finally {
      router.refresh;
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Prompt to Image"
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" rounded-2xl
              border
              border-violet-500/20
              w-full 
                p-4 
                px-3 
                md:px-6
               focus-within:shadow-sm
                grid
                 grid-cols-12
                  gap-2
                "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className=" col-span-12 lg:col-span-6 ">
                    <FormControl className="m-0 p-0 ">
                      <Input
                        className=" bg-slate-200  outline-none focus-visible:ring-offset-slate-200 focus-visible:ring-slate-200"
                        disabled={isLoading}
                        placeholder="A picture of moon light in winter"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 mt-2 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 mt-2 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className=" col-span-12 lg:col-span-2 bg-slate-700 hover:bg-slate-900 w-full "
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center bg-muted justify-center">
              <Loader />
            </div>
          )}
          {Images.length === 0 && !isLoading && (
            <Empty label="There is no Images here" />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {Images.map((src) => (
              <Card key={src} className=" rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt="Image" fill src={src} />
                </div>
                <CardFooter className="p-3">
                  <Button
                    onClick={() => window.open(src)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="h-3 w-3 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;

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
