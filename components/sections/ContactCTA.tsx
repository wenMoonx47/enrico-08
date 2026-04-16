'use client';

import { useTranslations } from 'next-intl';
import { AuroraBeam } from '@/components/effects/AuroraBeam';
import { MagneticButton } from '@/components/primitives/MagneticButton';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { profile } from '@/lib/data/profile';

interface ContactCTAProps {
  locale: string;
}

export function ContactCTA({ locale }: ContactCTAProps) {
  const t = useTranslations('contact');

  return (
    <section
      id="contact-cta"
      className="relative py-32 md:py-48 overflow-hidden text-center"
    >
      {/* Aurora background */}
      <AuroraBeam
        color="#7C3AED"
        className="inset-0"
        intensity={0.4}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollReveal direction="up" delay={0}>
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--text-muted)] mb-6">
            {locale === 'es' ? 'Próximo paso' : 'Next step'}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <h2
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-8"
            style={{ color: '#F5F3FF', WebkitTextFillColor: '#F5F3FF', background: 'none' }}
          >
            {t('title')}
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-12">
            {t('subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              variant="gradient"
              size="lg"
              href={`/${locale}/contact`}
            >
              {t('send')}
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4}>
          <p className="mt-8 text-[var(--text-dim)] text-sm">
            {profile.email}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
