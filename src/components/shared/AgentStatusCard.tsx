import * as Icons from 'lucide-react'
import { Sparkles, type LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { AgentDefinition, AgentLog } from '@/types'

interface AgentStatusCardProps {
  agent: AgentDefinition
  lastLog?: AgentLog
  className?: string
}

export function AgentStatusCard({ agent, lastLog, className }: AgentStatusCardProps) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[agent.icon] ?? Sparkles

  return (
    <Card className={cn('transition-all duration-300 hover:-translate-y-1', className)}>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <Badge variant={agent.status === 'ativo' ? 'success' : 'outline'}>
            {agent.status === 'ativo' ? 'Ativo' : 'Simulado'}
          </Badge>
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">{agent.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{agent.function}</p>
        </div>
        {lastLog && (
          <div className="space-y-1 rounded-xl bg-secondary/40 p-3 text-xs">
            <p className="text-muted-foreground">Última execução simulada</p>
            <p className="text-foreground">{lastLog.outputSummary}</p>
            <div className="flex items-center gap-3 pt-1 text-muted-foreground">
              <span>{lastLog.latencyMs}ms</span>
              <span>~${lastLog.estimatedCostUsd.toFixed(3)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
