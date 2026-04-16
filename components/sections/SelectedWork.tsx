'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { GlassCard } from '@/components/primitives/GlassCard';
import { Badge } from '@/components/primitives/Badge';
import { MagneticButton } from '@/components/primitives/MagneticButton';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { projects } from '@/lib/data/projects';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SelectedWorkProps {
  locale: string;
}

function CompanyLogo({ src, name, color }: { src: string; name: string; color: string }) {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
      style={{ background: `${color}20`, border: `1px solid ${color}40` }}
    >
      <Image
        src={src}
        alt={name}
        width={36}
        height={36}
        className="object-contain"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<span style="font-size:14px;font-weight:700;color:${color}">${name.slice(0, 2).toUpperCase()}</span>`;
          }
        }}
      />
    </div>
  );
}

export function SelectedWork({ locale }: SelectedWorkProps) {
  const t = useTranslations('work');
  const lang = locale as 'es' | 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop || !trackRef.current || !containerRef.current) return;

    const slides = trackRef.current.children;
    const totalWidth = (slides.length - 1) * window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });

    tl.to(trackRef.current, {
      x: () => -(slides.length - 1) * window.innerWidth,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <section id="work" className="relative">
      {/* Section label */}
      <div className="px-6 lg:px-8 pt-24 pb-8 max-w-7xl mx-auto">
        <SectionHeading
          label={locale === 'es' ? '03 / Trabajo' : '03 / Work'}
          heading={t('title')}
        />
      </div>

      {/* Desktop: horizontal scroll */}
      <div ref={containerRef} className="hidden lg:block overflow-hidden">
        <div ref={trackRef} className="flex" style={{ width: `${projects.length * 100}vw` }}>
          {projects.map((project) => (
            <div
              key={project.slug}
              className="w-screen h-screen flex items-center px-16"
              style={{
                background: `radial-gradient(ellipse at 65% 50%, ${project.color}12 0%, transparent 55%)`,
              }}
            >
              <div className="grid grid-cols-2 gap-16 w-full max-w-6xl mx-auto">

                {/* Left: project info */}
                <div className="flex flex-col justify-center gap-7">
                  {/* Company logo + name */}
                  <div className="flex items-center gap-3">
                    <CompanyLogo src={project.logo} name={project.company} color={project.color} />
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] text-sm">{project.company}</p>
                      <p className="text-xs text-[var(--text-dim)]">{project.dates}</p>
                    </div>
                  </div>

                  {/* Title + role */}
                  <div>
                    <h3 className="font-display text-4xl lg:text-5xl text-[var(--text-primary)] leading-tight">
                      {project.title[lang]}
                    </h3>
                    <p className="text-[var(--text-dim)] mt-2 text-sm">{project.role[lang]}</p>
                  </div>

                  {/* Problem + outcome */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        {t('problem')}
                      </p>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                        {project.problem[lang]}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        {t('outcome')}
                      </p>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                        {project.outcome[lang].split('.')[0]}.
                      </p>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 5).map(tech => (
                      <Badge key={tech} variant="default" size="sm">{tech}</Badge>
                    ))}
                    {project.techStack.length > 5 && (
                      <Badge variant="default" size="sm">+{project.techStack.length - 5}</Badge>
                    )}
                  </div>

                  <MagneticButton
                    variant="gradient"
                    size="md"
                    href={`/${locale}/projects/${project.slug}`}
                    className="w-fit"
                  >
                    {t('view_case')} <ArrowRight size={16} />
                  </MagneticButton>
                </div>

                {/* Right: screenshot + metrics */}
                <div className="flex flex-col gap-5 justify-center">

                  {/* Screenshot card */}
                  <div
                    className="w-full rounded-2xl overflow-hidden"
                    style={{ border: `1px solid ${project.color}30` }}
                  >
                    {/* Logo bar */}
                    <div
                      className="flex items-center gap-3 px-4 py-3"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}08 100%)`,
                        borderBottom: `1px solid ${project.color}20`,
                      }}
                    >
                      <div
                        className="h-7 flex items-center justify-center overflow-hidden"
                        style={{ minWidth: 28 }}
                      >
                        <Image
                          src={project.logo}
                          alt={project.company}
                          width={80}
                          height={28}
                          className="object-contain max-h-7"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="text-xs text-[var(--text-dim)] ml-auto">{project.dates}</span>
                    </div>

                    {/* Product screenshot */}
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={project.screenshot}
                        alt={`${project.company} product`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1280px) 50vw, 600px"
                      />
                      {/* Subtle gradient overlay at bottom */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(11,1,24,0.7) 0%, transparent 100%)' }}
                      />
                    </div>
                  </div>

                  {/* Metrics row */}
                  <div
                    className="grid gap-px rounded-2xl overflow-hidden"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(project.metrics.length, 4)}, 1fr)`,
                      background: `${project.color}20`,
                    }}
                  >
                    {project.metrics.slice(0, 4).map((metric, mi) => (
                      <div
                        key={mi}
                        className="flex flex-col gap-1 px-4 py-3"
                        style={{ background: 'rgba(11,1,24,0.9)' }}
                      >
                        <span className="font-display text-xl font-bold" style={{ color: project.accentColor }}>
                          {metric.value}{metric.unit}
                        </span>
                        <span className="text-[10px] text-[var(--text-dim)] leading-snug">
                          {metric.label[lang]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* View case study link */}
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="flex items-center gap-1.5 text-sm self-end"
                    style={{ color: project.accentColor }}
                  >
                    {locale === 'es' ? 'Ver caso completo' : 'Full case study'}
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="lg:hidden px-6 py-12 space-y-6">
        {projects.map((project, i) => (
          <ScrollReveal key={project.slug} direction="up" delay={i * 0.1}>
            <GlassCard interactive className="overflow-hidden">
              <div
                className="h-1.5 rounded-t-xl -mx-6 -mt-6 mb-5"
                style={{ background: `linear-gradient(to right, ${project.color}, ${project.accentColor})` }}
              />

              {/* Company logo + info row */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
                  style={{ background: `${project.color}20`, border: `1px solid ${project.color}30` }}
                >
                  <Image
                    src={project.logo}
                    alt={project.company}
                    width={28}
                    height={28}
                    className="object-contain"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider">{project.company}</p>
                  <p className="text-xs text-[var(--text-dim)]">{project.dates}</p>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl text-[var(--text-primary)] mb-1">
                {project.title[lang]}
              </h3>
              <p className="text-sm text-[var(--text-dim)] mb-4">{project.role[lang]}</p>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                {project.outcome[lang].split('.')[0]}.
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {project.metrics.slice(0, 4).map((metric, j) => (
                  <div
                    key={j}
                    className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl"
                    style={{ background: `${project.color}12`, border: `1px solid ${project.color}20` }}
                  >
                    <span className="font-display text-lg font-bold" style={{ color: project.accentColor }}>
                      {metric.value}{metric.unit}
                    </span>
                    <span className="text-[10px] text-[var(--text-dim)]">{metric.label[lang]}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="flex items-center gap-1 text-sm transition-colors"
                style={{ color: project.accentColor }}
              >
                {t('view_case')} <ArrowRight size={14} />
              </Link>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
