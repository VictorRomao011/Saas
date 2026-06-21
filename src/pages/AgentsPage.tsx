import { Card, CardContent } from '@/components/ui/card'
import { AgentStatusCard } from '@/components/shared/AgentStatusCard'
import { AGENTS, DEMO_AGENT_LOGS } from '@/data/agents'
import type { AgentName } from '@/types'

function getLastLog(agentName: AgentName) {
  const logs = DEMO_AGENT_LOGS.filter((l) => l.agentName === agentName)
  if (!logs.length) return undefined
  return [...logs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
}

export function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Agentes de IA</h1>
        <p className="mt-1 max-w-2xl text-muted-foreground">
          Bastidores da arquitetura do EstudaFlow AI. Cada agente tem uma função específica e nunca invade o papel do
          outro — hoje todos operam em modo simulado.
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Os registros abaixo são exemplos simulados para ilustrar como cada agente funcionaria. Nenhuma chamada real a
          modelos de IA é feita nesta prévia — a arquitetura está preparada para conectar agentes reais no futuro.
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((agent) => (
          <AgentStatusCard key={agent.id} agent={agent} lastLog={getLastLog(agent.id)} />
        ))}
      </div>
    </div>
  )
}
