import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import posts from "@/content/posts.json"
import { formatDate } from "@/lib/utils"

interface PostPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export function generateMetadata({ params }: PostPageProps) {
  const post = posts.find((post) => post.id === params.slug)
  
  if (!post) {
    return {
      title: "文章不存在 | Linyi Yan",
      description: "找不到请求的文章",
    }
  }
  
  return {
    title: `${post.title} | Linyi Yan`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Linyi Yan"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = posts.find((post) => post.id === params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <Section className="pt-32 max-w-4xl mx-auto">
      <Button asChild variant="ghost" className="mb-8 pl-0 gap-1">
        <Link href="/writing">
          <ArrowLeft className="h-4 w-4 mr-1" /> 返回文章列表
        </Link>
      </Button>
      
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 mb-8">
          <time dateTime={post.date} className="text-muted-foreground">
            {formatDate(post.date)}
          </time>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-8" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
      </article>
    </Section>
  )
}

// Simple Markdown to HTML converter (placeholder)
function markdownToHtml(markdown: string): string {
  // This is a very basic implementation
  // In a real project, you would use a proper markdown parser like remark/rehype
  
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Paragraphs
    .replace(/^\s*$/gm, '</p><p>')
  
  // Wrap in paragraphs
  html = '<p>' + html + '</p>'
  
  // Fix lists
  html = html.replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>')
  html = html.replace(/<\/ul><ul>/g, '')
  
  return html
} 