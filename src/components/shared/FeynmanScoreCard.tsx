import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FeynmanScoreCardProps {
  score: number
  clarity: number
  simplicity: number
  strengths: string[]
  gaps: string[]
  nextSteps: string[]
  recommendedPomodoros: number
  onGenerateReview?: () => void
  className?: string
}

function scoreColor(score: number) {
  if (score >= 75) return 'text-success'
  if (score >= 50) return 'text-warning'
  return 'text-destructive'
}

export function FeynmanScoreCard({
  score,
  clarity,
  simplicity,
  strengths,
  gaps,
  nextSteps,
  recommendedPomodoros,
  onGenerateReview,
  className,
}: FeynmanScoreCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-border bg-secondary/30">
        <div>
          <CardTitle>Resultado da análise</CardTitle>
          <p className="text-sm text-muted-foreground">Domínio estimado pelo Agente Feynman Tutor (simulado)</p>
        </div>
        <div className="text-right">
          <span className={cn('font-display text-4xl font-bold', scoreColor(score))}>{score}%</span>
          <p className="text-xs text-muted-foreground">domínio</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-secondary/40 p-3">
            <p className="text-xs text-muted-foreground">Clareza</p>
            <p className="font-display text-xl font-semibold">{clarity}%</p>
          </div>
          <div className="rounded-xl bg-secondary/40 p-3">
            <p className="text-xs text-muted-foreground">Simplicidade</p>
            <p className="font-display text-xl font-semibold">{simplicity}%</p>
          </div>
        </div>

        {strengths.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-success">
              <CheckCircle2 className="h-4 w-4" /> Você explicou bem
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {strengths.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-success" /> {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {gaps.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-warning">
              <AlertTriangle className="h-4 w-4" /> Precisa revisar
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {gaps.map((g) => (
                <li key={g} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-warning" /> {g}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Próximos passos</p>
          <ol className="space-y-1.5">
            {nextSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {recommendedPomodoros > 0 && (
          <div className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-foreground">
            Recomendamos <strong>{recommendedPomodoros} Pomodoro{recommendedPomodoros > 1 ? 's' : ''}</strong> de revisão antes de tentar novamente.
          </div>
        )}

        {onGenerateReview && (
          <Button className="w-full" onClick={onGenerateReview}>
            Gerar nova sessão de revisão <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
