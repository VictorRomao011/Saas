import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  Timer,
  Brain,
  ListTree,
  NotebookPen,
  BarChart3,
  Plug,
  GraduationCap,
  BookOpen,
  Briefcase,
  Code2,
  Mic2,
  Users,
  CheckCircle2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MascotAvatar } from '@/components/shared/MascotAvatar'
import { MASCOTS } from '@/data/mascots'
import { PRICING_PLANS } from '@/data/pricing'
import { useAppStore } from '@/store/appStore'

const STEPS = [
  {
    title: 'Conte seu objetivo',
    description: 'Diga o que você quer estudar ou construir, seu prazo e sua disponibilidade de tempo.',
  },
  {
    title: 'Receba um plano gerado por IA',
    description: 'A IA organiza tudo em módulos, tópicos e sessões de foco sob medida para você.',
  },
  {
    title: 'Estude com Pomodoro e Feynman',
    description: 'Mantenha o ritmo com sessões de foco e valide o domínio explicando o que aprendeu.',
  },
  {
    title: 'Acompanhe sua evolução',
    description: 'Veja progresso, tempo de foco e lacunas no dashboard, sempre que precisar.',
  },
]

const FEATURES = [
  { icon: Timer, title: 'Pomodoro inteligente', description: 'Sessões de foco adaptadas ao seu ritmo, com pausas no momento certo.' },
  { icon: Brain, title: 'Técnica de Feynman', description: 'Explique o que aprendeu e descubra lacunas antes da prova ou da entrega.' },
  { icon: ListTree, title: 'Plano gerado por IA', description: 'Seu objetivo transformado em módulos, tópicos e prazos organizados.' },
  { icon: NotebookPen, title: 'Anotações organizadas', description: 'Notas conectadas automaticamente a projetos, tópicos e sessões de estudo.' },
  { icon: BarChart3, title: 'Dashboard de progresso', description: 'Acompanhe evolução, tempo de foco e domínio por tópico em tempo real.' },
  { icon: Plug, title: 'Integrações futuras', description: 'Estrutura já preparada para Notion, Obsidian, GitHub e Cakto.' },
]

const AUDIENCES = [
  { icon: GraduationCap, label: 'Concurseiros' },
  { icon: BookOpen, label: 'Estudantes do ENEM' },
  { icon: Briefcase, label: 'Universitários' },
  { icon: Code2, label: 'Profissionais e devs' },
  { icon: Mic2, label: 'Criadores de conteúdo' },
  { icon: Users, label: 'Times pequenos' },
]

const FAQS = [
  {
    question: 'O EstudaFlow AI garante minha aprovação ou um resultado específico?',
    answer:
      'Não. O EstudaFlow ajuda a organizar seus estudos, manter o ritmo e identificar lacunas de conhecimento — mas aprovação e resultados dependem do seu esforço e de fatores fora do nosso controle. Nunca prometemos aprovação garantida ou cura para falta de foco.',
  },
  {
    question: 'As integrações com Notion, Obsidian, GitHub e Cakto já funcionam de verdade?',
    answer:
      'Nesta prévia, as integrações são simuladas para mostrar como vão funcionar. Nenhuma conexão real é feita com suas contas — a arquitetura já está preparada para integração futura.',
  },
  {
    question: 'Meus dados são compartilhados com outros usuários?',
    answer: 'Não. Cada conta enxerga apenas os próprios projetos, notas, sessões e resultados.',
  },
  {
    question: 'O mascote substitui um professor, médico ou psicólogo?',
    answer:
      'Não. Os mascotes são guias motivacionais e de organização do estudo, e não substituem orientação profissional especializada.',
  },
  {
    question: 'Posso cancelar ou trocar de plano quando quiser?',
    answer: 'Sim. Você pode trocar de plano ou cancelar a qualquer momento na página de Configurações.',
  },
]

export function LandingPage() {
  const navigate = useNavigate()
  const loginDemo = useAppStore((s) => s.loginDemo)

  function handleSeeDemo() {
    loginDemo()
    navigate('/dashboard')
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-grid-glow" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-5">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Prévia funcional com dados simulados
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Organize seus estudos e projetos com{' '}
              <span className="text-gradient">ritmo, foco e IA</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              O EstudaFlow AI combina Pomodoro, Técnica de Feynman e planejamento com IA para ajudar você a estudar
              para concursos, ENEM, faculdade ou tirar projetos do papel — com mascotes que tornam o processo mais
              leve.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link to="/cadastro">
                  Começar gratuitamente <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" onClick={handleSeeDemo}>
                Ver demonstração com dados simulados
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Não é necessário cartão de crédito. Prévia navegável com dados de exemplo.
            </p>
          </div>

          <div className="relative animate-float">
            <Card className="glass-panel relative overflow-hidden p-1 shadow-glow">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Boa tarde, Victor</p>
                    <p className="font-display text-lg font-semibold">Seu progresso esta semana</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-secondary/40 p-3">
                    <p className="text-xs text-muted-foreground">Sessões de foco</p>
                    <p className="font-display text-2xl font-bold">14</p>
                  </div>
                  <div className="rounded-xl bg-secondary/40 p-3">
                    <p className="text-xs text-muted-foreground">Domínio médio</p>
                    <p className="font-display text-2xl font-bold text-success">76%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                      <span>ENEM 2026 · Matemática</span>
                      <span className="font-medium text-foreground">62%</span>
                    </div>
                    <Progress value={62} />
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Projeto SaaS EstudaFlow</span>
                      <span className="font-medium text-foreground">71%</span>
                    </div>
                    <Progress value={71} />
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2.5 text-xs text-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  Recomendação da IA: revisar "Função Quadrática" antes do próximo simulado.
                </div>
              </CardContent>
            </Card>
            <div className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-t border-border/60 bg-secondary/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Como funciona</h2>
            <p className="mt-3 text-muted-foreground">Do objetivo à execução, em quatro passos simples.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Card key={step.title} className="relative">
                <CardContent className="space-y-3 p-6">
                  <span className="font-display text-3xl font-bold text-primary/30">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-base font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Tudo que você precisa para manter o ritmo</h2>
            <p className="mt-3 text-muted-foreground">
              Um sistema completo de produtividade para estudos e projetos, com IA simulada já estruturada para
              evoluir.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                <CardContent className="space-y-3 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mascotes */}
      <section className="border-t border-border/60 bg-secondary/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Escolha um mascote que combina com você</h2>
            <p className="mt-3 text-muted-foreground">
              Cada mascote tem um estilo de comunicação diferente para te acompanhar na jornada de estudos.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MASCOTS.map((mascot) => (
              <Card key={mascot.id} className="flex flex-col items-center gap-3 p-6 text-center">
                <MascotAvatar mascot={mascot} size="lg" animated />
                <h3 className="font-display text-base font-semibold">{mascot.name}</h3>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{mascot.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{mascot.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link to="/cadastro">
                Criar conta e escolher meu mascote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Para quem é o EstudaFlow AI</h2>
            <p className="mt-3 text-muted-foreground">Feito para qualquer pessoa que precisa estudar ou entregar projetos com constância.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {AUDIENCES.map((aud) => (
              <div key={aud.label} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <aud.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">{aud.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos teaser */}
      <section className="border-t border-border/60 bg-secondary/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Planos para cada fase da jornada</h2>
            <p className="mt-3 text-muted-foreground">Comece gratuitamente e evolua quando precisar de mais.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_PLANS.map((plan) => (
              <Card key={plan.id} className={plan.highlight ? 'border-primary/50 shadow-glow' : undefined}>
                <CardContent className="space-y-3 p-6">
                  {plan.highlight && <Badge>Mais popular</Badge>}
                  <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                  <p>
                    <span className="font-display text-2xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/planos">
                Ver todos os planos e recursos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Perguntas frequentes</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/15 via-card to-accent/10 p-10 text-center">
            <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Pronto para organizar seus estudos?</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Crie sua conta gratuita, escolha seu mascote e receba um plano gerado por IA em poucos minutos.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" asChild>
                  <Link to="/cadastro">
                    Começar gratuitamente <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" onClick={handleSeeDemo}>
                  Ver demonstração
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
