import { z } from "zod";

export const RegisterFormSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 2 characters long")
    .max(8, "First name must be at most 8 characters long"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 2 characters long")
    .max(8, "Last name must be at most 8 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password should be less than 15 characters.")
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, min 8 characters & max 15 characters long"
    ),
});
