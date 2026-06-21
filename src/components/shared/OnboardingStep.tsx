import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface OnboardingStepProps {
  stepNumber: number
  totalSteps: number
  title: string
  subtitle?: string
  children: ReactNode
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  nextDisabled?: boolean
  className?: string
}

export function OnboardingStep({
  stepNumber,
  totalSteps,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = 'Continuar',
  nextDisabled = false,
  className,
}: OnboardingStepProps) {
  return (
    <div className={cn('mx-auto flex w-full max-w-2xl flex-col gap-8', className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Etapa {stepNumber} de {totalSteps}
          </span>
          <span>{Math.round((stepNumber / totalSteps) * 100)}%</span>
        </div>
        <Progress value={(stepNumber / totalSteps) * 100} />
      </div>

      <div className="space-y-2">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
      </div>

      <div>{children}</div>

      <div className="flex items-center justify-between pt-2">
        {onBack ? (
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        ) : (
          <span />
        )}
        {onNext && (
          <Button onClick={onNext} disabled={nextDisabled}>
            {nextLabel} <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
