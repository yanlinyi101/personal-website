"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PlaybookModule {
  id: string
  title: string
  summary: string
  points: string[]
  codeExample: string
}

interface PlaybookCardProps {
  module: PlaybookModule
}

export function PlaybookCard({ module }: PlaybookCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Card className="border hover:border-primary transition-all hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-2xl">{module.title}</CardTitle>
        <CardDescription className="text-base mt-2">
          {module.summary}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {module.points.map((point, index) => (
            <li key={index} className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setIsDialogOpen(true)}>查看示例</Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{module.title} - 示例代码</DialogTitle>
              <DialogDescription>
                以下是{module.title}的实践示例代码
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="text-sm">
                <code>{module.codeExample}</code>
              </pre>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                关闭
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
} 