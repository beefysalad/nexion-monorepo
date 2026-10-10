"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

import { AuthCard } from "@/components/auth/auth-card"
import { authClient } from "@/lib/auth-client"
import { signUpSchema } from "@/lib/validations/auth"
import type { SignUpValues } from "@/lib/validations/auth"

function SignUpForm() {
  const router = useRouter()
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  })
  const { errors, isSubmitting } = form.formState

  async function onSubmit(values: SignUpValues) {
    const { error } = await authClient.signUp.email(values)

    if (error) {
      form.setError("root", {
        message: error.message ?? "Unable to sign up. Please try again.",
      })
      return
    }

    router.replace("/dashboard")
    router.refresh()
  }

  return (
    <AuthCard
      title="Create an account"
      description="Start with your name, email and a password."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-foreground font-medium underline underline-offset-4"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="sign-up-name">Name</FieldLabel>
            <Input
              id="sign-up-name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              {...form.register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="sign-up-email">Email</FieldLabel>
            <Input
              id="sign-up-email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...form.register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
          <Field data-invalid={Boolean(errors.password)}>
            <FieldLabel htmlFor="sign-up-password">Password</FieldLabel>
            <Input
              id="sign-up-password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              {...form.register("password")}
            />
            <FieldDescription>Use at least 8 characters.</FieldDescription>
            <FieldError errors={[errors.password]} />
          </Field>
          <FieldError errors={[errors.root]} />
          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            loadingText="Creating account"
          >
            Sign up
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  )
}

export { SignUpForm }
