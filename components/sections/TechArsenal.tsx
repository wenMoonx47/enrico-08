'use client';

import { useState } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { GlassCard } from '@/components/primitives/GlassCard';
import { Tooltip } from '@/components/primitives/Tooltip';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { techStack } from '@/lib/data/tech-stack';

interface TechArsenalProps {
  locale: string;
}

export function TechArsenal({ locale }: TechArsenalProps) {
  const t = useTranslations('tech');
  const [activeTab, setActiveTab] = useState('frontend');

  const tabLabels: Record<string, string> = {
    frontend: t('frontend'),
    backend: t('backend'),
    cloud: t('cloud'),
    ai_ml: t('ai_ml'),
    devops: t('devops'),
    testing: t('testing'),
  };

  const yearsLabel = locale === 'es' ? 'años de experiencia' : 'years of experience';

  return (
    <section id="tech" className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        label={locale === 'es' ? 'Tecnologías' : 'Technologies'}
        heading={t('title')}
        className="mb-12"
      />

      <RadixTabs.Root
        defaultValue="frontend"
        onValueChange={setActiveTab}
        className="flex flex-col gap-8"
      >
        {/* Tab list */}
        <RadixTabs.List className="flex flex-wrap gap-2 p-1 rounded-2xl glass w-fit">
          {Object.entries(tabLabels).map(([value, label]) => (
            <RadixTabs.Trigger
              key={value}
              value={value}
              className={`
                relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                text-[var(--text-dim)] hover:text-[var(--text-muted)]
                data-[state=active]:text-[var(--text-primary)]
                focus:outline-none
              `}
            >
              {activeTab === value && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/30 to-fuchsia-600/20 border border-violet-500/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </RadixTabs.Trigger>
          ))}
        </RadixTabs.List>

        {/* Tab content */}
        {techStack.map((category) => (
          <RadixTabs.Content key={category.id} value={category.id} className="focus:outline-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
              >
                {category.items.map((tech, i) => (
                  <ScrollReveal key={tech.name} direction="up" delay={i * 0.05}>
                    <Tooltip
                      content={`${tech.yearsExperience} ${yearsLabel}`}
                      side="top"
                    >
                      <motion.div
                        className="cursor-default"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                      >
                        <GlassCard
                          padding="sm"
                          className="flex flex-col items-center gap-2 text-center"
                        >
                          {/* Experience bar */}
                          <div className="w-full h-1 rounded-full bg-[var(--border-soft)] overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: 'linear-gradient(to right, #7C3AED, #D946EF)',
                              }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${Math.min(100, (tech.yearsExperience / 10) * 100)}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                            />
                          </div>
                          <p className="text-sm font-medium text-[var(--text-muted)]">{tech.name}</p>
                          <p className="text-[10px] text-[var(--text-dim)]">
                            {tech.yearsExperience}y
                          </p>
                        </GlassCard>
                      </motion.div>
                    </Tooltip>
                  </ScrollReveal>
                ))}
              </motion.div>
            </AnimatePresence>
          </RadixTabs.Content>
        ))}
      </RadixTabs.Root>
    </section>
  );
}
