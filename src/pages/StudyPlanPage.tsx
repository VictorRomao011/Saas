import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Calendar, Clock, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { StudyPlanTimeline } from '@/components/shared/StudyPlanTimeline'
import { useAppStore } from '@/store/appStore'
import type { Project, Topic } from '@/types'

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

export function StudyPlanPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const projects = useAppStore((s) => s.projects)
  const studyPlans = useAppStore((s) => s.studyPlans)
  const reorganizePlanWithAI = useAppStore((s) => s.reorganizePlanWithAI)

  const project = projects.find((p) => p.id === projectId)
  const plan = studyPlans.find((p) => p.projectId === projectId)

  if (!project || !plan) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <p className="text-muted-foreground">Projeto não encontrado.</p>
        <Button variant="outline" onClick={() => navigate('/projetos')}>
          Voltar para projetos
        </Button>
      </div>
    )
  }

  const handleReorganize = () => {
    reorganizePlanWithAI(project.id)
    toast.success('Plano reorganizado pelo Agente Planejador Taylor (simulado)', {
      description: 'Tópicos em andamento e de prioridade alta foram trazidos para o topo.',
    })
  }

  const handleStartPomodoro = (topic: Topic) => {
    navigate(`/foco?projectId=${project.id}&topicId=${topic.id}`)
  }

  const handleOpenFeynman = (topic: Topic) => {
    navigate(`/feynman?projectId=${project.id}&topicId=${topic.id}`)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge variant="outline" className="mb-2">
            {TYPE_LABEL[project.type]}
          </Badge>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">{project.name}</h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">{project.goal}</p>
        </div>
        <Button variant="outline" onClick={handleReorganize}>
          <Sparkles className="h-4 w-4" /> Reorganizar plano com IA
        </Button>
      </div>

      <Card>
        <CardContent className="grid gap-6 p-5 sm:grid-cols-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progresso geral</span>
              <span className="font-medium text-foreground">{plan.progress}%</span>
            </div>
            <Progress value={plan.progress} />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0 text-primary" />
            {new Date(plan.startDate).toLocaleDateString('pt-BR')} –{' '}
            {new Date(plan.endDate).toLocaleDateString('pt-BR')}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            {plan.delaysDays > 0 ? `${plan.delaysDays} dia(s) de atraso` : 'No prazo'}
          </div>
        </CardContent>
      </Card>

      <StudyPlanTimeline modules={plan.modules} onStartPomodoro={handleStartPomodoro} onOpenFeynman={handleOpenFeynman} />
    </div>
  )
}
