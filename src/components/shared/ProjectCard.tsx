import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Calendar, Clock } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

const TYPE_LABEL: Record<Project['type'], string> = {
  concurso: 'Concurso',
  enem: 'ENEM',
  faculdade: 'Faculdade',
  profissional: 'Profissional',
  programacao: 'Programação',
  apresentacao: 'Apresentação',
  habilidade: 'Habilidade',
  outro: 'Outro',
}

const STATUS_BADGE: Record<Project['status'], { label: string; variant: 'success' | 'accent' | 'warning' | 'outline' }> = {
  em_andamento: { label: 'Em andamento', variant: 'accent' },
  nao_iniciado: { label: 'Não iniciado', variant: 'outline' },
  atrasado: { label: 'Atrasado', variant: 'warning' },
  concluido: { label: 'Concluído', variant: 'success' },
}

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const navigate = useNavigate()
  const status = STATUS_BADGE[project.status]

  return (
    <Card
      className={cn(
        'group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow',
        className,
      )}
      onClick={() => navigate(`/plano/${project.id}`)}
    >
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="outline" className="mb-2">
              {TYPE_LABEL[project.type]}
            </Badge>
            <h3 className="font-display text-base font-semibold leading-snug">{project.name}</h3>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progresso</span>
            <span className="font-medium text-foreground">{project.progress}%</span>
          </div>
          <Progress value={project.progress} />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(project.deadline).toLocaleDateString('pt-BR')}
          </span>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>

        {project.nextSession && (
          <div className="flex items-center gap-1.5 rounded-lg bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">{project.nextSession}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
