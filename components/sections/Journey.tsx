'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Badge } from '@/components/primitives/Badge';
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
    <section id="journey" className="py-24 md:py-32 px-6 lg:px-8 max-w-5xl mx-auto">
      <SectionHeading
        label={locale === 'es' ? 'Experiencia' : 'Experience'}
        heading={t('title')}
        className="mb-14"
      />

      <div className="flex flex-col gap-0">
        {experience.map((job, i) => (
          <ScrollReveal key={job.id} direction="up" delay={i * 0.08}>
            <div className="relative flex gap-6 pb-12">

              {/* Left: timeline line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    border: '1px solid rgba(167,139,250,0.25)',
                  }}
                >
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      alt={job.company}
                      width={32}
                      height={32}
                      className="object-contain"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = 'none';
                        const parent = el.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span style="font-size:11px;font-weight:700;color:#1a1a2e">${job.company.slice(0, 2).toUpperCase()}</span>`;
                        }
                      }}
                    />
                  ) : (
                    <span className="text-xs font-bold" style={{ color: '#1a1a2e' }}>
                      {job.company.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Vertical connector */}
                {i < experience.length - 1 && (
                  <div
                    className="w-px flex-1 mt-3"
                    style={{ background: 'linear-gradient(to bottom, rgba(167,139,250,0.2), transparent)' }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div className="flex-1 pt-1 pb-2">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-[var(--text-primary)]">{job.company}</span>
                      {!job.endDate && (
                        <Badge variant="success" size="sm" pulse>
                          {locale === 'es' ? 'Actual' : 'Current'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium mt-0.5 text-[var(--text-muted)]">
                      {job.role[lang]}
                    </p>
                  </div>
                  <div className="text-right text-xs text-[var(--text-dim)] whitespace-nowrap">
                    <p>{formatDate(job.startDate)} – {formatDate(job.endDate)}</p>
                    <p className="mt-0.5">{job.location[lang]}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-3 mb-4">
                  {job.description[lang]}
                </p>

                {/* Achievements */}
                <ul className="flex flex-col gap-2 mb-4">
                  {job.achievements.map((item, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-[var(--text-muted)] leading-relaxed">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'rgba(167,139,250,0.6)' }}
                      />
                      {item[lang]}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {job.techTags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md font-medium"
                      style={{ background: 'rgba(167,139,250,0.08)', color: 'var(--text-muted)', border: '1px solid rgba(167,139,250,0.18)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
