import React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react"

import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="text-xl font-bold">
              Linyi Yan
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              商业 × AI × 个人展示
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="mailto:contact@example.com"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/example"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://zhihu.com/people/example"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="知乎"
            >
              <MessageSquare className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Linyi Yan. All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-foreground"
            >
              京ICP备XXXXXXXX号
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
} 