export interface ExpertiseArea {
  id: string;
  icon: string;
  titleKey: string;
  descKey: string;
  size: 'small' | 'medium' | 'large';
  color: string;
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: 'llm',
    icon: '✦',
    titleKey: 'expertise.llm',
    descKey: 'expertise.llm_desc',
    size: 'large',
    color: '#7C3AED',
  },
  {
    id: 'rag',
    icon: '◈',
    titleKey: 'expertise.rag',
    descKey: 'expertise.rag_desc',
    size: 'small',
    color: '#D946EF',
  },
  {
    id: 'distributed',
    icon: '⬡',
    titleKey: 'expertise.distributed',
    descKey: 'expertise.distributed_desc',
    size: 'small',
    color: '#F59E0B',
  },
  {
    id: 'prompt',
    icon: '◎',
    titleKey: 'expertise.prompt',
    descKey: 'expertise.prompt_desc',
    size: 'medium',
    color: '#A78BFA',
  },
  {
    id: 'fullstack',
    icon: '◫',
    titleKey: 'expertise.fullstack',
    descKey: 'expertise.fullstack_desc',
    size: 'small',
    color: '#F472B6',
  },
  {
    id: 'leadership',
    icon: '◉',
    titleKey: 'expertise.leadership',
    descKey: 'expertise.leadership_desc',
    size: 'small',
    color: '#FBBF24',
  },
];
