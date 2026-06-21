import { toast } from 'sonner'

import { Card, CardContent } from '@/components/ui/card'
import { IntegrationCard } from '@/components/shared/IntegrationCard'
import { useAppStore } from '@/store/appStore'
import type { IntegrationProvider } from '@/types'

export function IntegrationsPage() {
  const integrations = useAppStore((s) => s.integrations)
  const setIntegrationStatus = useAppStore((s) => s.setIntegrationStatus)

  function handleConnect(provider: IntegrationProvider) {
    setIntegrationStatus(provider, 'conectado')
    toast.success('Conexão simulada com sucesso', {
      description: 'Nenhum dado real foi enviado. A integração real será habilitada quando você autorizar o acesso.',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Integrações</h1>
        <p className="mt-1 max-w-2xl text-muted-foreground">
          Conecte o EstudaFlow AI às ferramentas que você já usa. Por enquanto todas as conexões são simuladas — nenhum
          dado é enviado para serviços externos sem sua autorização explícita.
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Esta é uma prévia funcional. As integrações reais com Notion, Obsidian, GitHub, Google Agenda e Cakto serão
          ativadas em versões futuras, sempre com sua autorização explícita antes de qualquer acesso aos seus dados.
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.id} integration={integration} onConnect={handleConnect} />
        ))}
      </div>
    </div>
  )
}
