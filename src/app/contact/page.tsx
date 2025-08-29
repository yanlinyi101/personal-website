import { Section } from "@/components/section"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "联系我 | Linyi Yan - 商业 × AI × 个人展示",
  description: "通过联系表单直接与我取得联系，无论是项目咨询、技术合作还是职业机会，都欢迎随时联系。",
}

export default function ContactPage() {
  return (
    <Section className="pt-32 min-h-[calc(100vh-16rem)]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">联系我</h1>
          <p className="text-xl text-muted-foreground">
            无论是项目咨询、技术合作还是职业机会，都欢迎随时联系。
          </p>
        </div>
        
        <div className="bg-card border rounded-lg p-6 md:p-8 shadow-sm">
          <ContactForm />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            您也可以通过邮箱直接联系我：
            <a 
              href="mailto:contact@example.com" 
              className="text-primary hover:underline ml-1"
            >
              contact@example.com
            </a>
          </p>
        </div>
      </div>
    </Section>
  )
} 