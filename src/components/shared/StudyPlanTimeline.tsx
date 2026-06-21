import { CheckCircle2, Circle, CircleDot, Brain, Play } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { Module, Topic } from '@/types'

interface StudyPlanTimelineProps {
  modules: Module[]
  onStartPomodoro?: (topic: Topic) => void
  onOpenFeynman?: (topic: Topic) => void
  className?: string
}

const STATUS_ICON: Record<Topic['status'], typeof CheckCircle2> = {
  concluido: CheckCircle2,
  em_andamento: CircleDot,
  nao_iniciado: Circle,
}

const STATUS_COLOR: Record<Topic['status'], string> = {
  concluido: 'text-success',
  em_andamento: 'text-primary',
  nao_iniciado: 'text-muted-foreground',
}

const PRIORITY_BADGE: Record<Topic['priority'], { label: string; variant: 'warning' | 'outline' | 'secondary' }> = {
  alta: { label: 'Prioridade alta', variant: 'warning' },
  media: { label: 'Prioridade média', variant: 'outline' },
  baixa: { label: 'Prioridade baixa', variant: 'secondary' },
}

function moduleProgress(mod: Module) {
  if (mod.topics.length === 0) return 0
  const done = mod.topics.filter((t) => t.status === 'concluido').length
  return Math.round((done / mod.topics.length) * 100)
}

export function StudyPlanTimeline({ modules, onStartPomodoro, onOpenFeynman, className }: StudyPlanTimelineProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {modules.map((mod, index) => {
        const isLast = index === modules.length - 1
        return (
          <div key={mod.id} className="relative pl-8">
            <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
              {mod.order}
            </div>
            {!isLast && <div className="absolute -bottom-6 left-[11px] top-7 w-px bg-border" />}

            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-display text-base font-semibold text-foreground">{mod.name}</h3>
              <span className="text-xs text-muted-foreground">{moduleProgress(mod)}%</span>
            </div>

            <div className="space-y-2">
              {mod.topics.map((topic) => {
                const StatusIcon = STATUS_ICON[topic.status]
                const priority = PRIORITY_BADGE[topic.priority]
                return (
                  <div
                    key={topic.id}
                    className="flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <StatusIcon className={cn('mt-0.5 h-5 w-5 shrink-0', STATUS_COLOR[topic.status])} />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{topic.name}</p>
                          {topic.priority === 'alta' && <Badge variant={priority.variant}>{priority.label}</Badge>}
                          {topic.feynmanStatus === 'concluido' && (
                            <Badge variant="success">Domínio {topic.feynmanScore}%</Badge>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{topic.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Progress
                            value={topic.plannedPomodoros > 0 ? (topic.completedPomodoros / topic.plannedPomodoros) * 100 : 0}
                            className="h-1.5 w-28"
                          />
                          <span className="text-xs text-muted-foreground">
                            {topic.completedPomodoros}/{topic.plannedPomodoros} pomodoros
                          </span>
                        </div>
                      </div>
                    </div>

                    {topic.status !== 'concluido' && (onStartPomodoro || onOpenFeynman) && (
                      <div className="flex shrink-0 items-center gap-2 sm:pl-8">
                        {onStartPomodoro && (
                          <Button size="sm" variant="outline" onClick={() => onStartPomodoro(topic)}>
                            <Play className="h-3.5 w-3.5" /> Pomodoro
                          </Button>
                        )}
                        {onOpenFeynman && (
                          <Button size="sm" onClick={() => onOpenFeynman(topic)}>
                            <Brain className="h-3.5 w-3.5" /> Teste Feynman
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
