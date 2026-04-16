'use client';

import { GlassCard } from '@/components/primitives/GlassCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface TestimonialsProps {
  locale: string;
}

// TODO: replace with real testimonials when available
const placeholderTestimonials = [
  {
    quote: 'Enrico delivered exceptional RAG pipeline architecture that reduced our support costs significantly.',
    name: '— CTO, Kueski',
    role: 'Technical Leadership',
  },
  {
    quote: 'His deep understanding of LLM optimization and production systems made a real difference for our platform.',
    name: '— Engineering Manager, Retool',
    role: 'Platform Engineering',
  },
  {
    quote: 'Enrico led our microservices migration with outstanding technical leadership and clear communication.',
    name: '— VP Engineering, Factorial HR',
    role: 'Architecture',
  },
];

export function Testimonials({ locale }: TestimonialsProps) {
  // Only render if explicitly enabled
  if (process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS !== 'true') {
    return null;
  }

  return (
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="font-display text-4xl text-[var(--text-primary)] mb-12">
        {locale === 'es' ? 'Testimonios' : 'Testimonials'}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {placeholderTestimonials.map((testimonial, i) => (
          <ScrollReveal key={i} direction="up" delay={i * 0.1}>
            <GlassCard className="flex flex-col gap-4">
              <p className="text-[var(--text-muted)] italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{testimonial.name}</p>
                <p className="text-xs text-[var(--text-dim)]">{testimonial.role}</p>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
