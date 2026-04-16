export interface TechItem {
  name: string;
  logo?: string;
  yearsExperience: number;
}

export interface TechCategory {
  id: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    id: 'frontend',
    items: [
      { name: 'React', yearsExperience: 7 },
      { name: 'Next.js', yearsExperience: 5 },
      { name: 'TypeScript', yearsExperience: 6 },
      { name: 'Vue.js', yearsExperience: 3 },
      { name: 'Tailwind CSS', yearsExperience: 4 },
      { name: 'Framer Motion', yearsExperience: 3 },
      { name: 'GraphQL', yearsExperience: 4 },
      { name: 'React Query', yearsExperience: 3 },
    ],
  },
  {
    id: 'backend',
    items: [
      { name: 'Go', yearsExperience: 4 },
      { name: 'Node.js', yearsExperience: 8 },
      { name: 'Python', yearsExperience: 5 },
      { name: 'Ruby on Rails', yearsExperience: 4 },
      { name: 'PostgreSQL', yearsExperience: 8 },
      { name: 'Redis', yearsExperience: 6 },
      { name: 'MongoDB', yearsExperience: 3 },
      { name: 'gRPC', yearsExperience: 3 },
    ],
  },
  {
    id: 'cloud',
    items: [
      { name: 'AWS', yearsExperience: 6 },
      { name: 'GCP', yearsExperience: 3 },
      { name: 'Vercel', yearsExperience: 4 },
      { name: 'Kubernetes', yearsExperience: 4 },
      { name: 'Docker', yearsExperience: 6 },
      { name: 'Terraform', yearsExperience: 3 },
    ],
  },
  {
    id: 'ai_ml',
    items: [
      { name: 'OpenAI API', yearsExperience: 3 },
      { name: 'Anthropic API', yearsExperience: 2 },
      { name: 'LangChain', yearsExperience: 2 },
      { name: 'Pinecone', yearsExperience: 2 },
      { name: 'pgvector', yearsExperience: 2 },
      { name: 'Hugging Face', yearsExperience: 2 },
      { name: 'Vercel AI SDK', yearsExperience: 1 },
      { name: 'LlamaIndex', yearsExperience: 1 },
    ],
  },
  {
    id: 'devops',
    items: [
      { name: 'GitHub Actions', yearsExperience: 5 },
      { name: 'ArgoCD', yearsExperience: 3 },
      { name: 'DataDog', yearsExperience: 4 },
      { name: 'Prometheus', yearsExperience: 3 },
      { name: 'Grafana', yearsExperience: 3 },
      { name: 'Nginx', yearsExperience: 6 },
    ],
  },
  {
    id: 'testing',
    items: [
      { name: 'Jest', yearsExperience: 6 },
      { name: 'Playwright', yearsExperience: 3 },
      { name: 'Vitest', yearsExperience: 2 },
      { name: 'Go testing', yearsExperience: 4 },
      { name: 'Pact (Contract)', yearsExperience: 2 },
      { name: 'k6 (Load)', yearsExperience: 2 },
    ],
  },
];
