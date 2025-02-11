import { z } from "zod";

export const registerFormSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match",
    path: ["passwordConfirmation"],
  });

export type RegistrationFormSchema = z.infer<typeof registerFormSchema>;
