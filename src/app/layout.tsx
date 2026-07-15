import type { Metadata } from "next"
import { Provider } from "@/components/ui/provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fuad Hassan — Systems Architect & Data Engineer",
  description:
    "DevTerminal portfolio — serverless Next.js, MongoDB Atlas case studies, high-throughput data pipelines.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
