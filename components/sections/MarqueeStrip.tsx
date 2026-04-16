'use client';

import { MarqueeScroll } from '@/components/animations/MarqueeScroll';

const technologies = [
  'OpenAI', 'Anthropic', 'LangChain', 'Go', 'TypeScript',
  'React', 'PostgreSQL', 'Pinecone', 'pgvector', 'Kubernetes',
  'Redis', 'Python', 'Node.js', 'AWS', 'Docker',
  'GraphQL', 'gRPC', 'Vercel', 'Stripe', 'Terraform',
];

export function MarqueeStrip() {
  const items = technologies.map((tech) => (
    <div
      key={tech}
      className="flex items-center gap-2 px-4 py-2 rounded-full glass border-[var(--border-soft)]"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50" />
      <span className="text-sm text-[var(--text-dim)] whitespace-nowrap font-medium">
        {tech}
      </span>
    </div>
  ));

  return (
    <div className="py-12 border-y border-[var(--border-soft)]">
      <MarqueeScroll items={items} speed={40} pauseOnHover gap={12} />
    </div>
  );
}
