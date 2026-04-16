'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown, Sparkles } from 'lucide-react';
import { MeshGradient } from '@/components/effects/MeshGradient';
import { FloatingOrbs } from '@/components/effects/FloatingOrbs';
import { MagneticButton } from '@/components/primitives/MagneticButton';
import { GradientText } from '@/components/primitives/GradientText';
import { GlassCard } from '@/components/primitives/GlassCard';
import { TypewriterText } from '@/components/animations/TypewriterText';
import { Badge } from '@/components/primitives/Badge';

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
  const [isTypingAnswer, setIsTypingAnswer] = useState(false);
  const [answerKey, setAnswerKey] = useState(0);

  useEffect(() => {
    const cycle = () => {
      setIsTypingAnswer(false);
      setTimeout(() => {
        setCurrentQA(prev => (prev + 1) % chatQA.length);
        setAnswerKey(k => k + 1);
        setIsTypingAnswer(true);
      }, 500);
    };

    const questionTime = chatQA[currentQA][lang].q.length * 40 + chatQA[currentQA][lang].a.length * 35 + 2000;
    const timer = setTimeout(cycle, questionTime);
    return () => clearTimeout(timer);
  }, [currentQA, lang]);

  const qa = chatQA[currentQA][lang];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <MeshGradient />
      <FloatingOrbs />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side: text content */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge variant="gradient" pulse className="mb-4">
                <Sparkles size={12} />
                {t('title')}
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--text-primary)] leading-[1.05]">
                <GradientText gradient="primary" className="block">
                  {t('headline').split(' ').slice(0, 3).join(' ')}
                </GradientText>
                <span className="block mt-1">
                  {t('headline').split(' ').slice(3).join(' ')}
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-lg text-[var(--text-muted)] max-w-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('subheadline')}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MagneticButton
                variant="gradient"
                size="lg"
                href="#work"
              >
                {t('cta_primary')}
              </MagneticButton>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex gap-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[
                { value: '9+', label: locale === 'es' ? 'Años' : 'Years' },
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

          {/* Right side: chat demo */}
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
                  <p className="text-sm font-medium text-[var(--text-primary)]">Enrico Perania</p>
                  <p className="text-xs text-[var(--text-muted)]">LLM Engineer</p>
                </div>
                <Badge variant="success" size="sm" pulse className="ml-auto">
                  {locale === 'es' ? 'En línea' : 'Online'}
                </Badge>
              </div>

              {/* Chat messages */}
              <div className="flex flex-col gap-4 pt-4 pb-4 min-h-[200px]">
                {/* User message */}
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

                {/* AI response */}
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
        transition={{ duration: 0.6, delay: 1.2 }}
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
