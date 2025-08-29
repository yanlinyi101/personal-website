import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Linyi Yan - 商业 × AI × 个人展示",
  description: "专注于商业策略与人工智能的交叉领域，擅长智能客服系统搭建、RAG应用开发与Prompt工程",
  keywords: ["AI", "商业策略", "RAG", "Prompt工程", "智能客服", "数据分析"],
  authors: [{ name: "Linyi Yan", url: "https://example.com" }],
  creator: "Linyi Yan",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://example.com",
    title: "Linyi Yan - 商业 × AI × 个人展示",
    description: "专注于商业策略与人工智能的交叉领域，擅长智能客服系统搭建、RAG应用开发与Prompt工程",
    siteName: "Linyi Yan 个人网站",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Linyi Yan - 商业 × AI × 个人展示",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linyi Yan - 商业 × AI × 个人展示",
    description: "专注于商业策略与人工智能的交叉领域，擅长智能客服系统搭建、RAG应用开发与Prompt工程",
    images: ["/images/og.png"],
  },
  icons: {
    icon: [
      { url: "/images/favicon.svg" },
      { url: "/favicon.ico" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
} 