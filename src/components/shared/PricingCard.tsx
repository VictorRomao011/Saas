import { Check, Sparkles } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { PricingPlan } from '@/data/pricing'
import type { PlanId } from '@/types'

interface PricingCardProps {
  plan: PricingPlan
  currentPlanId?: PlanId
  onSelect?: (planId: PlanId) => void
  className?: string
}

const COLOR_RING: Record<PricingPlan['color'], string> = {
  purple: 'border-primary/50 shadow-glow',
  blue: 'border-accent/50 shadow-glow-blue',
  green: 'border-success/50 shadow-glow-green',
  neutral: 'border-border',
}

export function PricingCard({ plan, currentPlanId, onSelect, className }: PricingCardProps) {
  const isCurrent = currentPlanId === plan.id

  return (
    <Card
      className={cn(
        'relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1',
        plan.highlight ? COLOR_RING[plan.color] : 'border-border',
        className,
      )}
    >
      {plan.highlight && (
        <div className="absolute right-4 top-4">
          <Badge className="gap-1">
            <Sparkles className="h-3 w-3" /> Mais popular
          </Badge>
        </div>
      )}
      <CardHeader className="pb-0">
        <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
        <div className="flex items-baseline gap-1 pt-2">
          <span className="font-display text-3xl font-bold text-foreground">{plan.price}</span>
          <span className="text-sm text-muted-foreground">{plan.period}</span>
        </div>
        <p className="pt-1 text-sm text-muted-foreground">{plan.tagline}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 pt-5">
        <ul className="flex-1 space-y-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          variant={plan.highlight ? 'default' : 'outline'}
          className="w-full"
          disabled={isCurrent}
          onClick={() => onSelect?.(plan.id)}
        >
          {isCurrent ? 'Plano atual' : plan.ctaLabel}
        </Button>
      </CardContent>
    </Card>
  )
}
