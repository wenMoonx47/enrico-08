'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  locale: string;
}

interface NavItem {
  href: string;
  label: string;
  anchor?: string; // section id to scroll to, no #
}

// Smooth-scroll to a section id, works with or without Lenis
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLocale = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  const navItems: NavItem[] = [
    { href: `/${locale}#about`, label: locale === 'es' ? 'Sobre mí' : 'About', anchor: 'about' },
    { href: `/${locale}#expertise`, label: locale === 'es' ? 'Habilidades' : 'Skills', anchor: 'expertise' },
    { href: `/${locale}#work`, label: locale === 'es' ? 'Proyectos' : 'Projects', anchor: 'work' },
    { href: `/${locale}#journey`, label: locale === 'es' ? 'Experiencia' : 'Experience', anchor: 'journey' },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (!item.anchor) return; // let Next.js Link handle full-page navigations
    e.preventDefault();
    // If we're already on the home page, just scroll
    const homePath = `/${locale}`;
    if (pathname === homePath || pathname === `${homePath}/`) {
      scrollToSection(item.anchor);
    } else {
      // Navigate to home first, then scroll after page loads
      router.push(`${homePath}#${item.anchor}`);
    }
  };

  const linkClass = 'px-3 py-1.5 rounded-xl text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all';

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 md:px-6 transition-all duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`flex items-center gap-1 md:gap-2 glass rounded-2xl transition-all duration-300 ${scrolled ? 'px-4 py-2.5 shadow-2xl' : 'px-5 py-3'}`}
          style={{
            backdropFilter: 'blur(20px)',
            borderColor: scrolled ? 'rgba(167, 139, 250, 0.2)' : 'rgba(167, 139, 250, 0.12)',
          }}
        >
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-display text-[var(--text-primary)] text-lg mr-4 hover:text-[var(--accent-primary)] transition-colors"
          >
            EP
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={linkClass}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-[var(--border-soft)] mx-2" />

          {/* Locale Toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all"
          >
            <span>{locale === 'es' ? '🇪🇸' : '🇬🇧'}</span>
            <span className="hidden sm:inline">{locale === 'es' ? 'ES' : 'EN'}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(11, 1, 24, 0.95)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex justify-between items-center p-6">
              <span className="font-display text-xl text-[var(--text-primary)]">EP</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-2 px-6 pt-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={item.href}
                    className="block py-3 text-2xl font-display text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                    onClick={(e) => {
                      handleNavClick(e, item);
                      setMobileOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto px-6 pb-8">
              <button
                onClick={() => { toggleLocale(); setMobileOpen(false); }}
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span className="text-xl">{locale === 'es' ? '🇬🇧' : '🇪🇸'}</span>
                <span>{locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
