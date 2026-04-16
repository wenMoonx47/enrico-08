export interface Profile {
  name: string;
  title: { es: string; en: string };
  tagline: { es: string; en: string };
  email: string;
  phone: string;
  whatsapp: string;
  location: { es: string; en: string };
  linkedin: string;
  github: string;
  twitter: string;
  languages: Array<{ name: { es: string; en: string }; level: { es: string; en: string } }>;
  education: { degree: { es: string; en: string }; institution: string; year: number };
  available: boolean;
}

export const profile: Profile = {
  name: 'Enrico Perania',
  title: {
    es: 'Ingeniero de Software Senior · LLM & AI Product Integration',
    en: 'Senior Software Engineer · LLM & AI Product Integration',
  },
  tagline: {
    es: 'Construyo la interfaz entre humanos y modelos de IA',
    en: 'I build the interface between humans and AI models',
  },
  email: 'enricoperania@gmail.com',
  phone: '+1 928-268-8561',
  whatsapp: 'https://wa.me/19282688561',
  location: {
    es: 'Lima, Perú · Disponible para remoto global',
    en: 'Lima, Peru · Available for global remote',
  },
  linkedin: 'https://www.linkedin.com/in/enrico-perania-3689ba403/',
  github: 'https://github.com/ethhandy',
  twitter: 'https://twitter.com/ThepaulCreative',
  languages: [
    { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
    { name: { es: 'Inglés', en: 'English' }, level: { es: 'Fluido', en: 'Fluent' } },
    { name: { es: 'Japonés', en: 'Japanese' }, level: { es: 'Fluido', en: 'Fluent' } },
  ],
  education: {
    degree: {
      es: 'Licenciatura en Ciencias de la Computación',
      en: 'Bachelor of Science in Computer Science',
    },
    institution: 'Universidad Nacional de Ingeniería, Perú',
    year: 2016,
  },
  available: true,
};
