import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { useAppStore } from '@/store/appStore'
import type { ProjectStatus } from '@/types'

const FILTERS: { value: 'todos' | ProjectStatus; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'atrasado', label: 'Atrasados' },
  { value: 'nao_iniciado', label: 'Não iniciados' },
  { value: 'concluido', label: 'Concluídos' },
]

export function ProjectsPage() {
  const navigate = useNavigate()
  const projects = useAppStore((s) => s.projects)
  const [filter, setFilter] = useState<'todos' | ProjectStatus>('todos')

  const filtered = filter === 'todos' ? projects : projects.filter((p) => p.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Meus projetos</h1>
          <p className="mt-1 text-muted-foreground">Todos os seus estudos e projetos organizados em um só lugar.</p>
        </div>
        <Button onClick={() => navigate('/onboarding')}>
          <Plus className="h-4 w-4" /> Novo projeto
        </Button>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as 'todos' | ProjectStatus)}>
        <TabsList className="flex-wrap">
          {FILTERS.map((f) => (
            <TabsTrigger key={f.value} value={f.value}>
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground">Nenhum projeto encontrado com este filtro.</p>
          <Button variant="outline" onClick={() => setFilter('todos')}>
            Ver todos os projetos
          </Button>
        </div>
      )}
    </div>
  )
}
