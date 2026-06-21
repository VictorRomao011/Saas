import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Activity, Clock3, DollarSign, FolderKanban, Timer, Users } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DashboardMetricCard } from '@/components/shared/DashboardMetricCard'
import { ADMIN_RECENT_USERS, ADMIN_STATS, MASCOT_POPULARITY, PLAN_USAGE } from '@/data/adminData'

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

export function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Área administrativa</h1>
          <p className="mt-1 text-muted-foreground">Visão geral de uso da plataforma.</p>
        </div>
        <Badge variant="outline">Dados simulados para esta prévia</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <DashboardMetricCard label="Usuários" value={ADMIN_STATS.totalUsers.toLocaleString('pt-BR')} icon={Users} accent="purple" />
        <DashboardMetricCard
          label="Projetos"
          value={ADMIN_STATS.totalProjects.toLocaleString('pt-BR')}
          icon={FolderKanban}
          accent="blue"
        />
        <DashboardMetricCard
          label="Sessões Pomodoro"
          value={ADMIN_STATS.totalPomodoroSessions.toLocaleString('pt-BR')}
          icon={Timer}
          accent="green"
        />
        <DashboardMetricCard
          label="Testes Feynman"
          value={ADMIN_STATS.totalFeynmanTests.toLocaleString('pt-BR')}
          icon={Activity}
          accent="gold"
        />
        <DashboardMetricCard label="Latência média" value={`${ADMIN_STATS.avgLatencyMs}ms`} icon={Clock3} accent="blue" />
        <DashboardMetricCard
          label="Custo estimado de IA"
          value={`$${ADMIN_STATS.estimatedAiCostUsd.toFixed(2)}`}
          icon={DollarSign}
          accent="purple"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Popularidade dos mascotes</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Pie data={MASCOT_POPULARITY} dataKey="value" nameKey="mascot" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {MASCOT_POPULARITY.map((entry, index) => (
                    <Cell key={entry.mascot} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="transparent" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="flex flex-wrap gap-3 px-5 pb-5">
            {MASCOT_POPULARITY.map((entry, index) => (
              <div key={entry.mascot} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                {entry.mascot} · {entry.value}%
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Uso por plano</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PLAN_USAGE} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} horizontal={false} />
                <XAxis type="number" stroke={MUTED_COLOR} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="plan" type="category" stroke={MUTED_COLOR} fontSize={12} tickLine={false} axisLine={false} width={90} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'hsl(252, 24%, 14%)' }} />
                <Bar dataKey="value" name="% de usuários" fill={CHART_COLORS[1]} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Usuários recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Mascote</TableHead>
                <TableHead>Projetos</TableHead>
                <TableHead>Última atividade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ADMIN_RECENT_USERS.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium text-foreground">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{u.plan}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.mascot}</TableCell>
                  <TableCell className="text-muted-foreground">{u.projects}</TableCell>
                  <TableCell className="text-muted-foreground">{u.lastActivity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
