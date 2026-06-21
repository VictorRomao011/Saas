import { Sparkles, ArrowRight } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RecommendedNextActionProps {
  message: string
  ctaLabel?: string
  onAction?: () => void
  className?: string
}

export function RecommendedNextAction({ message, ctaLabel = 'Começar agora', onAction, className }: RecommendedNextActionProps) {
  return (
    <Card className={cn('relative overflow-hidden border-primary/30 bg-gradient-to-r from-primary/15 via-card to-accent/10', className)}>
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Próxima ação recomendada</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">{message}</p>
          </div>
        </div>
        {onAction && (
          <Button onClick={onAction} className="w-full shrink-0 sm:w-auto">
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}
