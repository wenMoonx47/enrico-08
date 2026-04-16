import { Hero } from '@/components/sections/Hero';
import { MarqueeStrip } from '@/components/sections/MarqueeStrip';
import { About } from '@/components/sections/About';
import { ExpertiseBento } from '@/components/sections/ExpertiseBento';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Journey } from '@/components/sections/Journey';
import { TechArsenal } from '@/components/sections/TechArsenal';
import { Testimonials } from '@/components/sections/Testimonials';
import { ContactCTA } from '@/components/sections/ContactCTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <MarqueeStrip />
      <About locale={locale} />
      <ExpertiseBento locale={locale} />
      <SelectedWork locale={locale} />
      <Journey locale={locale} />
      <TechArsenal locale={locale} />
      <Testimonials locale={locale} />
      <ContactCTA locale={locale} />
    </>
  );
}
