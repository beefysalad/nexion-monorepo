import { z } from "zod"

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
})

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Use at least 8 characters"),
})

type SignInValues = z.infer<typeof signInSchema>
type SignUpValues = z.infer<typeof signUpSchema>

export { signInSchema, signUpSchema }
export type { SignInValues, SignUpValues }
