import type { Module, OnboardingData } from '@/types'

// Simulação do "Agente Planejador Taylor".
// Em produção, esta função seria substituída por uma chamada de IA real que
// interpreta o objetivo em linguagem natural e retorna módulos/tópicos sob medida.
// Aqui geramos uma estrutura plausível a partir de templates por categoria.

const TEMPLATES: Record<string, string[]> = {
  concurso: ['Diagnóstico do edital', 'Fundamentos da matéria', 'Aprofundamento e exercícios', 'Revisão e simulados'],
  enem: ['Diagnóstico inicial', 'Fundamentos', 'Aprofundamento por matéria', 'Revisão e simulados'],
  faculdade: ['Levantamento da ementa', 'Conteúdo das aulas', 'Exercícios e trabalhos', 'Revisão para provas'],
  projeto_profissional: ['Planejamento', 'Execução', 'Validação e ajustes', 'Entrega final'],
  projeto_programacao: ['Planejamento técnico', 'Construção do MVP', 'Testes e ajustes', 'Lançamento'],
  apresentacao: ['Estrutura da apresentação', 'Conteúdo e dados', 'Design dos slides', 'Ensaio e timing'],
  nova_habilidade: ['Fundamentos', 'Prática guiada', 'Aprofundamento', 'Avaliação final'],
  outro: ['Diagnóstico', 'Organização do conteúdo', 'Execução', 'Revisão final'],
}

function slug(prefix: string, index: number) {
  return `${prefix}-${index}-${Math.random().toString(36).slice(2, 7)}`
}

export function generateModulesFromOnboarding(data: OnboardingData, projectId: string): Module[] {
  const templateModules = TEMPLATES[data.category] ?? TEMPLATES.outro
  const goalSnippet = data.goalText.trim().slice(0, 60) || 'objetivo definido no onboarding'

  return templateModules.map((moduleName, moduleIndex) => {
    const moduleId = slug('mod-onb', moduleIndex)
    const isFirstModule = moduleIndex === 0

    return {
      id: moduleId,
      name: moduleName,
      order: moduleIndex + 1,
      topics: [
        {
          id: slug('top-onb', moduleIndex),
          projectId,
          moduleId,
          name: isFirstModule ? `Mapear: ${goalSnippet}` : `${moduleName}: primeiro tópico`,
          description: isFirstModule
            ? 'Tópico inicial gerado a partir do objetivo descrito no onboarding.'
            : `Tópico sugerido pela IA para a etapa "${moduleName}".`,
          priority: isFirstModule ? 'alta' : 'media',
          status: 'nao_iniciado',
          plannedPomodoros: data.style === 'profundo' ? 2 : 3,
          completedPomodoros: 0,
          feynmanStatus: 'pendente',
          feynmanScore: 0,
        },
      ],
    }
  })
}

export function estimateLeadTimeDays(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 30
  return Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)))
}

export function suggestPomodoroModeLabel(style: OnboardingData['style']): string {
  switch (style) {
    case 'classico':
      return 'Clássico 25/5'
    case 'leve':
      return 'Foco leve 15/5'
    case 'profundo':
      return 'Foco profundo 50/10'
    default:
      return 'Sugerido pela IA: Clássico 25/5'
  }
}
