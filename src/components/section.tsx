import React from "react"

import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  className?: string
  children: React.ReactNode
  fullHeight?: boolean
}

export function Section({
  id,
  title,
  subtitle,
  className,
  children,
  fullHeight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-16",
        fullHeight && "min-h-screen flex flex-col justify-center",
        className
      )}
    >
      <div className="container">
        {(title || subtitle) && (
          <div className="mb-10 md:mb-16 text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
} 