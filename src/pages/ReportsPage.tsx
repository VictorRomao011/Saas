import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Brain, Flame, Timer, ZapOff } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardMetricCard } from '@/components/shared/DashboardMetricCard'
import { useAppStore } from '@/store/appStore'

const CHART_COLORS = ['hsl(263, 83%, 65%)', 'hsl(199, 89%, 60%)', 'hsl(158, 64%, 52%)', 'hsl(38, 92%, 60%)']
const GRID_COLOR = 'hsl(252, 22%, 17%)'
const MUTED_COLOR = 'hsl(240, 14%, 66%)'
const TOOLTIP_STYLE = {
  background: 'hsl(252, 34%, 8%)',
  border: '1px solid hsl(252, 22%, 17%)',
  borderRadius: '0.75rem',
  color: 'hsl(210, 30%, 97%)',
  fontSize: '0.8rem',
}

function formatDayLabel(isoDate: string) {
  const [, m, d] = isoDate.split('-')
  return `${d}/${m}`
}

export function ReportsPage() {
  const pomodoroSessions = useAppStore((s) => s.pomodoroSessions)
  const feynmanTests = useAppStore((s) => s.feynmanTests)
  const projects = useAppStore((s) => s.projects)

  const completedSessions = useMemo(() => pomodoroSessions.filter((s) => s.status === 'concluido'), [pomodoroSessions])

  const stats = useMemo(() => {
    const totalFocusMinutes = completedSessions.reduce((sum, s) => sum + s.focusMinutes, 0)
    const totalDistractions = completedSessions.reduce((sum, s) => sum + s.distractions, 0)
    const avgScore = feynmanTests.length
      ? Math.round(feynmanTests.reduce((sum, t) => sum + t.score, 0) / feynmanTests.length)
      : 0
    return {
      totalHours: Math.round((totalFocusMinutes / 60) * 10) / 10,
      sessionCount: completedSessions.length,
      avgScore,
      totalDistractions,
    }
  }, [completedSessions, feynmanTests])

  const dailyFocus = useMemo(() => {
    const map = new Map<string, number>()
    completedSessions.forEach((s) => {
      const day = s.startedAt.slice(0, 10)
      map.set(day, (map.get(day) ?? 0) + s.focusMinutes)
    })
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, minutos]) => ({ date: formatDayLabel(date), minutos }))
  }, [completedSessions])

  const projectDistribution = useMemo(() => {
    const map = new Map<string, number>()
    completedSessions.forEach((s) => {
      map.set(s.projectId, (map.get(s.projectId) ?? 0) + s.focusMinutes)
    })
    return Array.from(map.entries()).map(([projectId, minutos]) => ({
      name: projects.find((p) => p.id === projectId)?.name ?? 'Projeto',
      minutos,
    }))
  }, [completedSessions, projects])

  const feynmanEvolution = useMemo(() => {
    return [...feynmanTests]
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((t, i) => ({ label: `${formatDayLabel(t.createdAt.slice(0, 10))}`, score: t.score, teste: `Teste ${i + 1}` }))
  }, [feynmanTests])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Relatórios</h1>
        <p className="mt-1 text-muted-foreground">Visualize sua evolução de foco e domínio ao longo do tempo.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <DashboardMetricCard label="Horas de foco" value={`${stats.totalHours}h`} icon={Flame} accent="purple" />
        <DashboardMetricCard label="Sessões concluídas" value={String(stats.sessionCount)} icon={Timer} accent="blue" />
        <DashboardMetricCard label="Domínio médio (Feynman)" value={`${stats.avgScore}%`} icon={Brain} accent="green" />
        <DashboardMetricCard label="Distrações registradas" value={String(stats.totalDistractions)} icon={ZapOff} accent="gold" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Minutos de foco por dia</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {dailyFocus.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyFocus}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
                  <XAxis dataKey="date" stroke={MUTED_COLOR} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={MUTED_COLOR} fontSize={12} tickLine={false} axisLine={false} width={32} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'hsl(252, 24%, 14%)' }} />
                  <Bar dataKey="minutos" name="Minutos" fill={CHART_COLORS[0]} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Nenhuma sessão concluída ainda.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tempo de foco por projeto</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {projectDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Pie
                    data={projectDistribution}
                    dataKey="minutos"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {projectDistribution.map((entry, index) => (
                      <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="transparent" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Nenhuma sessão concluída ainda.
              </div>
            )}
          </CardContent>
          {projectDistribution.length > 0 && (
            <div className="flex flex-wrap gap-3 px-5 pb-5">
              {projectDistribution.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                  />
                  {entry.name}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Evolução do domínio (Teste Feynman)</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          {feynmanEvolution.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={feynmanEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
                <XAxis dataKey="teste" stroke={MUTED_COLOR} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={MUTED_COLOR} fontSize={12} tickLine={false} axisLine={false} width={32} domain={[0, 100]} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Domínio (%)"
                  stroke={CHART_COLORS[2]}
                  strokeWidth={2.5}
                  dot={{ fill: CHART_COLORS[2], r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Faça um Teste Feynman para ver sua evolução aqui.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
