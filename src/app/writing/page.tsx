import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Section } from "@/components/section"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import posts from "@/content/posts.json"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "文章 | Linyi Yan - 商业 × AI × 个人展示",
  description: "分享AI领域的实践经验与方法论，包括RAG应用、Prompt工程、评测方法论、运营看板等",
}

export default function WritingPage() {
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Get all unique tags
  const allTags = Array.from(
    new Set(sortedPosts.flatMap((post) => post.tags))
  ).sort()

  return (
    <>
      <Section
        title="文章"
        subtitle="分享AI领域的实践经验与方法论"
        className="pt-32"
      >
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={`/writing?tag=${tag}`}
              className="no-underline"
            >
              <Badge variant="secondary" className="text-sm cursor-pointer hover:bg-secondary/80">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => (
            <Card key={post.id} className="border hover:border-primary transition-all hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription>{formatDate(post.date)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
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
      </Section>
    </>
  )
} 