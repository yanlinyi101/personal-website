import Link from "next/link"
import { Download } from "lucide-react"

import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "简历下载 | Linyi Yan - 商业 × AI × 个人展示",
  description: "查看和下载我的个人简历，了解我的专业背景、技能和经验。",
}

export default function CVPage() {
  return (
    <Section className="pt-32 min-h-[calc(100vh-16rem)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">简历下载</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          您可以在线查看或下载我的简历，了解我的专业背景、技能和工作经验。
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link href="/cv/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Download className="h-5 w-5" /> 下载简历
          </Link>
        </Button>
      </div>
      
      <div className="w-full max-w-4xl mx-auto bg-muted rounded-lg overflow-hidden border shadow-lg">
        <div className="aspect-[1/1.414] w-full relative">
          <object
            data="/cv/resume.pdf"
            type="application/pdf"
            className="absolute inset-0 w-full h-full"
          >
            <div className="flex items-center justify-center h-full flex-col p-8">
              <p className="mb-4 text-center">
                您的浏览器无法直接显示PDF文件，请下载后查看。
              </p>
              <Button asChild>
                <Link href="/cv/resume.pdf" target="_blank" rel="noopener noreferrer">
                  下载简历
                </Link>
              </Button>
            </div>
          </object>
        </div>
      </div>
    </Section>
  )
} 