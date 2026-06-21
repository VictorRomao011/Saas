import type { LucideIcon } from 'lucide-react'
import { FileText, BookOpen, GitFork, CreditCard, CalendarDays, Check, Clock, Settings2 } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Integration, IntegrationProvider, IntegrationStatus } from '@/types'

interface IntegrationCardProps {
  integration: Integration
  onConnect?: (provider: IntegrationProvider) => void
  className?: string
}

const PROVIDER_META: Record<IntegrationProvider, { name: string; description: string; icon: LucideIcon }> = {
  notion: {
    name: 'Notion',
    description: 'Envie módulos, tópicos e notas direto para suas páginas do Notion.',
    icon: FileText,
  },
  obsidian: {
    name: 'Obsidian',
    description: 'Exporte suas anotações em Markdown organizadas por projeto e tópico.',
    icon: BookOpen,
  },
  github: {
    name: 'GitHub',
    description: 'Conecte issues e commits do seu repositório aos tópicos do projeto.',
    icon: GitFork,
  },
  cakto: {
    name: 'Cakto',
    description: 'Gerencie sua assinatura e pagamentos quando o checkout for ativado.',
    icon: CreditCard,
  },
  calendar: {
    name: 'Google Agenda',
    description: 'Sincronize sessões de foco e prazos de projetos com sua agenda.',
    icon: CalendarDays,
  },
}

const STATUS_META: Record<IntegrationStatus, { label: string; variant: 'success' | 'outline' | 'accent' | 'warning' }> = {
  conectado: { label: 'Conectado', variant: 'success' },
  disponivel: { label: 'Disponível', variant: 'accent' },
  nao_conectado: { label: 'Não conectado', variant: 'outline' },
  em_breve: { label: 'Em breve', variant: 'warning' },
  configuracao_futura: { label: 'Configuração futura', variant: 'warning' },
}

export function IntegrationCard({ integration, onConnect, className }: IntegrationCardProps) {
  const meta = PROVIDER_META[integration.provider]
  const status = STATUS_META[integration.status]
  const Icon = meta.icon
  const actionable = integration.status === 'disponivel' || integration.status === 'nao_conectado'

  return (
    <Card className={cn('transition-all duration-300 hover:-translate-y-1', className)}>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/60 text-foreground">
            <Icon className="h-5 w-5" />
          </div>
          <Badge variant={status.variant}>
            {integration.status === 'conectado' && <Check className="h-3 w-3" />}
            {(integration.status === 'em_breve' || integration.status === 'configuracao_futura') && (
              <Clock className="h-3 w-3" />
            )}
            {status.label}
          </Badge>
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">{meta.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{meta.description}</p>
        </div>
        <Button
          variant={actionable ? 'outline' : 'ghost'}
          className="w-full"
          disabled={!actionable}
          onClick={() => onConnect?.(integration.provider)}
        >
          {integration.status === 'conectado' && <Settings2 className="h-4 w-4" />}
          {integration.status === 'conectado'
            ? 'Gerenciar conexão'
            : integration.status === 'disponivel' || integration.status === 'nao_conectado'
              ? 'Conectar (simulado)'
              : integration.status === 'em_breve'
                ? 'Em breve'
                : 'Configuração futura'}
        </Button>
      </CardContent>
    </Card>
  )
}
