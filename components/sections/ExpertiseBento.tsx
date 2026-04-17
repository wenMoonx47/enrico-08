'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ExpertiseBentoProps {
  locale: string;
}

const skillCategories = [
  {
    id: 'ai',
    label: { es: 'IA / LLM', en: 'AI / LLM' },
    skills: ['OpenAI GPT-4o', 'Anthropic Claude', 'RAG', 'Embeddings', 'Prompt Engineering', 'Semantic Caching', 'Guardrails', 'LangChain'],
  },
  {
    id: 'backend',
    label: { es: 'Backend', en: 'Backend' },
    skills: ['Go', 'Python', 'Node.js', 'Ruby on Rails', 'gRPC', 'REST', 'GraphQL', 'SSE / WebSocket'],
  },
  {
    id: 'frontend',
    label: { es: 'Frontend', en: 'Frontend' },
    skills: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS'],
  },
  {
    id: 'cloud',
    label: { es: 'Cloud / DevOps', en: 'Cloud / DevOps' },
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Microservices'],
  },
  {
    id: 'data',
    label: { es: 'Datos / Búsqueda', en: 'Data / Search' },
    skills: ['PostgreSQL', 'pgvector', 'Redis', 'MongoDB', 'Pinecone', 'Elasticsearch', 'BM25'],
  },
];

export function ExpertiseBento({ locale }: ExpertiseBentoProps) {
  const lang = locale as 'es' | 'en';

  return (
    <section id="expertise" className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        label={locale === 'es' ? 'Habilidades' : 'Skills'}
        heading={locale === 'es' ? 'Stack técnico' : 'Technical Stack'}
        className="mb-12"
      />

      <div className="flex flex-col gap-6">
        {skillCategories.map((cat, i) => (
          <ScrollReveal key={cat.id} direction="up" delay={i * 0.07}>
            <motion.div
              className="flex flex-col sm:flex-row sm:items-start gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {/* Category label */}
              <div className="sm:w-44 shrink-0 pt-0.5">
                <span className="text-sm font-semibold tracking-wide text-[var(--text-primary)]">
                  {cat.label[lang]}
                </span>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg"
                    style={{
                      background: 'rgba(167,139,250,0.08)',
                      color: 'var(--text-muted)',
                      border: '1px solid rgba(167,139,250,0.18)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Divider */}
            {i < skillCategories.length - 1 && (
              <div className="mt-6 border-t border-[var(--border-soft)]" />
            )}
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
