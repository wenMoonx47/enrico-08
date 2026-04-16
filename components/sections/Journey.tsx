'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { GlassCard } from '@/components/primitives/GlassCard';
import { Badge } from '@/components/primitives/Badge';
import { TiltCard } from '@/components/primitives/TiltCard';
import { GradientLine } from '@/components/animations/GradientLine';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { experience } from '@/lib/data/experience';

interface JourneyProps {
  locale: string;
}

export function Journey({ locale }: JourneyProps) {
  const t = useTranslations('journey');
  const lang = locale as 'es' | 'en';

  const formatDate = (date: string | null) => {
    if (!date) return t('present');
    const [year, month] = date.split('-');
    const months = {
      es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };
    return `${months[lang][parseInt(month) - 1]} ${year}`;
  };

  return (
    <section id="journey" className="py-24 md:py-32 px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        label={locale === 'es' ? '06 / Trayectoria' : '06 / Journey'}
        heading={t('title')}
        className="mb-16"
      />

      <div className="relative">
        {/* Vertical line - desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
          <GradientLine vertical className="h-full" />
        </div>

        {/* Mobile vertical line */}
        <div className="md:hidden absolute left-6 top-0 bottom-0 w-px">
          <GradientLine vertical className="h-full" />
        </div>

        <div className="flex flex-col gap-12">
          {experience.map((job, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div key={job.id} className="relative">
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-3 h-3 rounded-full border-2 border-violet-500"
                    style={{ background: job.color }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  />
                </div>

                {/* Mobile dot */}
                <div className="md:hidden absolute left-[18px] top-6 z-10">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-violet-500"
                    style={{ background: job.color }}
                  />
                </div>

                {/* Card */}
                <div className={`
                  md:w-[45%] pl-12 md:pl-0
                  ${isLeft ? 'md:ml-0 md:pr-8' : 'md:ml-auto md:pl-8'}
                `}>
                  <ScrollReveal direction={isLeft ? 'right' : 'left'} delay={0.1}>
                    <TiltCard maxTilt={4}>
                      <GlassCard className="h-full">
                        {/* Company header with color accent bar */}
                        <div
                          className="-mx-6 -mt-6 mb-5 px-6 pt-5 pb-4 rounded-t-2xl"
                          style={{ background: `linear-gradient(135deg, ${job.color}18 0%, transparent 100%)` }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span
                                  className="text-sm font-bold px-3 py-1 rounded-lg"
                                  style={{ background: `${job.color}25`, color: job.color }}
                                >
                                  {job.company}
                                </span>
                                {!job.endDate && (
                                  <Badge variant="success" size="sm" pulse>
                                    {locale === 'es' ? 'Actual' : 'Current'}
                                  </Badge>
                                )}
                              </div>
                              <h3 className="font-display text-xl text-[var(--text-primary)] leading-snug">
                                {job.role[lang]}
                              </h3>
                              <p className="text-sm text-[var(--text-dim)] mt-1">
                                {job.location[lang]}
                              </p>
                            </div>
                            <div className="text-right text-sm text-[var(--text-dim)] whitespace-nowrap ml-4">
                              <p className="font-medium">{formatDate(job.startDate)}</p>
                              <p style={{ color: job.color }}>{formatDate(job.endDate)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                          {job.description[lang]}
                        </p>

                        {/* Achievements */}
                        <ul className="space-y-3 mb-5">
                          {job.achievements.slice(0, 3).map((achievement, j) => (
                            <li key={j} className="flex gap-3 text-sm text-[var(--text-muted)] leading-relaxed">
                              <span
                                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: job.color }}
                              />
                              {achievement[lang]}
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-soft)]">
                          {job.techTags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-md font-medium"
                              style={{ background: `${job.color}15`, color: job.color }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </GlassCard>
                    </TiltCard>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
