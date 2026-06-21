import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ZapOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PomodoroTimer } from '@/components/shared/PomodoroTimer'
import { SessionSummaryModal } from '@/components/shared/SessionSummaryModal'
import { MascotSpeechBubble } from '@/components/shared/MascotSpeechBubble'
import { useAppStore } from '@/store/appStore'
import { getMascot } from '@/data/mascots'
import type { PomodoroMode } from '@/types'

const MODE_LABELS: Record<PomodoroMode, string> = {
  classico: 'Clássico',
  leve: 'Foco leve',
  profundo: 'Foco profundo',
  revisao: 'Revisão',
}

export function FocusRoomPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const user = useAppStore((s) => s.user)
  const projects = useAppStore((s) => s.projects)
  const studyPlans = useAppStore((s) => s.studyPlans)
  const pomodoroSettings = useAppStore((s) => s.pomodoroSettings)
  const startPomodoroSession = useAppStore((s) => s.startPomodoroSession)
  const completePomodoroSession = useAppStore((s) => s.completePomodoroSession)

  const mascot = getMascot(user?.selectedMascot)

  const [projectId, setProjectId] = useState(searchParams.get('projectId') ?? '')
  const [topicId, setTopicId] = useState(searchParams.get('topicId') ?? '')
  const initialMode = searchParams.get('mode')
  const [mode, setMode] = useState<PomodoroMode>(
    initialMode && initialMode in MODE_LABELS ? (initialMode as PomodoroMode) : 'classico',
  )

  const MODE_MINUTES: Record<PomodoroMode, { focus: number; break: number }> = {
    classico: { focus: pomodoroSettings.focusMinutes, break: pomodoroSettings.shortBreakMinutes },
    leve: { focus: 15, break: 5 },
    profundo: { focus: 50, break: 10 },
    revisao: { focus: 20, break: 5 },
  }

  const availableTopics = useMemo(() => {
    const plan = studyPlans.find((p) => p.projectId === projectId)
    if (!plan) return []
    return plan.modules.flatMap((m) => m.topics).filter((t) => t.status !== 'concluido')
  }, [studyPlans, projectId])

  const [phase, setPhase] = useState<'setup' | 'running' | 'done'>('setup')
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [distractions, setDistractions] = useState(0)
  const [sessionId, setSessionId] = useState('')
  const [summaryOpen, setSummaryOpen] = useState(false)

  useEffect(() => {
    if (phase !== 'running' || !isRunning) return
    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [phase, isRunning])

  useEffect(() => {
    if (phase === 'running' && isRunning && secondsLeft === 0) {
      handleSessionComplete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft])

  useEffect(() => {
    function handleVisibility() {
      if (document.hidden && phase === 'running' && isRunning) {
        setDistractions((d) => d + 1)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [phase, isRunning])

  const selectedTopic = availableTopics.find((t) => t.id === topicId)
  const selectedProject = projects.find((p) => p.id === projectId)

  function handleStart() {
    if (!projectId || !topicId) {
      toast.error('Escolha um projeto e um tópico para começar.')
      return
    }
    const minutes = MODE_MINUTES[mode]
    const id = startPomodoroSession({
      projectId,
      topicId,
      mode,
      focusMinutes: minutes.focus,
      breakMinutes: minutes.break,
      distractions: 0,
      startedAt: new Date().toISOString(),
    })
    setSessionId(id)
    setTotalSeconds(minutes.focus * 60)
    setSecondsLeft(minutes.focus * 60)
    setDistractions(0)
    setPhase('running')
    setIsRunning(true)
  }

  function handleSessionComplete() {
    setIsRunning(false)
    setSessionId((id) => {
      if (id) completePomodoroSession(id, distractions)
      return id
    })
    setPhase('done')
    setSummaryOpen(true)
  }

  function resetToSetup() {
    setPhase('setup')
    setSummaryOpen(false)
    setSessionId('')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Sala de Foco</h1>
        <p className="mt-1 text-muted-foreground">Escolha um tópico e entre no ritmo com a técnica Pomodoro.</p>
      </div>

      {mascot && phase !== 'running' && <MascotSpeechBubble mascot={mascot} />}

      {phase === 'setup' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Configurar sessão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label>Projeto</Label>
              <Select
                value={projectId}
                onValueChange={(v) => {
                  setProjectId(v)
                  setTopicId('')
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um projeto" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Tópico</Label>
              <Select value={topicId} onValueChange={setTopicId}>
                <SelectTrigger disabled={!projectId}>
                  <SelectValue placeholder={projectId ? 'Selecione um tópico' : 'Escolha um projeto primeiro'} />
                </SelectTrigger>
                <SelectContent>
                  {availableTopics.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Estilo de Pomodoro</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as PomodoroMode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(MODE_LABELS) as PomodoroMode[]).map((m) => (
                    <SelectItem key={m} value={m}>
                      {MODE_LABELS[m]} · {MODE_MINUTES[m].focus}/{MODE_MINUTES[m].break}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" size="lg" onClick={handleStart}>
              Iniciar sessão
            </Button>
          </CardContent>
        </Card>
      )}

      {phase === 'running' && (
        <Card>
          <CardContent className="flex flex-col items-center gap-5 p-8">
            <p className="text-center text-sm text-muted-foreground">
              {selectedProject?.name} · <span className="text-foreground">{selectedTopic?.name}</span>
            </p>
            <PomodoroTimer
              label={MODE_LABELS[mode]}
              secondsLeft={secondsLeft}
              totalSeconds={totalSeconds}
              isRunning={isRunning}
              onTogglePlay={() => setIsRunning((r) => !r)}
              onReset={() => setSecondsLeft(totalSeconds)}
              onSkip={handleSessionComplete}
            />
            <Button variant="ghost" size="sm" onClick={() => setDistractions((d) => d + 1)}>
              <ZapOff className="h-3.5 w-3.5" /> Registrar distração ({distractions})
            </Button>
          </CardContent>
        </Card>
      )}

      <SessionSummaryModal
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
        topicName={selectedTopic?.name ?? 'Sessão de foco'}
        focusMinutes={Math.round(totalSeconds / 60)}
        distractions={distractions}
        onAddNote={() => navigate(`/anotacoes?topicId=${topicId}&projectId=${projectId}`)}
        onStartFeynman={() => navigate(`/feynman?topicId=${topicId}&projectId=${projectId}`)}
        onStartAnother={resetToSetup}
        onFinish={() => navigate('/dashboard')}
      />
    </div>
  )
}
