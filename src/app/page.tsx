import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Briefcase, ChevronRight, Code, Database, LineChart, Lightbulb, Users } from "lucide-react"

import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParticleBackground } from "@/components/particle-background"

import projects from "@/content/projects.json"
import posts from "@/content/posts.json"
import { formatDate } from "@/lib/utils"

export default function HomePage() {
  // Get the latest 3 posts
  const latestPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3)

  const highlightItems = [
    {
      title: "智能客服从0→1",
      description: "构建完整的企业级智能客服系统，实现自助率提升与人力成本降低",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "流程自动化与数据治理",
      description: "设计并实施企业级数据治理框架，结合AI技术实现关键业务流程自动化",
      icon: <Database className="h-6 w-6 text-primary" />,
    },
    {
      title: "RAG / Prompt / 评测方法论",
      description: "开发RAG系统最佳实践框架，包括向量数据库选型、Embedding策略、检索优化",
      icon: <Code className="h-6 w-6 text-primary" />,
    },
    {
      title: "指标闭环与协作落地",
      description: "构建AI运营指标体系，实现从监控到决策的闭环，推动跨团队协作与业务落地",
      icon: <LineChart className="h-6 w-6 text-primary" />,
    },
  ]

  return (
    <>
      {/* Hero Section with Particle Background */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4">
        <ParticleBackground />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            商业 × AI × 个人展示
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-muted-foreground">
            展示专业可信度，承接求职/合作
          </p>
          <p className="text-sm sm:text-base uppercase tracking-widest mb-10 text-muted-foreground">
            No Game, No Life
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
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-8 w-8 rotate-90 text-muted-foreground" />
        </div>
      </section>

      {/* Highlights Section */}
      <Section title="核心能力" subtitle="专注于商业策略与人工智能的交叉领域，提供端到端解决方案">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlightItems.map((item, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2">{item.icon}</div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section title="代表项目" subtitle="从需求分析到落地实施，提供全流程解决方案" className="bg-muted/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="border hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2">
                  {project.icon === "headset" && <Users className="h-6 w-6 text-primary" />}
                  {project.icon === "workflow" && <Database className="h-6 w-6 text-primary" />}
                  {project.icon === "search" && <Code className="h-6 w-6 text-primary" />}
                </div>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      {/* Latest Articles Section */}
      <Section title="最新文章" subtitle="分享AI领域的实践经验与方法论">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Card key={post.id} className="border hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription>{formatDate(post.date)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="gap-1">
                  <Link href={`/writing/${post.id}`}>
                    阅读更多 <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/writing">查看全部文章</Link>
          </Button>
        </div>
      </Section>

      {/* Trust Section */}
      <Section className="bg-muted/50">
        <div className="text-center max-w-3xl mx-auto">
          <Lightbulb className="h-12 w-12 text-primary mx-auto mb-6" />
          <blockquote className="text-xl sm:text-2xl font-medium mb-6">
            "专业的技术能力与深刻的商业洞察力，使其成为AI领域不可多得的复合型人才。"
          </blockquote>
          <p className="text-muted-foreground">— 某知名企业 AI产品负责人</p>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">准备好开始合作了吗？</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            无论是项目咨询、技术合作还是职业机会，都欢迎随时联系。
          </p>
          <Button asChild size="lg">
            <Link href="/contact">联系我</Link>
          </Button>
        </div>
      </Section>
    </>
  )
} 