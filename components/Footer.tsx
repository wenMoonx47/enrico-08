'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ExternalLink, Mail } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { profile } from '@/lib/data/profile';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <footer className="relative border-t border-[var(--border-soft)] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-display text-lg text-[var(--text-primary)]">EP</p>
          <p className="text-sm text-[var(--text-dim)]">
            {t('built')} 🇵🇪
          </p>
          <p className="text-sm text-[var(--text-dim)]">{t('copyright')}</p>
        </div>

        {/* Center: social links */}
        <div className="flex items-center gap-4">
          <Link
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-[var(--text-dim)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface-hover)] transition-all text-xs font-medium"
            aria-label="LinkedIn"
          >
            in
          </Link>
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-[var(--text-dim)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface-hover)] transition-all"
            aria-label="GitHub"
          >
            <ExternalLink size={18} />
          </Link>
          <Link
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-[var(--text-dim)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface-hover)] transition-all text-xs font-medium"
            aria-label="Twitter/X"
          >
            𝕏
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            className="p-2 rounded-xl text-[var(--text-dim)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface-hover)] transition-all"
            aria-label="Email"
          >
            <Mail size={18} />
          </Link>
        </div>

        {/* Right: locale toggle */}
        <button
          onClick={toggleLocale}
          className="flex items-center gap-2 text-sm text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors"
        >
          <span>{locale === 'es' ? '🇬🇧' : '🇪🇸'}</span>
          <span>{locale === 'es' ? 'EN' : 'ES'}</span>
        </button>
      </div>
    </footer>
  );
}
