'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ExpertiseBentoProps {
  locale: string;
}

export function ExpertiseBento({ locale }: ExpertiseBentoProps) {
  const t = useTranslations('expertise');
  const es = locale === 'es';

  const cells = [
    {
      id: 'llm',
      icon: '✦',
      title: t('llm'),
      detail: es
        ? 'Integración de GPT-4o y Claude en productos reales. Streaming SSE/WebSocket, guardrails y 1M+ req/mes.'
        : 'GPT-4o and Claude integration in real products. SSE/WebSocket streaming, guardrails, 1M+ req/month.',
      tags: ['OpenAI', 'Anthropic', 'SSE'],
      color: '#7C3AED',
      className: 'md:col-span-2',
    },
    {
      id: 'rag',
      icon: '◈',
      title: t('rag'),
      detail: es
        ? 'pgvector + BM25 híbrido sobre 50K+ documentos. Chunking semántico y re-ranking.'
        : 'pgvector + BM25 hybrid over 50K+ documents. Semantic chunking and re-ranking.',
      tags: ['pgvector', 'Pinecone', 'BM25'],
      color: '#D946EF',
      className: 'md:col-span-1',
    },
    {
      id: 'distributed',
      icon: '⬡',
      title: t('distributed'),
      detail: es
        ? 'Microservicios Go con event sourcing y gRPC. 99.9% uptime en producción.'
        : 'Go microservices with event sourcing and gRPC. 99.9% uptime in production.',
      tags: ['Go', 'Kubernetes', 'gRPC'],
      color: '#F59E0B',
      className: 'md:col-span-1',
    },
    {
      id: 'prompt',
      icon: '◎',
      title: t('prompt'),
      detail: es
        ? 'Reducción de costos 30% con compresión de tokens, caching semántico y evaluación automática.'
        : '30% cost reduction via token compression, semantic caching and automated evaluation.',
      tags: ['Token Opt.', 'Evals', 'CoT'],
      color: '#A78BFA',
      className: 'md:col-span-1',
    },
    {
      id: 'fullstack',
      icon: '◫',
      title: t('fullstack'),
      detail: es
        ? 'React, Next.js, Node.js, Go y Python. TypeScript estricto, 9 años de experiencia.'
        : 'React, Next.js, Node.js, Go and Python. Strict TypeScript, 9 years experience.',
      tags: ['React', 'Go', 'TypeScript'],
      color: '#F472B6',
      className: 'md:col-span-1',
    },
    {
      id: 'leadership',
      icon: '◉',
      title: t('leadership'),
      detail: es
        ? 'Liderazgo de equipo AI de 4 ingenieros. Diseño de arquitectura, code reviews y mentoring.'
        : 'Led a 4-engineer AI team. Architecture design, code reviews and mentoring.',
      tags: ['Team Lead', 'Architecture', 'Agile'],
      color: '#FBBF24',
      className: 'md:col-span-2',
    },
  ];

  return (
    <section id="expertise" className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        label={locale === 'es' ? '02 / Especialidades' : '02 / Specialties'}
        heading={t('title')}
        className="mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cells.map((cell, i) => (
          <ScrollReveal key={cell.id} direction="up" delay={i * 0.07} className={cell.className}>
            <motion.div
              className="rounded-2xl p-6 group cursor-default flex flex-col gap-4 relative min-h-[180px]"
              style={{
                background: 'rgba(255,255,255,0.055)',
                border: `1px solid ${cell.color}30`,
                backdropFilter: 'blur(12px)',
              }}
              whileHover={{
                background: 'rgba(255,255,255,0.08)',
                borderColor: `${cell.color}55`,
                scale: 1.015,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Colour tint */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 10% 10%, ${cell.color}10 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10 flex flex-col gap-3 flex-1">
                {/* Title */}
                <div className="flex items-center gap-2">
                  <span className="text-lg" style={{ color: cell.color }}>{cell.icon}</span>
                  <h3 className="font-display text-lg text-[var(--text-primary)] leading-tight">
                    {cell.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: '#DDD6FE' }}>
                  {cell.detail}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {cell.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-0.5 rounded-md font-medium whitespace-nowrap"
                      style={{
                        background: `${cell.color}22`,
                        color: cell.color,
                        border: `1px solid ${cell.color}40`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
