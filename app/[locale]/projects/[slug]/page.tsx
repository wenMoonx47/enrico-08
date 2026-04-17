import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react';
import { projects } from '@/lib/data/projects';
import { GlassCard } from '@/components/primitives/GlassCard';
import { Badge } from '@/components/primitives/Badge';
import { GradientText } from '@/components/primitives/GradientText';
import { AuroraBeam } from '@/components/effects/AuroraBeam';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.company} — ${project.slug} | Enrico Perania`,
    description: project.outcome[locale as 'es' | 'en'].split('.')[0],
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale as 'es' | 'en';
  const project = projects.find(p => p.slug === slug);

  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: 'projects' });
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 relative">
      <AuroraBeam color={project.color} className="fixed inset-0 -z-10" intensity={0.2} />

      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href={`/${locale}#work`}
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          {t('back')}
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div
            className="inline-block px-3 py-1 rounded-lg text-sm font-medium mb-4"
            style={{ background: `${project.color}20`, color: project.accentColor }}
          >
            {project.company}
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--text-primary)] leading-tight mb-4">
            <GradientText gradient="primary">
              {project.title[lang]}
            </GradientText>
          </h1>
          <p className="text-[var(--text-muted)] text-lg">{project.role[lang]} · {project.dates}</p>
        </div>

        {/* Metrics overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {project.metrics.map((metric, i) => (
            <GlassCard key={i} padding="sm" className="text-center">
              <p
                className="font-display text-2xl md:text-3xl font-bold"
                style={{ color: project.accentColor }}
              >
                {metric.value}{metric.unit}
              </p>
              <p className="text-xs text-[var(--text-dim)] mt-0.5">{metric.label[lang]}</p>
            </GlassCard>
          ))}
        </div>

        {/* Problem / Approach / Outcome */}
        <div className="space-y-8 mb-12">
          {[
            { key: 'problem', content: project.problem[lang] },
            { key: 'approach', content: project.approach[lang] },
            { key: 'outcome', content: project.outcome[lang] },
          ].map(({ key, content }) => (
            <GlassCard key={key}>
              <h2
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {t(key as 'problem' | 'approach' | 'outcome')}
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">{content}</p>
            </GlassCard>
          ))}
        </div>

        {/* Architecture */}
        <GlassCard className="mb-8">
          <h2 className="font-display text-xl text-[var(--text-primary)] mb-3">{t('architecture')}</h2>
          <p className="text-[var(--text-muted)] leading-relaxed font-mono text-sm">
            {project.architecture[lang]}
          </p>
        </GlassCard>

        {/* Key Decisions */}
        <div className="mb-8">
          <h2 className="font-display text-2xl text-[var(--text-primary)] mb-6">{t('decisions')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.keyDecisions.map((decision, i) => (
              <GlassCard key={i}>
                <h3 className="font-medium mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{decision.title[lang]}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{decision.description[lang]}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h2 className="font-display text-2xl text-[var(--text-primary)] mb-4">{t('stack')}</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <Badge key={tech} variant="gradient">{tech}</Badge>
            ))}
          </div>
        </div>

        {/* Lessons */}
        <div className="mb-12">
          <h2 className="font-display text-2xl text-[var(--text-primary)] mb-6">{t('lessons')}</h2>
          <div className="space-y-3">
            {project.lessons.map((lesson, i) => (
              <GlassCard key={i} padding="sm" className="flex gap-3">
                <span
                  className="text-lg flex-shrink-0"
                  style={{ color: project.accentColor }}
                >
                  {i + 1}.
                </span>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {lesson[lang]}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-[var(--border-soft)]">
          {prevProject ? (
            <Link
              href={`/${locale}/projects/${prevProject.slug}`}
              className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft size={16} />
              <div>
                <p className="text-xs text-[var(--text-dim)]">{t('prev')}</p>
                <p className="font-medium">{prevProject.company}</p>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              href={`/${locale}/projects/${nextProject.slug}`}
              className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <div className="text-right">
                <p className="text-xs text-[var(--text-dim)]">{t('next')}</p>
                <p className="font-medium">{nextProject.company}</p>
              </div>
              <ArrowRight size={16} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
