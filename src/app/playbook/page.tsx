import { Section } from "@/components/section"
import { PlaybookCard } from "./playbook-card"

import playbookData from "@/content/playbook.json"

export const metadata = {
  title: "方法论 | Linyi Yan - 商业 × AI × 个人展示",
  description: "AI领域的方法论与最佳实践，包括Prompt工程、RAG应用、评测方法论、运营看板、合规框架与金融应用",
}

export default function PlaybookPage() {
  return (
    <>
      <Section
        title="方法论"
        subtitle="AI领域的方法论与最佳实践，帮助企业高效落地AI应用"
        className="pt-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {playbookData.map((module) => (
            <PlaybookCard key={module.id} module={module} />
          ))}
        </div>
      </Section>
    </>
  )
} 