import { ClerkProvider } from "@clerk/nextjs"
import { Geist_Mono, Inter, Roboto } from "next/font/google"
import NextTopLoader from "nextjs-toploader"

import "@workspace/ui/globals.css"
import { AuthHeader } from "@/components/auth/auth-header"
import { AppProviders } from "@/components/providers/app-providers"
import { cn } from "@workspace/ui/lib/utils"

const robotoHeading = Roboto({ subsets: ["latin"], variable: "--font-heading" })

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        robotoHeading.variable
      )}
    >
      <body>
        <ClerkProvider>
          <NextTopLoader
            color="var(--primary)"
            showSpinner={false}
            shadow={false}
          />
          <AppProviders>
            <AuthHeader />
            {children}
          </AppProviders>
        </ClerkProvider>
      </body>
    </html>
  )
}
