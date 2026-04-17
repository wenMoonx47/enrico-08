export interface Metric {
  label: { es: string; en: string };
  value: string;
  unit?: string;
}

export interface KeyDecision {
  title: { es: string; en: string };
  description: { es: string; en: string };
}

export interface Project {
  slug: string;
  company: string;
  logo: string;
  screenshot: string;
  title: { es: string; en: string };
  role: { es: string; en: string };
  dates: string;
  heroImage: string;
  problem: { es: string; en: string };
  approach: { es: string; en: string };
  outcome: { es: string; en: string };
  architecture: { es: string; en: string };
  keyDecisions: KeyDecision[];
  metrics: Metric[];
  techStack: string[];
  lessons: Array<{ es: string; en: string }>;
  color: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    slug: 'kueski-ai',
    company: 'Kueski',
    logo: 'https://cdn.prod.website-files.com/642533e2943fc871d1dc670d/642d4d9f4b2a5abd56c16739_Logo.svg',
    screenshot: 'https://cdn.prod.website-files.com/642533e2943fc871d1dc670d/64528551d4462a7b3477a59d_Open_graph.jpg',
    title: {
      es: 'Sistema RAG para Soporte Financiero',
      en: 'RAG System for Financial Support',
    },
    role: {
      es: 'Ingeniero de Software Senior · LLM & AI Product',
      en: 'Senior Software Engineer · LLM & AI Product',
    },
    dates: 'Aug 2024 – Present',
    heroImage: '/images/projects/kueski-ai.jpg',
    problem: {
      es: 'Kueski necesitaba reducir el volumen de consultas de soporte al cliente en 40% mientras mantenía la calidad de respuesta para preguntas complejas sobre crédito, pagos y normativa financiera mexicana.',
      en: 'Kueski needed to reduce customer support ticket volume by 40% while maintaining response quality for complex questions about credit, payments, and Mexican financial regulation.',
    },
    approach: {
      es: 'Diseñé un sistema RAG (Retrieval-Augmented Generation) sobre la base de conocimiento interna: ~50,000 documentos de política, FAQ, y regulaciones. Usé pgvector para embeddings en PostgreSQL, un pipeline de ingesta con chunking semántico, y un servicio Go para orquestar las búsquedas y llamadas a GPT-4.',
      en: 'I designed a RAG (Retrieval-Augmented Generation) system over the internal knowledge base: ~50,000 policy documents, FAQs, and regulations. Used pgvector for embeddings in PostgreSQL, an ingestion pipeline with semantic chunking, and a Go service to orchestrate searches and GPT-4 calls.',
    },
    outcome: {
      es: 'Reducción del 45% en tickets de soporte en el primer trimestre post-lanzamiento. El sistema ahora maneja 15,000 consultas/día con latencia p95 de 800ms. Ahorro estimado de $2M USD anuales en costos de soporte.',
      en: '45% reduction in support tickets in the first quarter post-launch. The system now handles 15,000 queries/day with p95 latency of 800ms. Estimated savings of $2M USD annually in support costs.',
    },
    architecture: {
      es: 'Pipeline de ingesta: crawler → chunking semántico → embedding (text-embedding-3-large) → pgvector. Servicio de consulta: Go HTTP → búsqueda vectorial + BM25 → re-ranking → prompt assembly → GPT-4 streaming → SSE al frontend React.',
      en: 'Ingestion pipeline: crawler → semantic chunking → embedding (text-embedding-3-large) → pgvector. Query service: Go HTTP → vector search + BM25 → re-ranking → prompt assembly → GPT-4 streaming → SSE to React frontend.',
    },
    keyDecisions: [
      {
        title: { es: 'Búsqueda Híbrida', en: 'Hybrid Search' },
        description: {
          es: 'Combiné búsqueda vectorial con BM25 lexical para manejar consultas con términos específicos del dominio financiero mexicano que los embeddings no capturaban bien.',
          en: 'Combined vector search with BM25 lexical to handle queries with specific Mexican financial domain terms that embeddings did not capture well.',
        },
      },
      {
        title: { es: 'Prompt Caching', en: 'Prompt Caching' },
        description: {
          es: 'Implementé caching semántico de respuestas para consultas similares, reduciendo llamadas a la API en 38% y costos en $18,000/mes.',
          en: 'Implemented semantic response caching for similar queries, reducing API calls by 38% and costs by $18,000/month.',
        },
      },
      {
        title: { es: 'Guardrails de Contenido', en: 'Content Guardrails' },
        description: {
          es: 'Construí un pipeline de pre-procesamiento para detectar y filtrar consultas fuera de dominio, preguntas sobre competidores, y contenido potencialmente problemático.',
          en: 'Built a pre-processing pipeline to detect and filter out-of-domain queries, competitor questions, and potentially problematic content.',
        },
      },
      {
        title: { es: 'Streaming con SSE', en: 'Streaming with SSE' },
        description: {
          es: 'Usé Server-Sent Events en lugar de WebSockets para streaming de respuestas — más simple de implementar con HTTP/2 y compatible con el CDN existente.',
          en: 'Used Server-Sent Events instead of WebSockets for response streaming — simpler to implement with HTTP/2 and compatible with the existing CDN.',
        },
      },
    ],
    metrics: [
      { label: { es: 'Reducción tickets soporte', en: 'Support ticket reduction' }, value: '45', unit: '%' },
      { label: { es: 'Consultas diarias', en: 'Daily queries' }, value: '15,000', unit: '' },
      { label: { es: 'Latencia p95', en: 'p95 Latency' }, value: '800', unit: 'ms' },
      { label: { es: 'Ahorro anual', en: 'Annual savings' }, value: '$2M', unit: 'USD' },
      { label: { es: 'Reducción costos API', en: 'API cost reduction' }, value: '38', unit: '%' },
    ],
    techStack: ['Go', 'Python', 'PostgreSQL + pgvector', 'OpenAI GPT-4', 'text-embedding-3-large', 'Redis', 'Kubernetes', 'React', 'SSE'],
    lessons: [
      {
        es: 'El re-ranking manual supera a los embeddings puros para dominios muy específicos. Vale la pena la complejidad adicional.',
        en: 'Manual re-ranking outperforms pure embeddings for very specific domains. The added complexity is worth it.',
      },
      {
        es: 'Empieza con chunking más grande de lo que crees necesario — chunks pequeños pierden contexto crítico en documentos legales.',
        en: 'Start with larger chunks than you think you need — small chunks lose critical context in legal documents.',
      },
      {
        es: 'El caching semántico tiene ROI inmediato. Implementarlo en semana 2 del proyecto nos ahorró $180K en el primer año.',
        en: 'Semantic caching has immediate ROI. Implementing it in week 2 of the project saved us $180K in the first year.',
      },
    ],
    color: '#7C3AED',
    accentColor: '#A78BFA',
  },
  {
    slug: 'retool-scale',
    company: 'Retool',
    logo: 'https://retool.com/logo.png',
    screenshot: 'https://retool-dot-com.s3.us-west-2.amazonaws.com/page-assets/homepage/homepage-meta-image.png',
    title: {
      es: 'Optimización de Rendimiento del Builder',
      en: 'Builder Performance Optimization',
    },
    role: {
      es: 'Ingeniero de Software Senior · Plataforma',
      en: 'Senior Software Engineer · Platform',
    },
    dates: 'Apr 2021 – Jul 2024',
    heroImage: '/images/projects/retool-scale.jpg',
    problem: {
      es: 'El builder de Retool tenía problemas de rendimiento severos con aplicaciones complejas: tiempo de carga inicial de 8-12 segundos, freezes en canvas con 100+ componentes, y memory leaks que crasheaban el browser.',
      en: 'Retool\'s builder had severe performance issues with complex applications: 8-12 second initial load times, canvas freezes with 100+ components, and memory leaks that crashed the browser.',
    },
    approach: {
      es: 'Audité el rendering pipeline completo usando React DevTools y Chrome Performance. Identifiqué 3 problemas raíz: re-renders cascada por estado global no normalizado, bundles sin code splitting, y event listeners sin cleanup. Implementé soluciones graduales: normalización de estado con Zustand, lazy loading agresivo, y un sistema de virtualización para el canvas.',
      en: 'Audited the complete rendering pipeline using React DevTools and Chrome Performance. Identified 3 root causes: cascade re-renders from non-normalized global state, bundles without code splitting, and event listeners without cleanup. Implemented gradual solutions: state normalization with Zustand, aggressive lazy loading, and a virtualization system for the canvas.',
    },
    outcome: {
      es: 'Tiempo de carga reducido de 8-12s a 2.1s (p50). Cero crashes por memory leaks en los 6 meses posteriores. El builder ahora maneja 500+ componentes sin degradación de rendimiento. NPS del producto subió 18 puntos.',
      en: 'Load time reduced from 8-12s to 2.1s (p50). Zero crashes from memory leaks in the subsequent 6 months. The builder now handles 500+ components without performance degradation. Product NPS went up 18 points.',
    },
    architecture: {
      es: 'Nuevo modelo de estado: Zustand normalized store con selectores memoizados. Canvas virtualizado con IntersectionObserver para renderizar solo los componentes visibles. Build pipeline: Webpack module federation para lazy loading por feature.',
      en: 'New state model: Zustand normalized store with memoized selectors. Virtualized canvas with IntersectionObserver to render only visible components. Build pipeline: Webpack module federation for feature-level lazy loading.',
    },
    keyDecisions: [
      {
        title: { es: 'Zustand sobre Redux', en: 'Zustand over Redux' },
        description: {
          es: 'Redux tenía demasiado boilerplate y sus DevTools causaban overhead. Zustand con Immer nos dio la misma predictibilidad con 60% menos código.',
          en: 'Redux had too much boilerplate and its DevTools caused overhead. Zustand with Immer gave us the same predictability with 60% less code.',
        },
      },
      {
        title: { es: 'Migración Gradual', en: 'Gradual Migration' },
        description: {
          es: 'En lugar de un rewrite completo, usamos feature flags para migrar módulo por módulo sin interrumpir a los 100,000+ usuarios activos.',
          en: 'Instead of a complete rewrite, we used feature flags to migrate module by module without interrupting 100,000+ active users.',
        },
      },
      {
        title: { es: 'TypeScript Estricto', en: 'Strict TypeScript' },
        description: {
          es: 'La migración a TypeScript estricto reveló 40+ bugs latentes que no eran visibles en runtime normal pero causaban problemas en edge cases.',
          en: 'Migration to strict TypeScript revealed 40+ latent bugs not visible in normal runtime but causing problems in edge cases.',
        },
      },
    ],
    metrics: [
      { label: { es: 'Mejora tiempo de carga', en: 'Load time improvement' }, value: '74', unit: '%' },
      { label: { es: 'Nuevo tiempo de carga p50', en: 'New p50 load time' }, value: '2.1', unit: 's' },
      { label: { es: 'NPS mejora', en: 'NPS improvement' }, value: '+18', unit: '' },
      { label: { es: 'Memory leaks en producción', en: 'Production memory leaks' }, value: '0', unit: '' },
    ],
    techStack: ['TypeScript', 'React', 'Zustand', 'Webpack 5', 'Module Federation', 'Node.js', 'PostgreSQL', 'AWS'],
    lessons: [
      {
        es: 'Medir antes de optimizar. Teníamos hipótesis incorrectas sobre los bottlenecks — el profiling reveló problemas inesperados.',
        en: 'Measure before optimizing. We had incorrect hypotheses about bottlenecks — profiling revealed unexpected problems.',
      },
      {
        es: 'Las migraciones graduales con feature flags son más costosas a corto plazo pero mucho más seguras. No hubo un solo incidente de producción.',
        en: 'Gradual migrations with feature flags are more costly short-term but much safer. There was not a single production incident.',
      },
    ],
    color: '#D946EF',
    accentColor: '#F472B6',
  },
  {
    slug: 'factorial-migration',
    company: 'Factorial HR',
    logo: 'https://factorialhr.com/images/factorial-one-logo.svg',
    screenshot: 'https://www.datocms-assets.com/58969/1760002781-hr_core_en.webp',
    title: {
      es: 'Migración Monolito → Microservicios',
      en: 'Monolith → Microservices Migration',
    },
    role: {
      es: 'Ingeniero Full Stack Senior',
      en: 'Senior Full Stack Engineer',
    },
    dates: 'Jan 2019 – Mar 2021',
    heroImage: '/images/projects/factorial-migration.jpg',
    problem: {
      es: 'Factorial había crecido 10x en usuarios en 18 meses. El monolito Rails original no podía escalar: deploys de 45 minutos, feature flags imposibles, y una base de código de 800,000+ líneas donde cada cambio rompía algo inesperado.',
      en: 'Factorial had grown 10x in users in 18 months. The original Rails monolith could not scale: 45-minute deploys, impossible feature flags, and a 800,000+ line codebase where every change broke something unexpected.',
    },
    approach: {
      es: 'Lideré la extracción de dominios de negocio del monolito usando Domain-Driven Design. Empezamos por el módulo de nómina (el más crítico y el más independiente). Definí bounded contexts, diseñé las APIs de integración entre servicios, y construí el primer microservicio en Go como prueba de concepto.',
      en: 'Led the extraction of business domains from the monolith using Domain-Driven Design. Started with the payroll module (most critical and most independent). Defined bounded contexts, designed integration APIs between services, and built the first Go microservice as proof of concept.',
    },
    outcome: {
      es: 'En 18 meses migramos 6 dominios principales. Deploy time reducido de 45min a 4min. Onboarding de nuevos ingenieros reducido de 2 semanas a 3 días. La plataforma escala ahora a 3,000+ empresas sin degradación.',
      en: 'In 18 months we migrated 6 main domains. Deploy time reduced from 45min to 4min. New engineer onboarding reduced from 2 weeks to 3 days. The platform now scales to 3,000+ companies without degradation.',
    },
    architecture: {
      es: 'Strangler Fig pattern: nuevo tráfico dirigido al microservicio vía API Gateway, monolito viejo mantenido como fallback. Event sourcing para sincronización de estado entre servicios. PostgreSQL por servicio para aislamiento. Redis pub/sub para eventos asincrónicos.',
      en: 'Strangler Fig pattern: new traffic directed to microservice via API Gateway, old monolith maintained as fallback. Event sourcing for state synchronization between services. PostgreSQL per service for isolation. Redis pub/sub for asynchronous events.',
    },
    keyDecisions: [
      {
        title: { es: 'Strangler Fig, no Big Bang', en: 'Strangler Fig, not Big Bang' },
        description: {
          es: 'Un rewrite completo habría paralizado el equipo por 6+ meses. El patrón Strangler Fig nos permitió migrar incrementalmente sin afectar a los usuarios.',
          en: 'A complete rewrite would have paralyzed the team for 6+ months. The Strangler Fig pattern allowed us to migrate incrementally without affecting users.',
        },
      },
      {
        title: { es: 'Go para servicios nuevos', en: 'Go for new services' },
        description: {
          es: 'Elegimos Go sobre Node.js para los microservicios por su performance en cargas CPU-bound (cálculos de nómina) y compilación estática que simplifica el deployment.',
          en: 'We chose Go over Node.js for microservices for its performance on CPU-bound loads (payroll calculations) and static compilation that simplifies deployment.',
        },
      },
      {
        title: { es: 'Event Sourcing para Nómina', en: 'Event Sourcing for Payroll' },
        description: {
          es: 'El historial inmutable de events nos dio trazabilidad completa para auditorías fiscales — un requerimiento legal crítico que con el monolito era imposible de satisfacer.',
          en: 'The immutable event history gave us complete traceability for tax audits — a critical legal requirement that was impossible to satisfy with the monolith.',
        },
      },
    ],
    metrics: [
      { label: { es: 'Reducción tiempo de deploy', en: 'Deploy time reduction' }, value: '91', unit: '%' },
      { label: { es: 'Tiempo de deploy', en: 'Deploy time' }, value: '4', unit: 'min' },
      { label: { es: 'Onboarding de ingenieros', en: 'Engineer onboarding' }, value: '3', unit: 'days' },
      { label: { es: 'Empresas en plataforma', en: 'Companies on platform' }, value: '3,000', unit: '+' },
    ],
    techStack: ['Go', 'Ruby on Rails', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Stripe'],
    lessons: [
      {
        es: 'DDD primero, código después. Invertir 2 semanas en definir bounded contexts nos ahorró meses de refactoring posterior.',
        en: 'DDD first, code later. Investing 2 weeks in defining bounded contexts saved us months of later refactoring.',
      },
      {
        es: 'El equipo de negocio debe estar involucrado desde el día 1 en la definición de dominios — ellos conocen las invariantes del negocio mejor que cualquier ingeniero.',
        en: 'The business team must be involved from day 1 in domain definition — they know the business invariants better than any engineer.',
      },
      {
        es: 'Los tests de contrato entre servicios son tan importantes como los tests unitarios. Sin ellos, las integraciones fallan silenciosamente.',
        en: 'Contract tests between services are as important as unit tests. Without them, integrations fail silently.',
      },
    ],
    color: '#F59E0B',
    accentColor: '#FBBF24',
  },
  {
    slug: 'holded-erp',
    company: 'Holded',
    logo: 'https://logo.clearbit.com/holded.com',
    screenshot: 'https://cdn.prod.website-files.com/67b490fcbe3ce7d2c397872f/682b04dbd2c57b8347518765_49c0394869007a671a31461ace4ca938_Home_Hero_ENG.webp',
    title: {
      es: 'Plataforma ERP/CRM para PYMEs',
      en: 'ERP/CRM Platform for SMEs',
    },
    role: {
      es: 'Ingeniero Full Stack',
      en: 'Full Stack Engineer',
    },
    dates: 'Jul 2016 – Dec 2018',
    heroImage: '/images/projects/holded-erp.jpg',
    problem: {
      es: 'Las PYMEs españolas gestionaban contabilidad, inventario y facturación con herramientas dispares. Holded necesitaba un módulo de facturación electrónica conforme a la normativa fiscal española y un dashboard de analytics en tiempo real para visualizar KPIs financieros.',
      en: 'Spanish SMEs managed accounting, inventory and invoicing with disparate tools. Holded needed an e-invoicing module compliant with Spanish tax regulations and a real-time analytics dashboard to visualize financial KPIs.',
    },
    approach: {
      es: 'Construí el módulo de facturación electrónica integrando los requisitos de la AEAT, y desarrollé un dashboard de analytics en tiempo real usando Chart.js y WebSockets. Paralelamente, refactoricé consultas críticas de PostgreSQL que afectaban el rendimiento de toda la plataforma.',
      en: 'Built the e-invoicing module integrating AEAT requirements, and developed a real-time analytics dashboard using Chart.js and WebSockets. In parallel, refactored critical PostgreSQL queries affecting platform-wide performance.',
    },
    outcome: {
      es: 'El módulo de facturación fue adoptado por 10,000+ empresas. Las consultas refactorizadas mejoraron el rendimiento en 8x. La plataforma escaló a miles de PYMEs en España consolidando toda su gestión empresarial.',
      en: 'The invoicing module was adopted by 10,000+ companies. Refactored queries improved performance 8x. The platform scaled to thousands of SMEs in Spain consolidating all their business management.',
    },
    architecture: {
      es: 'Backend Node.js con Vue.js en frontend. PostgreSQL como base de datos principal con Redis para caché. WebSockets para actualizaciones en tiempo real del dashboard. Integración con API de la AEAT para validación fiscal. Despliegue en AWS con Docker.',
      en: 'Node.js backend with Vue.js frontend. PostgreSQL as main database with Redis for caching. WebSockets for real-time dashboard updates. Integration with AEAT API for tax validation. AWS deployment with Docker.',
    },
    keyDecisions: [
      {
        title: { es: 'WebSockets para Analytics', en: 'WebSockets for Analytics' },
        description: {
          es: 'Elegimos WebSockets sobre polling para el dashboard financiero en tiempo real, reduciendo la carga del servidor un 40% y mejorando la experiencia de usuario notablemente.',
          en: 'We chose WebSockets over polling for the real-time financial dashboard, reducing server load by 40% and significantly improving user experience.',
        },
      },
      {
        title: { es: 'Conformidad Fiscal AEAT', en: 'AEAT Tax Compliance' },
        description: {
          es: 'Diseñamos el módulo de facturación desde el inicio con los requisitos de la AEAT, evitando costosas refactorizaciones y permitiendo adoptarlo por 10,000+ empresas sin incidentes.',
          en: 'We designed the invoicing module from the start with AEAT requirements, avoiding costly refactoring and allowing adoption by 10,000+ companies without incidents.',
        },
      },
    ],
    metrics: [
      { label: { es: 'Empresas adoptaron facturación', en: 'Companies adopted invoicing' }, value: '10,000', unit: '+' },
      { label: { es: 'Mejora de rendimiento', en: 'Performance improvement' }, value: '8', unit: 'x' },
      { label: { es: 'Reducción carga servidor', en: 'Server load reduction' }, value: '40', unit: '%' },
      { label: { es: 'Años en la plataforma', en: 'Years on platform' }, value: '2+', unit: '' },
    ],
    techStack: ['Node.js', 'Vue.js', 'PostgreSQL', 'Redis', 'MongoDB', 'AWS', 'Docker', 'WebSockets', 'Chart.js'],
    lessons: [
      {
        es: 'La conformidad fiscal debe diseñarse desde el día 1, no añadirse después. El coste de hacerlo bien al inicio es una fracción del coste de refactorizar.',
        en: 'Tax compliance must be designed from day 1, not added later. The cost of getting it right from the start is a fraction of the refactoring cost.',
      },
      {
        es: 'Optimizar queries de base de datos tiene ROI inmediato y visible. Invertir tiempo en EXPLAIN ANALYZE vale más que cualquier capa de caché.',
        en: 'Optimizing database queries has immediate and visible ROI. Spending time on EXPLAIN ANALYZE is worth more than any caching layer.',
      },
    ],
    color: '#A78BFA',
    accentColor: '#C4B5FD',
  },
];
