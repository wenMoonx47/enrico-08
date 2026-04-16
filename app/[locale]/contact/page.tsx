'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, CheckCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/primitives/GlassCard';
import { MagneticButton } from '@/components/primitives/MagneticButton';
import { Input } from '@/components/primitives/Input';
import { Textarea } from '@/components/primitives/Textarea';
import { GradientText } from '@/components/primitives/GradientText';
import { AuroraBeam } from '@/components/effects/AuroraBeam';
import { profile } from '@/lib/data/profile';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default function ContactPage({ params }: ContactPageProps) {
  // We need to use the locale passed via params - but we're client side
  // so we'll use useTranslations directly
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [locale, setLocale] = useState('es');

  // Get locale from params
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    const localeFromPath = path.split('/')[1];
    if (localeFromPath && (localeFromPath === 'es' || localeFromPath === 'en')) {
      // eslint-disable-next-line
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();

        // Confetti effect
        if (typeof window !== 'undefined') {
          const confetti = (await import('canvas-confetti')).default;
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#A78BFA', '#F472B6', '#FBBF24'],
          });
        }

        toast.success(t('success'));
      } else {
        toast.error(t('error'));
      }
    } catch {
      toast.error(t('error'));
    }
  };

  const socials = [
    { icon: <ExternalLink size={18} />, label: 'LinkedIn', href: profile.linkedin },
    { icon: <ExternalLink size={18} />, href: profile.github, label: 'GitHub' },
    { icon: <ExternalLink size={18} />, href: profile.twitter, label: 'Twitter / X' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 relative">
      <AuroraBeam color="#7C3AED" className="fixed inset-0 -z-10" intensity={0.2} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <motion.p
            className="text-sm font-medium tracking-widest uppercase text-[var(--text-muted)] mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            09 / {locale === 'es' ? 'Contacto' : 'Contact'}
          </motion.p>
          <motion.h1
            className="font-display text-5xl md:text-7xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GradientText gradient="primary">
              {t('title')}
            </GradientText>
          </motion.h1>
          <motion.p
            className="text-xl text-[var(--text-muted)] mt-4 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form (2/3) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {submitted ? (
              <GlassCard className="flex flex-col items-center justify-center gap-6 py-16 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                >
                  <CheckCircle size={64} className="text-emerald-400" />
                </motion.div>
                <div>
                  <h3 className="font-display text-2xl text-[var(--text-primary)]">
                    {t('success')}
                  </h3>
                  <p className="text-[var(--text-muted)] mt-2">
                    {locale === 'es'
                      ? 'Te responderé en menos de 24 horas.'
                      : 'I\'ll get back to you within 24 hours.'
                    }
                  </p>
                </div>
                <MagneticButton variant="outline" onClick={() => setSubmitted(false)}>
                  {locale === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                </MagneticButton>
              </GlassCard>
            ) : (
              <GlassCard>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label={t('name')}
                      placeholder="Enrico Perania"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label={t('email')}
                      type="email"
                      placeholder="enricoperania@gmail.com"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <Input
                    label={t('company')}
                    placeholder="Empresa S.A."
                    {...register('company')}
                  />

                  <Textarea
                    label={t('message')}
                    placeholder={locale === 'es'
                      ? 'Cuéntame sobre tu proyecto de IA...'
                      : 'Tell me about your AI project...'
                    }
                    rows={6}
                    error={errors.message?.message}
                    {...register('message')}
                  />

                  <MagneticButton
                    variant="gradient"
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full justify-center"
                  >
                    {isSubmitting ? t('sending') : t('send')}
                  </MagneticButton>
                </form>
              </GlassCard>
            )}
          </motion.div>

          {/* Right: Contact info (1/3) */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="flex flex-col gap-4">
              <h3 className="font-display text-lg text-[var(--text-primary)]">
                {t('or_email')}
              </h3>

              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors group"
                >
                  <Mail size={16} className="text-violet-400 group-hover:text-violet-300" />
                  {profile.email}
                </a>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors group"
                >
                  <Phone size={16} className="text-violet-400 group-hover:text-violet-300" />
                  {profile.phone}
                </a>
                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <MapPin size={16} className="text-violet-400" />
                  Lima, Peru (UTC-5)
                </div>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col gap-4">
              <h3 className="font-display text-lg text-[var(--text-primary)]">
                {locale === 'es' ? 'Redes sociales' : 'Social networks'}
              </h3>
              <div className="flex flex-col gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
                  >
                    {social.icon}
                    <span className="text-sm">{social.label}</span>
                  </a>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="text-center">
                <div className="text-2xl mb-2">🇵🇪 → 🌍</div>
                <p className="text-sm text-[var(--text-muted)]">
                  {profile.location.en}
                </p>
                <p className="text-xs text-[var(--text-dim)] mt-1">
                  {locale === 'es'
                    ? 'Disponible para roles remotos globales'
                    : 'Available for global remote roles'
                  }
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
