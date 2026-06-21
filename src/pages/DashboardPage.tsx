import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Brain, Flame, Timer, TrendingUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DashboardMetricCard } from '@/components/shared/DashboardMetricCard'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { ProgressCard } from '@/components/shared/ProgressCard'
import { RecommendedNextAction } from '@/components/shared/RecommendedNextAction'
import { MascotSpeechBubble } from '@/components/shared/MascotSpeechBubble'
import { useAppStore } from '@/store/appStore'
import { getMascot } from '@/data/mascots'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function DashboardPage() {
  const navigate = useNavigate()
  const user = useAppStore((s) => s.user)
  const projects = useAppStore((s) => s.projects)
  const studyPlans = useAppStore((s) => s.studyPlans)
  const pomodoroSessions = useAppStore((s) => s.pomodoroSessions)
  const feynmanTests = useAppStore((s) => s.feynmanTests)

  const mascot = getMascot(user?.selectedMascot)

  const stats = useMemo(() => {
    const completed = pomodoroSessions.filter((s) => s.status === 'concluido')
    const totalFocusMinutes = completed.reduce((sum, s) => sum + s.focusMinutes, 0)
    const sessionsToday = completed.filter((s) => s.startedAt.slice(0, 10) === todayStr()).length
    const avgScore = feynmanTests.length
      ? Math.round(feynmanTests.reduce((sum, t) => sum + t.score, 0) / feynmanTests.length)
      : 0

    return {
      sessionCount: completed.length,
      sessionsToday,
      totalHours: Math.round((totalFocusMinutes / 60) * 10) / 10,
      avgScore,
    }
  }, [pomodoroSessions, feynmanTests])

  const activeProjects = projects.filter((p) => p.status !== 'concluido')
  const nextProject = [...activeProjects].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  )[0]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Seu painel de estudos</h1>
          <p className="mt-1 text-muted-foreground">Acompanhe seu progresso e continue de onde parou.</p>
        </div>
        {mascot && <MascotSpeechBubble mascot={mascot} size="sm" className="sm:max-w-sm" />}
      </div>

      {nextProject && (
        <RecommendedNextAction
          message={`${nextProject.nextSession ?? 'Continue seu plano de estudos'} — projeto "${nextProject.name}".`}
          ctaLabel="Ir para sala de foco"
          onAction={() => navigate('/foco')}
        />
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <DashboardMetricCard
          label="Sessões concluídas"
          value={String(stats.sessionCount)}
          icon={Timer}
          accent="purple"
          trend={stats.sessionsToday > 0 ? `+${stats.sessionsToday} hoje` : undefined}
        />
        <DashboardMetricCard label="Horas de foco" value={`${stats.totalHours}h`} icon={Flame} accent="blue" />
        <DashboardMetricCard label="Domínio médio (Feynman)" value={`${stats.avgScore}%`} icon={Brain} accent="green" />
        <DashboardMetricCard label="Projetos ativos" value={String(activeProjects.length)} icon={TrendingUp} accent="gold" />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Seus projetos</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/projetos')}>
            Ver todos <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Progresso dos planos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {studyPlans.map((plan) => {
            const project = projects.find((p) => p.id === plan.projectId)
            return (
              <ProgressCard
                key={plan.id}
                title={project?.name ?? plan.name}
                description={plan.delaysDays > 0 ? `${plan.delaysDays} dia(s) de atraso` : 'No prazo'}
                progress={plan.progress}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
