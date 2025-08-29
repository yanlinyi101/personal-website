import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"

import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import profile from "@/content/profile.json"

export const metadata = {
  title: "关于我 | Linyi Yan - 商业 × AI × 个人展示",
  description: "AI产品与运营专家，专注于商业策略与人工智能的交叉领域。擅长智能客服系统搭建、RAG应用开发与Prompt工程。",
}

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-bold mb-4">{profile.name} <span className="text-primary">{profile.nameChinese}</span></h1>
            <p className="text-xl text-muted-foreground mb-6">{profile.tagline}</p>
            <div className="prose dark:prose-invert mb-6">
              <p>{profile.bio}</p>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <Button asChild>
              <Link href="/cv/resume.pdf" target="_blank" rel="noopener noreferrer" className="gap-2">
                <Download className="h-4 w-4" /> 下载简历
              </Link>
            </Button>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-6xl font-bold text-white">
                {profile.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="能力图谱" className="bg-muted/50">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {profile.skills.map((skill) => (
            <Card key={skill} className="bg-background hover:border-primary transition-all hover:-translate-y-1">
              <CardHeader className="p-4">
                <CardTitle className="text-center text-sm">{skill}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="教育背景">
        <div className="space-y-8">
          {profile.education.map((edu, index) => (
            <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-primary">
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-muted-foreground">{edu.school} · {edu.year}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="工作经历" className="bg-muted/50">
        <div className="space-y-12">
          {profile.experience.map((exp, index) => (
            <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-border">
              <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary -translate-x-1.5" />
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <p className="text-muted-foreground mb-2">{exp.company} · {exp.period}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="证书与认证">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.certificates.map((cert, index) => (
            <Card key={index} className="hover:border-primary transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
                <p className="text-muted-foreground">{cert.issuer} · {cert.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始合作了吗？</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            无论是项目咨询、技术合作还是职业机会，都欢迎随时联系。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">联系我</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/cv/resume.pdf" target="_blank" rel="noopener noreferrer">
                下载简历
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
} 