"use client"

import { useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "姓名至少需要2个字符" }),
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  message: z.string().min(20, { message: "消息至少需要20个字符" }),
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = (name: keyof FormData, value: string) => {
    try {
      formSchema.shape[name].parse(value)
      setErrors((prev) => ({ ...prev, [name]: "" }))
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [name]: error.errors[0].message,
        }))
      }
      return false
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name as keyof FormData, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate all fields
    let isValid = true
    Object.entries(formData).forEach(([key, value]) => {
      const fieldValid = validateField(key as keyof FormData, value)
      if (!fieldValid) isValid = false
    })

    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    try {
      // Try to use Formspree if ID is available
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
      
      if (formspreeId) {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          toast({
            title: "提交成功",
            description: "感谢您的留言，我会尽快回复。",
          })
          setFormData({ name: "", email: "", message: "" })
        } else {
          throw new Error("提交失败")
        }
      } else {
        // Fallback to mailto link
        const mailtoUrl = `mailto:contact@example.com?subject=来自${encodeURIComponent(
          formData.name
        )}的留言&body=${encodeURIComponent(
          `姓名: ${formData.name}\n邮箱: ${formData.email}\n\n${formData.message}`
        )}`
        window.location.href = mailtoUrl
        
        toast({
          title: "准备发送邮件",
          description: "即将打开您的邮件客户端",
        })
      }
    } catch (error) {
      toast({
        title: "提交失败",
        description: "请稍后再试或直接发送邮件至contact@example.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          姓名 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.name ? "border-red-500" : ""
          }`}
          placeholder="请输入您的姓名"
          aria-describedby="name-error"
          required
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          邮箱 <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.email ? "border-red-500" : ""
          }`}
          placeholder="请输入您的邮箱"
          aria-describedby="email-error"
          required
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          消息 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.message ? "border-red-500" : ""
          }`}
          placeholder="请输入您的消息（至少20个字符）"
          aria-describedby="message-error"
          required
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "提交中..." : "发送消息"}
      </Button>
    </form>
  )
} 