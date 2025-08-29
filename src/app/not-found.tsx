import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "页面不存在 | Linyi Yan - 商业 × AI × 个人展示",
  description: "您访问的页面不存在或已被移除。",
}

export default function NotFound() {
  return (
    <Section className="pt-32 min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">页面不存在</h2>
        <p className="text-muted-foreground mb-8">
          您访问的页面不存在或已被移除。
        </p>
        <Button asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" /> 返回首页
          </Link>
        </Button>
      </div>
    </Section>
  )
} 