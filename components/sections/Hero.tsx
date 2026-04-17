'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Download, Mail, ChevronDown } from 'lucide-react';
import { MeshGradient } from '@/components/effects/MeshGradient';
import { FloatingOrbs } from '@/components/effects/FloatingOrbs';
import { MagneticButton } from '@/components/primitives/MagneticButton';
import { GlassCard } from '@/components/primitives/GlassCard';
import { TypewriterText } from '@/components/animations/TypewriterText';
import { Badge } from '@/components/primitives/Badge';
import { profile } from '@/lib/data/profile';

const chatQA = [
  {
    es: { q: '¿Usas RAG en producción?', a: 'Sí — llevo 3 años construyendo pipelines RAG sobre pgvector y Pinecone para 50K+ documentos.' },
    en: { q: 'Do you use RAG in production?', a: 'Yes — I\'ve been building RAG pipelines over pgvector and Pinecone for 50K+ documents for 3 years.' },
  },
  {
    es: { q: '¿Qué LLMs dominas?', a: 'OpenAI GPT-4o, Anthropic Claude Sonnet/Haiku. En producción priorizo según costo/latencia/calidad.' },
    en: { q: 'Which LLMs do you master?', a: 'OpenAI GPT-4o, Anthropic Claude Sonnet/Haiku. In production I prioritize based on cost/latency/quality.' },
  },
  {
    es: { q: '¿Has liderado equipos de IA?', a: 'Sí, en Kueski lideré el equipo de AI Product (4 ingenieros). Arquitectura, código y mentoring.' },
    en: { q: 'Have you led AI teams?', a: 'Yes, at Kueski I led the AI Product team (4 engineers). Architecture, code and mentoring.' },
  },
  {
    es: { q: '¿Disponible para proyectos remotos?', a: 'Disponible para remoto global. Experiencia con equipos en México, España, EE.UU. y Europa.' },
    en: { q: 'Available for remote projects?', a: 'Available for global remote. Experience with teams in Mexico, Spain, US and Europe.' },
  },
];

interface HeroProps {
  locale: string;
}

export function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero');
  const lang = locale as 'es' | 'en';
  const [currentQA, setCurrentQA] = useState(0);
  const [answerKey, setAnswerKey] = useState(0);

  useEffect(() => {
    const qa = chatQA[currentQA][lang];
    const duration = qa.q.length * 40 + qa.a.length * 35 + 2000;
    const timer = setTimeout(() => {
      setCurrentQA(prev => (prev + 1) % chatQA.length);
      setAnswerKey(k => k + 1);
    }, duration);
    return () => clearTimeout(timer);
  }, [currentQA, lang]);

  const qa = chatQA[currentQA][lang];

  const socialLinks = [
    {
      href: profile.linkedin,
      label: 'LinkedIn',
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      href: profile.github,
      label: 'GitHub',
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      ),
    },
    {
      href: profile.twitter,
      label: 'X',
      svg: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <MeshGradient />
      <FloatingOrbs />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: identity + CTAs */}
          <div className="flex flex-col gap-6">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge variant="success" pulse>
                {locale === 'es' ? 'Disponible para nuevos proyectos' : 'Available for new projects'}
              </Badge>
            </motion.div>

            {/* Name — the primary headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-[var(--text-primary)] leading-[1.05]">
                {profile.name}
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-xl md:text-2xl font-medium" style={{ color: '#A78BFA' }}>
                {profile.title[lang]}
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-lg text-[var(--text-muted)] max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {profile.tagline[lang]}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <MagneticButton variant="gradient" size="lg" href={`/${locale}/contact`}>
                <Mail size={16} />
                {locale === 'es' ? 'Contáctame' : 'Contact Me'}
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                href={locale === 'es'
                  ? 'https://docs.google.com/document/d/11BHAVLoNDVMv_pwSUOE0xmW9Hmfoup9gHO1K6A2dl3g/edit?usp=sharing'
                  : 'https://docs.google.com/document/d/1NfOdFG-GGUO6NxKV5NEW73IAPW0SN4IpOVQQpYx8fuo/edit?usp=sharing'
                }
                target="_blank"
              >
                <Download size={16} />
                {locale === 'es' ? 'Descargar CV' : 'Download CV'}
              </MagneticButton>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 pt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {socialLinks.map(({ href, svg, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-1.5 text-sm text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {svg}
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 pt-4 border-t border-[var(--border-soft)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {[
                { value: '9+', label: locale === 'es' ? 'Años exp.' : 'Years exp.' },
                { value: '1M+', label: locale === 'es' ? 'Req/mes' : 'Req/month' },
                { value: '30%', label: locale === 'es' ? 'Reducción costo AI' : 'AI cost reduction' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-display text-2xl text-[var(--accent-primary)]">{stat.value}</span>
                  <span className="text-xs text-[var(--text-dim)]">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: chat demo */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="w-full max-w-md" glow>
              {/* Chat header */}
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--border-soft)]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-sm font-medium text-white">
                  EP
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{profile.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">LLM Engineer</p>
                </div>
                <Badge variant="success" size="sm" pulse className="ml-auto">
                  {locale === 'es' ? 'En línea' : 'Online'}
                </Badge>
              </div>

              {/* Chat messages */}
              <div className="flex flex-col gap-4 pt-4 pb-4 min-h-[200px]">
                <motion.div
                  key={`q-${currentQA}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] bg-violet-600/20 border border-violet-500/20 rounded-2xl rounded-tr-sm px-4 py-2.5">
                    <p className="text-sm text-[var(--text-primary)]">{qa.q}</p>
                  </div>
                </motion.div>

                <motion.div
                  key={`a-${answerKey}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex-shrink-0 flex items-center justify-center text-xs font-medium text-white mt-1">
                    E
                  </div>
                  <div className="max-w-[80%] glass rounded-2xl rounded-tl-sm px-4 py-2.5">
                    <p className="text-sm text-[var(--text-muted)]">
                      <TypewriterText
                        key={answerKey}
                        text={qa.a}
                        speed={30}
                        delay={500}
                        showCursor={true}
                      />
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Input area */}
              <div className="flex gap-2 pt-4 border-t border-[var(--border-soft)]">
                <div className="flex-1 px-3 py-2 rounded-xl bg-[var(--surface-glass)] border border-[var(--border-soft)] text-xs text-[var(--text-dim)]">
                  {locale === 'es' ? 'Pregúntame algo...' : 'Ask me something...'}
                </div>
                <MagneticButton variant="gradient" size="sm" magnetic={false}>
                  {locale === 'es' ? 'Enviar' : 'Send'}
                </MagneticButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <span className="text-xs text-[var(--text-dim)] tracking-widest uppercase">{t('scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-[var(--text-dim)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
