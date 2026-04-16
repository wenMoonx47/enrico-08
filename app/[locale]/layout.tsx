import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Toaster } from 'sonner';
import { CustomCursor } from '@/components/effects/CustomCursor';
import { LenisProvider } from '@/components/LenisProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://enricoperania.dev'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${instrumentSerif.variable}`}
      style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen" style={{ background: '#0B0118' }}>
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <CustomCursor />
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </LenisProvider>
        </NextIntlClientProvider>
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(11, 1, 24, 0.9)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
              color: '#F5F3FF',
            },
          }}
        />
      </body>
    </html>
  );
}
