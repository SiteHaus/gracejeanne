import z from "zod";

export const signInForm = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export const signUpForm = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string(),
  lastName: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  isSubscriber: z.boolean(),
});
