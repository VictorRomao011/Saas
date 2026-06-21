import type { PlanId } from '@/types'

export interface PricingPlan {
  id: PlanId
  name: string
  tagline: string
  price: string
  period: string
  highlight?: boolean
  ctaLabel: string
  features: string[]
  color: 'purple' | 'blue' | 'green' | 'neutral'
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Para começar a organizar sem custo.',
    price: 'R$ 0',
    period: '/sempre',
    ctaLabel: 'Começar grátis',
    color: 'neutral',
    features: ['1 projeto ativo', 'Pomodoro básico', '5 notas', '3 testes Feynman por mês'],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Para quem quer organização completa.',
    price: 'R$ 29',
    period: '/mês',
    highlight: true,
    ctaLabel: 'Assinar Pro',
    color: 'purple',
    features: [
      'Projetos ilimitados',
      'Pomodoro inteligente',
      'Testes Feynman ilimitados',
      'Exportação Markdown/PDF',
      'Dashboard completo',
    ],
  },
  {
    id: 'study_pro',
    name: 'Study Pro',
    tagline: 'Foco em ENEM e concursos.',
    price: 'R$ 39',
    period: '/mês',
    ctaLabel: 'Assinar Study Pro',
    color: 'blue',
    features: [
      'Foco em ENEM e concursos',
      'Cronograma inteligente',
      'Revisões programadas',
      'Simulados e lacunas',
      'Relatório de domínio',
    ],
  },
  {
    id: 'business',
    name: 'Creator / Business',
    tagline: 'Para projetos profissionais e equipes.',
    price: 'R$ 59',
    period: '/mês',
    ctaLabel: 'Assinar Business',
    color: 'green',
    features: [
      'Projetos profissionais',
      'Integração com GitHub',
      'Documentação organizada',
      'Apresentações estruturadas',
      'Relatórios de produtividade',
    ],
  },
]
