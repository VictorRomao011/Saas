import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { PricingCard } from '@/components/shared/PricingCard'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { PRICING_PLANS } from '@/data/pricing'
import { useAppStore } from '@/store/appStore'
import type { PlanId } from '@/types'

const FAQS = [
  {
    question: 'Posso trocar de plano depois?',
    answer: 'Sim. Você pode mudar de plano a qualquer momento na página de Configurações, sem burocracia.',
  },
  {
    question: 'A cobrança já está ativa nesta prévia?',
    answer:
      'Não. Esta é uma prévia funcional com dados simulados. A troca de plano aqui apenas atualiza seu perfil de demonstração — a integração de cobrança real (Cakto) está mapeada para o futuro.',
  },
  {
    question: 'Qual a diferença entre Pro e Study Pro?',
    answer:
      'O Pro é voltado para organização completa de qualquer tipo de projeto ou estudo. O Study Pro tem foco específico em ENEM e concursos, com cronograma e revisões programadas.',
  },
]

export function PricingPage() {
  const navigate = useNavigate()
  const isAuthenticated = useAppStore((s) => s.isAuthenticated)
  const currentPlanId = useAppStore((s) => s.user?.plan)
  const setPlan = useAppStore((s) => s.setPlan)

  function handleSelect(planId: PlanId) {
    if (!isAuthenticated) {
      navigate('/cadastro')
      return
    }
    setPlan(planId)
    toast.success('Plano atualizado (simulado)', {
      description: 'A cobrança real entra em produção junto com a integração Cakto.',
    })
  }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Cobrança simulada nesta prévia
          </Badge>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Planos para cada fase da sua jornada</h1>
          <p className="mt-3 text-muted-foreground">
            Comece gratuitamente e evolua quando precisar de mais recursos. Sem letras pequenas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} currentPlanId={currentPlanId} onSelect={handleSelect} />
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center font-display text-2xl font-bold">Perguntas sobre os planos</h2>
          <Accordion type="single" collapsible className="mt-8">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
