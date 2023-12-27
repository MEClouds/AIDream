import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Image is required",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photos",
  },
  {
    value: "3",
    label: "3 Photos",
  },
  {
    value: "4",
    label: "4 Photos",
  },
  {
    value: "5",
    label: "5 Photos",
  },
];

export const resolutionOptions = [
  { value: "256x256", label: "256x256" },
  { value: "512x512", label: "512x512" },
  { value: "1024x1024", label: "1024x1024" },
];

// Importing Zod (import * as z from "zod";):

// This line imports the Zod library and aliases it as z.
//  The * as syntax allows importing all exports from the "zod" library
//  and referring to them using the z namespace.

// Defining a Form Schema (formSchema):

// z.object: Creates a schema for an object.
// { prompt: ... }: Specifies the properties of the object and their validation rules.
// Prompt Property Validation (prompt: z.string().min(1, { message: "Prompt is required" })):

// prompt: This is a property of the object being validated.
// z.string(): Specifies that the value of the "prompt" property must be a string.
// .min(1, { message: "Prompt is required" }): Sets a validation rule that the string must have a minimum length of 1 character.
// If this validation fails, a custom error message is provided: "Prompt is required".

// In summary, the formSchema object represents a schema for validating form data,
// specifically for an object with a "prompt" property.
// The "prompt" property must be a string with a minimum length of 1 character,
// and if it doesn't meet this criterion, a custom error message will be displayed.
