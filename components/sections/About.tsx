'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Badge } from '@/components/primitives/Badge';
import { GlassCard } from '@/components/primitives/GlassCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { profile } from '@/lib/data/profile';

interface AboutProps {
  locale: string;
}

export function About({ locale }: AboutProps) {
  const t = useTranslations('about');
  const lang = locale as 'es' | 'en';

  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        {/* Left: Text (3/5) */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <SectionHeading
            label={locale === 'es' ? '01 / Sobre mí' : '01 / About me'}
            heading={t('title')}
          />

          {/* Pull quote */}
          <ScrollReveal direction="up" delay={0.1}>
            <blockquote className="border-l-2 border-violet-500 pl-6">
              <p className="font-display text-2xl md:text-3xl text-[var(--text-primary)] italic leading-snug">
                "{t('pullquote')}"
              </p>
            </blockquote>
          </ScrollReveal>

          {/* Bio paragraphs */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col gap-4">
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                {t('bio_1')}
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                {t('bio_2')}
              </p>
            </div>
          </ScrollReveal>

          {/* Languages */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium tracking-wider uppercase text-[var(--text-dim)]">
                {t('languages')}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang_item) => (
                  <Badge key={lang_item.name[lang]} variant="gradient">
                    {lang_item.name[lang]} · {lang_item.level[lang]}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Location + available */}
          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                <MapPin size={14} className="text-violet-400" />
                <span>{profile.location[lang]}</span>
              </div>
              <Badge variant="success" pulse>
                {t('available')}
              </Badge>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Visual (2/5) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Profile card */}
          <ScrollReveal direction="left" delay={0.2}>
            <div
              className="w-full rounded-2xl p-6 flex flex-col gap-5"
              style={{
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
              }}
            >
              {/* Name / role */}
              <div>
                <p className="font-display text-2xl text-[var(--text-primary)]">{profile.name}</p>
                <p className="text-sm text-violet-300 mt-1">{locale === 'es' ? 'Ingeniero LLM & IA Senior' : 'Senior LLM & AI Engineer'}</p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <MapPin size={14} className="text-violet-400 flex-shrink-0" />
                <span>Lima, Perú 🇵🇪</span>
              </div>

              {/* Education */}
              <div className="flex items-start gap-3 pt-2 border-t border-[rgba(167,139,250,0.12)]">
                <span className="text-lg mt-0.5">🎓</span>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {profile.education.institution.split(',')[0]}
                  </p>
                  <p className="text-xs text-[var(--text-dim)] mt-0.5">Computer Science · {profile.education.year}</p>
                </div>
              </div>

              {/* Available badge */}
              <div className="pt-1">
                <Badge variant="success" pulse>
                  {t('available')}
                </Badge>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal direction="up" delay={0.4}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '9+', label: locale === 'es' ? 'Años exp.' : 'Years exp.' },
                { value: '4', label: locale === 'es' ? 'Empresas' : 'Companies' },
                { value: '3', label: locale === 'es' ? 'Idiomas' : 'Languages' },
                { value: '1M+', label: locale === 'es' ? 'Req/mes' : 'Req/month' },
              ].map((stat) => (
                <GlassCard key={stat.label} padding="sm" className="flex flex-col gap-0.5">
                  <span className="font-display text-2xl text-[var(--accent-primary)]">{stat.value}</span>
                  <span className="text-xs text-[var(--text-dim)]">{stat.label}</span>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
