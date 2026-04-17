export interface Achievement {
  es: string;
  en: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  logo?: string;
  role: { es: string; en: string };
  startDate: string;
  endDate: string | null;
  location: { es: string; en: string };
  description: { es: string; en: string };
  achievements: Achievement[];
  techTags: string[];
  color: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: 'kueski',
    company: 'Kueski',
    logo: 'https://cdn.prod.website-files.com/642533e2943fc871d1dc670d/642d4d9f4b2a5abd56c16739_Logo.svg',
    role: {
      es: 'Ingeniero de Software Líder',
      en: 'Lead Software Engineer',
    },
    startDate: '2024-08',
    endDate: null,
    location: { es: 'México · Remoto desde Perú', en: 'Mexico · Remote from Peru' },
    description: {
      es: 'Lideré la integración de modelos de lenguaje en productos financieros para 2M+ usuarios en la plataforma de crédito Buy Now Pay Later más grande de México.',
      en: 'Led the integration of language models in financial products for 2M+ users on Mexico\'s largest Buy Now Pay Later credit platform.',
    },
    achievements: [
      {
        es: 'Construí un sistema RAG sobre documentación financiera y regulatoria, reduciendo el tiempo de respuesta del soporte en 45%',
        en: 'Built a RAG system over financial and regulatory documentation, reducing support response time by 45%',
      },
      {
        es: 'Implementé pipelines de procesamiento de lenguaje natural para análisis de riesgo crediticio usando GPT-4 y embeddings de texto',
        en: 'Implemented NLP processing pipelines for credit risk analysis using GPT-4 and text embeddings',
      },
      {
        es: 'Optimicé el uso de tokens reduciendo costos de API en 30% mediante prompt compression y caching semántico',
        en: 'Optimized token usage reducing API costs by 30% through prompt compression and semantic caching',
      },
      {
        es: 'Diseñé y mantuve microservicios en Go procesando 1M+ solicitudes mensuales con 99.9% de uptime',
        en: 'Designed and maintained Go microservices processing 1M+ monthly requests with 99.9% uptime',
      },
    ],
    techTags: ['Go', 'Python', 'OpenAI', 'Pinecone', 'PostgreSQL', 'Redis', 'Kubernetes', 'gRPC'],
    color: '#7C3AED',
  },
  {
    id: 'retool',
    company: 'Retool',
    logo: 'https://retool.com/logo.png',
    role: {
      es: 'Ingeniero Backend Senior',
      en: 'Senior Backend Engineer',
    },
    startDate: '2021-04',
    endDate: '2024-07',
    location: { es: 'EE.UU. · Remoto desde Perú', en: 'US · Remote from Peru' },
    description: {
      es: 'Trabajé en el equipo de plataforma, construyendo integraciones y mejorando el rendimiento del builder de aplicaciones internas utilizado por más de 100,000 empresas.',
      en: 'Worked on the platform team, building integrations and improving performance of the internal app builder used by over 100,000 companies.',
    },
    achievements: [
      {
        es: 'Migré el core del builder de JavaScript a TypeScript, reduciendo bugs en producción en 35%',
        en: 'Migrated the builder core from JavaScript to TypeScript, reducing production bugs by 35%',
      },
      {
        es: 'Diseñé el sistema de integraciones de terceros, aumentando el catálogo de conectores de 40 a 90+',
        en: 'Designed the third-party integrations system, growing the connector catalog from 40 to 90+',
      },
      {
        es: 'Implementé mejoras de rendimiento que redujeron el tiempo de carga inicial en 60%',
        en: 'Implemented performance improvements that reduced initial load time by 60%',
      },
    ],
    techTags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'GraphQL'],
    color: '#D946EF',
  },
  {
    id: 'factorial',
    company: 'Factorial HR',
    logo: 'https://factorialhr.com/images/factorial-one-logo.svg',
    role: {
      es: 'Ingeniero Full Stack Mid-Level',
      en: 'Mid-Level Full Stack Engineer',
    },
    startDate: '2019-01',
    endDate: '2021-03',
    location: { es: 'España · Remoto desde Perú', en: 'Spain · Remote from Peru' },
    description: {
      es: 'Parte del equipo de ingeniería que escaló Factorial de startup a +$1B de valoración, construyendo el módulo de nómina y automatización de RRHH para +3000 empresas en Europa.',
      en: 'Part of the engineering team that scaled Factorial from startup to +$1B valuation, building the payroll module and HR automation for +3000 companies in Europe.',
    },
    achievements: [
      {
        es: 'Lideré la migración del monolito Ruby on Rails a microservicios, mejorando escalabilidad en 10x',
        en: 'Led the migration from Rails monolith to microservices, improving scalability 10x',
      },
      {
        es: 'Construí el módulo de nómina automática para España y Francia, procesando €50M+ en pagos anuales',
        en: 'Built the automatic payroll module for Spain and France, processing €50M+ in annual payments',
      },
      {
        es: 'Implementé integraciones con 15+ proveedores de seguros y beneficios vía APIs REST',
        en: 'Implemented integrations with 15+ insurance and benefits providers via REST APIs',
      },
    ],
    techTags: ['Ruby on Rails', 'React', 'PostgreSQL', 'Sidekiq', 'AWS', 'Docker', 'Stripe'],
    color: '#F59E0B',
  },
  {
    id: 'holded',
    company: 'Holded',
    logo: 'https://logo.clearbit.com/holded.com',
    role: {
      es: 'Ingeniero Frontend Junior',
      en: 'Junior Frontend Engineer',
    },
    startDate: '2016-07',
    endDate: '2018-12',
    location: { es: 'España · Remoto desde Perú', en: 'Spain · Remote from Peru' },
    description: {
      es: 'Ingeniero de software en plataforma de gestión empresarial ERP/CRM para PYMES en España, construyendo módulos de contabilidad, inventario y facturación.',
      en: 'Software engineer on ERP/CRM business management platform for SMEs in Spain, building accounting, inventory and billing modules.',
    },
    achievements: [
      {
        es: 'Construí el módulo de facturación electrónica compatible con la normativa fiscal española, adoptado por 10,000+ empresas',
        en: 'Built the electronic invoicing module compliant with Spanish tax regulations, adopted by 10,000+ companies',
      },
      {
        es: 'Desarrollé dashboard de analytics en tiempo real para visualizar KPIs financieros con Chart.js y WebSockets',
        en: 'Developed real-time analytics dashboard for visualizing financial KPIs with Chart.js and WebSockets',
      },
      {
        es: 'Refactorización de consultas PostgreSQL críticas, mejorando rendimiento en 8x',
        en: 'Refactored critical PostgreSQL queries, improving performance 8x',
      },
    ],
    techTags: ['Node.js', 'Vue.js', 'MongoDB', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    color: '#A78BFA',
  },
];
