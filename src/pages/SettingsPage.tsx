import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AlertTriangle, CreditCard, Database, RotateCcw, Trash2, Volume2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MascotCard } from '@/components/shared/MascotCard'
import { useAppStore } from '@/store/appStore'
import { MASCOTS } from '@/data/mascots'
import { PRICING_PLANS } from '@/data/pricing'
import { cn } from '@/lib/utils'
import type { AiSettings, CommunicationStyle, MascotId } from '@/types'

const COMMUNICATION_STYLE_OPTIONS: { value: CommunicationStyle; label: string }[] = [
  { value: 'motivador', label: 'Motivador' },
  { value: 'calmo', label: 'Calmo' },
  { value: 'direto', label: 'Direto' },
  { value: 'detalhado', label: 'Detalhado' },
]

const HELP_LEVEL_OPTIONS: { value: AiSettings['helpLevel']; label: string; description: string }[] = [
  { value: 'basico', label: 'Básico', description: 'Sugestões pontuais, você decide a maior parte.' },
  { value: 'padrao', label: 'Padrão', description: 'Equilíbrio entre autonomia e orientação da IA.' },
  { value: 'avancado', label: 'Avançado', description: 'A IA propõe ativamente próximos passos.' },
]

const RESPONSE_LENGTH_OPTIONS: { value: AiSettings['responseLength']; label: string }[] = [
  { value: 'curta', label: 'Curta e direta' },
  { value: 'detalhada', label: 'Detalhada' },
]

export function SettingsPage() {
  const navigate = useNavigate()
  const user = useAppStore((s) => s.user)
  const pomodoroSettings = useAppStore((s) => s.pomodoroSettings)
  const aiSettings = useAppStore((s) => s.aiSettings)
  const mascotSettings = useAppStore((s) => s.mascotSettings)
  const updateUserProfile = useAppStore((s) => s.updateUserProfile)
  const updatePomodoroSettings = useAppStore((s) => s.updatePomodoroSettings)
  const updateAiSettings = useAppStore((s) => s.updateAiSettings)
  const updateMascotSettings = useAppStore((s) => s.updateMascotSettings)
  const selectMascot = useAppStore((s) => s.selectMascot)
  const clearHistory = useAppStore((s) => s.clearHistory)
  const resetDemoData = useAppStore((s) => s.resetDemoData)

  const currentPlan = PRICING_PLANS.find((p) => p.id === user?.plan)

  function handleSelectMascot(mascotId: MascotId) {
    selectMascot(mascotId)
    toast.success('Mascote atualizado')
  }

  function handleClearHistory() {
    clearHistory()
    toast.success('Histórico limpo', { description: 'Notas, sessões e testes Feynman foram removidos.' })
  }

  function handleResetDemo() {
    resetDemoData()
    toast.success('Dados de demonstração restaurados')
  }

  function minutesField(label: string, value: number, onChange: (v: number) => void) {
    return (
      <div className="space-y-1.5">
        <Label>{label}</Label>
        <Input
          type="number"
          min={1}
          max={180}
          value={value}
          onChange={(e) => onChange(Math.max(1, Number(e.target.value) || 1))}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Configurações</h1>
        <p className="mt-1 text-muted-foreground">Ajuste seu perfil, mascote, ritmo de foco e preferências de IA.</p>
      </div>

      <Tabs defaultValue="perfil">
        <TabsList className="flex-wrap">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="mascote">Mascote</TabsTrigger>
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="ia">IA</TabsTrigger>
          <TabsTrigger value="plano">Plano</TabsTrigger>
          <TabsTrigger value="dados">Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informações da conta</CardTitle>
              <CardDescription>Seus dados básicos de perfil.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={user?.name ?? ''}
                    onChange={(e) => updateUserProfile({ name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" value={user?.email ?? ''} disabled />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Alterações de perfil são salvas automaticamente nesta prévia.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mascote" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Seu mascote</CardTitle>
              <CardDescription>Troque de companhia quando quiser. O histórico não é afetado.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {MASCOTS.map((mascot) => (
                  <MascotCard
                    key={mascot.id}
                    mascot={mascot}
                    selected={user?.selectedMascot === mascot.id}
                    onSelect={() => handleSelectMascot(mascot.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preferências do mascote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Volume da voz</Label>
                  <span className="font-display text-sm font-semibold text-primary">{mascotSettings.voiceVolume}%</span>
                </div>
                <Slider
                  value={[mascotSettings.voiceVolume]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={([v]) => updateMascotSettings({ voiceVolume: v })}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 px-2 text-xs text-muted-foreground"
                  onClick={() =>
                    toast.info('Prévia de voz autorizada', {
                      description:
                        'Áudio real chega quando os assets licenciados forem enviados pelo admin. Por enquanto, apenas texto.',
                    })
                  }
                >
                  <Volume2 className="h-3 w-3" />
                  Prévia de voz autorizada
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-secondary/40 p-4">
                <div>
                  <p className="text-sm font-medium">Frases motivacionais</p>
                  <p className="text-xs text-muted-foreground">Mostrar frases do mascote pelo app.</p>
                </div>
                <Switch
                  checked={mascotSettings.motivationalPhrasesEnabled}
                  onCheckedChange={(checked) => updateMascotSettings({ motivationalPhrasesEnabled: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label>Estilo de comunicação</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {COMMUNICATION_STYLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateMascotSettings({ communicationStyle: opt.value })}
                      className={cn(
                        'rounded-xl border-2 border-border bg-card p-3 text-center text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40',
                        mascotSettings.communicationStyle === opt.value && 'border-primary shadow-glow',
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pomodoro">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tempos do modo clássico</CardTitle>
              <CardDescription>Os modos Foco leve, Foco profundo e Revisão têm tempos fixos.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {minutesField('Foco (min)', pomodoroSettings.focusMinutes, (v) => updatePomodoroSettings({ focusMinutes: v }))}
              {minutesField('Pausa curta (min)', pomodoroSettings.shortBreakMinutes, (v) =>
                updatePomodoroSettings({ shortBreakMinutes: v }),
              )}
              {minutesField('Pausa longa (min)', pomodoroSettings.longBreakMinutes, (v) =>
                updatePomodoroSettings({ longBreakMinutes: v }),
              )}
              {minutesField('Ciclos até pausa longa', pomodoroSettings.cyclesBeforeLongBreak, (v) =>
                updatePomodoroSettings({ cyclesBeforeLongBreak: v }),
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Nível de ajuda da IA</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {HELP_LEVEL_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateAiSettings({ helpLevel: opt.value })}
                  className={cn(
                    'rounded-xl border-2 border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40',
                    aiSettings.helpLevel === opt.value && 'border-primary shadow-glow',
                  )}
                >
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{opt.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tamanho das respostas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 sm:max-w-md">
              {RESPONSE_LENGTH_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateAiSettings({ responseLength: opt.value })}
                  className={cn(
                    'rounded-xl border-2 border-border bg-card p-3 text-center text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40',
                    aiSettings.responseLength === opt.value && 'border-primary shadow-glow',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Privacidade e escopo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-secondary/40 p-4">
                <div className="pr-4">
                  <p className="text-sm font-medium">Permitir pesquisa externa quando necessário</p>
                  <p className="text-xs text-muted-foreground">
                    Usado apenas para informações que mudam com o tempo (ex: datas de edital). Sempre identificadas como
                    "necessita pesquisa".
                  </p>
                </div>
                <Switch
                  checked={aiSettings.allowWebSearch}
                  onCheckedChange={(checked) => updateAiSettings({ allowWebSearch: checked })}
                />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-secondary/40 p-4">
                <div className="pr-4">
                  <p className="text-sm font-medium">Restringir IA aos dados do seu projeto</p>
                  <p className="text-xs text-muted-foreground">
                    Impede que a IA misture informações entre projetos diferentes ou de outros usuários.
                  </p>
                </div>
                <Switch
                  checked={aiSettings.restrictScope}
                  onCheckedChange={(checked) => updateAiSettings({ restrictScope: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plano">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Seu plano atual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-start justify-between gap-3 rounded-xl bg-secondary/40 p-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg font-semibold">{currentPlan?.name ?? 'Free'}</span>
                    <Badge variant="accent">Plano atual</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{currentPlan?.tagline}</p>
                </div>
                <Button variant="outline" onClick={() => navigate('/planos')}>
                  <CreditCard className="h-4 w-4" /> Ver planos e fazer upgrade
                </Button>
              </div>
              {currentPlan && (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {currentPlan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {f}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-xs text-muted-foreground">
                Cobrança ainda é simulada nesta prévia. A integração de pagamento real (Cakto) chega em uma versão futura.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dados">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dados e conta</CardTitle>
              <CardDescription>
                Todos os dados desta prévia ficam salvos apenas no seu navegador. Não há backend real nesta versão.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Limpar histórico</p>
                    <p className="text-xs text-muted-foreground">Remove notas, sessões de foco e testes Feynman.</p>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Trash2 className="h-4 w-4" /> Limpar histórico
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning" /> Limpar histórico?
                      </DialogTitle>
                      <DialogDescription>
                        Isso remove todas as suas notas, sessões de Pomodoro e testes Feynman. Seus projetos e planos
                        continuam intactos. Essa ação não pode ser desfeita.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="destructive" onClick={handleClearHistory}>
                          Limpar histórico
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Restaurar dados de demonstração</p>
                    <p className="text-xs text-muted-foreground">Substitui tudo pelos dados de exemplo iniciais.</p>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <RotateCcw className="h-4 w-4" /> Restaurar dados
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning" /> Restaurar dados de demonstração?
                      </DialogTitle>
                      <DialogDescription>
                        Isso substitui todos os seus dados atuais (projetos, notas, sessões, testes e integrações) pelos
                        dados de exemplo. Essa ação não pode ser desfeita.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="destructive" onClick={handleResetDemo}>
                          Restaurar dados
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
