import type {
  User,
  Project,
  StudyPlan,
  Module,
  Topic,
  PomodoroSession,
  Note,
  FeynmanTest,
  Integration,
} from '@/types'

// -----------------------------------------------------------------------------
// Todos os dados abaixo são simulados (seed local) para a prévia do EstudaFlow AI.
// Em produção isto seria substituído por chamadas a um banco real (Postgres/Supabase)
// seguindo o schema descrito em src/types/index.ts.
// -----------------------------------------------------------------------------

export const DEMO_USER: User = {
  id: 'user-victor',
  name: 'Victor',
  email: 'demo@estudaflow.ai',
  language: 'pt-BR',
  usageType: 'concurso',
  selectedMascot: 'froid',
  plan: 'pro',
  createdAt: '2026-03-01T10:00:00-03:00',
  onboardingCompleted: true,
}

// ---------------------------- Projetos ---------------------------------------

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'proj-enem',
    userId: 'user-victor',
    name: 'ENEM 2026 - Matemática',
    type: 'enem',
    goal: 'Dominar matemática do ENEM com foco em funções, geometria e estatística.',
    deadline: '2026-09-15',
    dailyHours: 2,
    weeklyDays: 5,
    status: 'em_andamento',
    progress: 62,
    createdAt: '2026-05-20T09:00:00-03:00',
    nextSession: 'Função Afim · Pomodoro 25/5',
  },
  {
    id: 'proj-concurso',
    userId: 'user-victor',
    name: 'Concurso Administrativo',
    type: 'concurso',
    goal: 'Organizar o edital em módulos e fechar lacunas de Direito e Português.',
    deadline: '2026-10-10',
    dailyHours: 3,
    weeklyDays: 6,
    status: 'em_andamento',
    progress: 38,
    createdAt: '2026-04-10T09:00:00-03:00',
    nextSession: 'Organização do Estado · Revisão 20/5',
  },
  {
    id: 'proj-saas',
    userId: 'user-victor',
    name: 'Projeto SaaS EstudaFlow',
    type: 'programacao',
    goal: 'Construir e lançar o MVP do EstudaFlow AI com integrações futuras mapeadas.',
    deadline: '2026-07-30',
    dailyHours: 4,
    weeklyDays: 5,
    status: 'em_andamento',
    progress: 71,
    createdAt: '2026-03-01T09:00:00-03:00',
    nextSession: 'Arquitetura do SaaS · Foco profundo 50/10',
  },
  {
    id: 'proj-apresentacao',
    userId: 'user-victor',
    name: 'Apresentação para gestores',
    type: 'apresentacao',
    goal: 'Preparar apresentação trimestral com dados claros e roteiro objetivo.',
    deadline: '2026-06-28',
    dailyHours: 1,
    weeklyDays: 4,
    status: 'atrasado',
    progress: 45,
    createdAt: '2026-06-10T09:00:00-03:00',
    nextSession: 'Coleta de dados e métricas · Foco leve 15/5',
  },
]

// ---------------------------- Módulos e tópicos -------------------------------

function topic(partial: Omit<Topic, 'priority'> & { priority?: Topic['priority'] }): Topic {
  return { priority: 'media', ...partial }
}

const enemModules: Module[] = [
  {
    id: 'mod-enem-1',
    name: 'Matemática básica',
    order: 1,
    topics: [
      topic({ id: 'top-enem-1-1', projectId: 'proj-enem', moduleId: 'mod-enem-1', name: 'Operações e frações', description: 'Operações fundamentais, MMC, MDC e frações.', status: 'concluido', plannedPomodoros: 4, completedPomodoros: 4, feynmanStatus: 'concluido', feynmanScore: 82 }),
      topic({ id: 'top-enem-1-2', projectId: 'proj-enem', moduleId: 'mod-enem-1', name: 'Razão e proporção', description: 'Razões, proporções e grandezas proporcionais.', status: 'concluido', plannedPomodoros: 3, completedPomodoros: 3, feynmanStatus: 'concluido', feynmanScore: 75 }),
      topic({ id: 'top-enem-1-3', projectId: 'proj-enem', moduleId: 'mod-enem-1', name: 'Porcentagem', description: 'Cálculo de porcentagem e aplicações em problemas do ENEM.', status: 'em_andamento', plannedPomodoros: 3, completedPomodoros: 2, feynmanStatus: 'pendente', feynmanScore: 0, priority: 'alta' }),
    ],
  },
  {
    id: 'mod-enem-2',
    name: 'Funções',
    order: 2,
    topics: [
      topic({ id: 'top-enem-2-1', projectId: 'proj-enem', moduleId: 'mod-enem-2', name: 'Função Afim', description: 'Coeficientes, gráfico e zero da função afim.', status: 'em_andamento', plannedPomodoros: 5, completedPomodoros: 3, feynmanStatus: 'concluido', feynmanScore: 68, priority: 'alta' }),
      topic({ id: 'top-enem-2-2', projectId: 'proj-enem', moduleId: 'mod-enem-2', name: 'Função Quadrática', description: 'Vértice, raízes e concavidade da parábola.', status: 'em_andamento', plannedPomodoros: 5, completedPomodoros: 1, feynmanStatus: 'pendente', feynmanScore: 0, priority: 'alta' }),
      topic({ id: 'top-enem-2-3', projectId: 'proj-enem', moduleId: 'mod-enem-2', name: 'Função Exponencial', description: 'Crescimento exponencial e aplicações.', status: 'nao_iniciado', plannedPomodoros: 4, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-enem-3',
    name: 'Geometria plana',
    order: 3,
    topics: [
      topic({ id: 'top-enem-3-1', projectId: 'proj-enem', moduleId: 'mod-enem-3', name: 'Áreas e perímetros', description: 'Cálculo de área e perímetro das principais figuras.', status: 'nao_iniciado', plannedPomodoros: 4, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
      topic({ id: 'top-enem-3-2', projectId: 'proj-enem', moduleId: 'mod-enem-3', name: 'Semelhança de triângulos', description: 'Critérios de semelhança e proporcionalidade.', status: 'nao_iniciado', plannedPomodoros: 3, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-enem-4',
    name: 'Estatística',
    order: 4,
    topics: [
      topic({ id: 'top-enem-4-1', projectId: 'proj-enem', moduleId: 'mod-enem-4', name: 'Medidas de tendência central', description: 'Média, moda e mediana.', status: 'nao_iniciado', plannedPomodoros: 3, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
      topic({ id: 'top-enem-4-2', projectId: 'proj-enem', moduleId: 'mod-enem-4', name: 'Gráficos e tabelas', description: 'Leitura e interpretação de gráficos.', status: 'nao_iniciado', plannedPomodoros: 2, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-enem-5',
    name: 'Probabilidade',
    order: 5,
    topics: [
      topic({ id: 'top-enem-5-1', projectId: 'proj-enem', moduleId: 'mod-enem-5', name: 'Probabilidade básica', description: 'Espaço amostral e eventos.', status: 'nao_iniciado', plannedPomodoros: 3, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
      topic({ id: 'top-enem-5-2', projectId: 'proj-enem', moduleId: 'mod-enem-5', name: 'Análise combinatória', description: 'Permutações, arranjos e combinações.', status: 'nao_iniciado', plannedPomodoros: 3, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-enem-6',
    name: 'Simulados',
    order: 6,
    topics: [
      topic({ id: 'top-enem-6-1', projectId: 'proj-enem', moduleId: 'mod-enem-6', name: 'Simulado geral 1', description: 'Simulado completo cronometrado.', status: 'nao_iniciado', plannedPomodoros: 2, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
      topic({ id: 'top-enem-6-2', projectId: 'proj-enem', moduleId: 'mod-enem-6', name: 'Simulado geral 2', description: 'Revisão de erros do simulado anterior.', status: 'nao_iniciado', plannedPomodoros: 2, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
]

const concursoModules: Module[] = [
  {
    id: 'mod-concurso-1',
    name: 'Direito Constitucional',
    order: 1,
    topics: [
      topic({ id: 'top-concurso-1-1', projectId: 'proj-concurso', moduleId: 'mod-concurso-1', name: 'Direitos fundamentais', description: 'Direitos e garantias individuais e coletivos.', status: 'concluido', plannedPomodoros: 4, completedPomodoros: 4, feynmanStatus: 'concluido', feynmanScore: 71, priority: 'alta' }),
      topic({ id: 'top-concurso-1-2', projectId: 'proj-concurso', moduleId: 'mod-concurso-1', name: 'Organização do Estado', description: 'União, estados, municípios e competências.', status: 'em_andamento', plannedPomodoros: 4, completedPomodoros: 2, feynmanStatus: 'pendente', feynmanScore: 0, priority: 'alta' }),
    ],
  },
  {
    id: 'mod-concurso-2',
    name: 'Direito Administrativo',
    order: 2,
    topics: [
      topic({ id: 'top-concurso-2-1', projectId: 'proj-concurso', moduleId: 'mod-concurso-2', name: 'Atos administrativos', description: 'Atributos, espécies e invalidação.', status: 'em_andamento', plannedPomodoros: 4, completedPomodoros: 1, feynmanStatus: 'pendente', feynmanScore: 0 }),
      topic({ id: 'top-concurso-2-2', projectId: 'proj-concurso', moduleId: 'mod-concurso-2', name: 'Licitações e contratos', description: 'Modalidades e princípios da Lei 14.133.', status: 'nao_iniciado', plannedPomodoros: 4, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-concurso-3',
    name: 'Português',
    order: 3,
    topics: [
      topic({ id: 'top-concurso-3-1', projectId: 'proj-concurso', moduleId: 'mod-concurso-3', name: 'Interpretação de texto', description: 'Coesão, coerência e inferência textual.', status: 'em_andamento', plannedPomodoros: 3, completedPomodoros: 2, feynmanStatus: 'pendente', feynmanScore: 0 }),
      topic({ id: 'top-concurso-3-2', projectId: 'proj-concurso', moduleId: 'mod-concurso-3', name: 'Concordância e regência', description: 'Regras de concordância verbal e nominal.', status: 'nao_iniciado', plannedPomodoros: 3, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-concurso-4',
    name: 'Raciocínio Lógico',
    order: 4,
    topics: [
      topic({ id: 'top-concurso-4-1', projectId: 'proj-concurso', moduleId: 'mod-concurso-4', name: 'Lógica proposicional', description: 'Proposições, conectivos e tabelas-verdade.', status: 'nao_iniciado', plannedPomodoros: 3, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-concurso-5',
    name: 'Informática',
    order: 5,
    topics: [
      topic({ id: 'top-concurso-5-1', projectId: 'proj-concurso', moduleId: 'mod-concurso-5', name: 'Noções de informática', description: 'Conceitos de hardware, software e segurança.', status: 'nao_iniciado', plannedPomodoros: 2, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-concurso-6',
    name: 'Atualidades',
    order: 6,
    topics: [
      topic({ id: 'top-concurso-6-1', projectId: 'proj-concurso', moduleId: 'mod-concurso-6', name: 'Atualidades e conjuntura', description: 'Temas recentes relevantes para a prova.', status: 'nao_iniciado', plannedPomodoros: 2, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
]

const saasModules: Module[] = [
  {
    id: 'mod-saas-1',
    name: 'Validação da ideia',
    order: 1,
    topics: [
      topic({ id: 'top-saas-1-1', projectId: 'proj-saas', moduleId: 'mod-saas-1', name: 'Pesquisa de público-alvo', description: 'Entrevistas e mapeamento de personas.', status: 'concluido', plannedPomodoros: 2, completedPomodoros: 2, feynmanStatus: 'concluido', feynmanScore: 88 }),
      topic({ id: 'top-saas-1-2', projectId: 'proj-saas', moduleId: 'mod-saas-1', name: 'Análise de concorrentes', description: 'Benchmark de apps de produtividade e estudos.', status: 'concluido', plannedPomodoros: 2, completedPomodoros: 2, feynmanStatus: 'concluido', feynmanScore: 80 }),
    ],
  },
  {
    id: 'mod-saas-2',
    name: 'MVP',
    order: 2,
    topics: [
      topic({ id: 'top-saas-2-1', projectId: 'proj-saas', moduleId: 'mod-saas-2', name: 'Arquitetura do SaaS (agentes e dados)', description: 'Estrutura de agentes de IA e modelo de dados.', status: 'em_andamento', plannedPomodoros: 5, completedPomodoros: 4, feynmanStatus: 'concluido', feynmanScore: 74, priority: 'alta' }),
      topic({ id: 'top-saas-2-2', projectId: 'proj-saas', moduleId: 'mod-saas-2', name: 'Fluxos principais (onboarding, pomodoro, feynman)', description: 'Telas e navegação do produto.', status: 'em_andamento', plannedPomodoros: 5, completedPomodoros: 3, feynmanStatus: 'pendente', feynmanScore: 0, priority: 'alta' }),
    ],
  },
  {
    id: 'mod-saas-3',
    name: 'Landing page',
    order: 3,
    topics: [
      topic({ id: 'top-saas-3-1', projectId: 'proj-saas', moduleId: 'mod-saas-3', name: 'Copy e estrutura de seções', description: 'Hero, benefícios, público-alvo e CTA.', status: 'concluido', plannedPomodoros: 3, completedPomodoros: 3, feynmanStatus: 'concluido', feynmanScore: 79 }),
      topic({ id: 'top-saas-3-2', projectId: 'proj-saas', moduleId: 'mod-saas-3', name: 'Design visual e tema', description: 'Tema escuro, cores neon e microinterações.', status: 'em_andamento', plannedPomodoros: 3, completedPomodoros: 2, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-saas-4',
    name: 'Integração Cakto',
    order: 4,
    topics: [
      topic({ id: 'top-saas-4-1', projectId: 'proj-saas', moduleId: 'mod-saas-4', name: 'Preparar estrutura de planos', description: 'Mapear planos e regras de acesso para checkout futuro.', status: 'nao_iniciado', plannedPomodoros: 2, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-saas-5',
    name: 'Integrações Notion/GitHub',
    order: 5,
    topics: [
      topic({ id: 'top-saas-5-1', projectId: 'proj-saas', moduleId: 'mod-saas-5', name: 'Mapear pontos de integração', description: 'Definir contratos de API para sincronização futura.', status: 'em_andamento', plannedPomodoros: 2, completedPomodoros: 1, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-saas-6',
    name: 'Lançamento',
    order: 6,
    topics: [
      topic({ id: 'top-saas-6-1', projectId: 'proj-saas', moduleId: 'mod-saas-6', name: 'Checklist de lançamento', description: 'QA, performance e revisão final.', status: 'nao_iniciado', plannedPomodoros: 2, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
]

const apresentacaoModules: Module[] = [
  {
    id: 'mod-apresentacao-1',
    name: 'Estrutura da apresentação',
    order: 1,
    topics: [
      topic({ id: 'top-apresentacao-1-1', projectId: 'proj-apresentacao', moduleId: 'mod-apresentacao-1', name: 'Roteiro e storyline', description: 'Sequência lógica de slides e argumentos.', status: 'concluido', plannedPomodoros: 2, completedPomodoros: 2, feynmanStatus: 'concluido', feynmanScore: 65 }),
    ],
  },
  {
    id: 'mod-apresentacao-2',
    name: 'Conteúdo e dados',
    order: 2,
    topics: [
      topic({ id: 'top-apresentacao-2-1', projectId: 'proj-apresentacao', moduleId: 'mod-apresentacao-2', name: 'Coleta de dados e métricas', description: 'Números e indicadores para sustentar a apresentação.', status: 'em_andamento', plannedPomodoros: 3, completedPomodoros: 1, feynmanStatus: 'pendente', feynmanScore: 0, priority: 'alta' }),
    ],
  },
  {
    id: 'mod-apresentacao-3',
    name: 'Design dos slides',
    order: 3,
    topics: [
      topic({ id: 'top-apresentacao-3-1', projectId: 'proj-apresentacao', moduleId: 'mod-apresentacao-3', name: 'Slides e identidade visual', description: 'Template, hierarquia visual e gráficos.', status: 'nao_iniciado', plannedPomodoros: 3, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
  {
    id: 'mod-apresentacao-4',
    name: 'Ensaio e timing',
    order: 4,
    topics: [
      topic({ id: 'top-apresentacao-4-1', projectId: 'proj-apresentacao', moduleId: 'mod-apresentacao-4', name: 'Ensaio com tempo cronometrado', description: 'Praticar a fala e ajustar o tempo de cada bloco.', status: 'nao_iniciado', plannedPomodoros: 2, completedPomodoros: 0, feynmanStatus: 'pendente', feynmanScore: 0 }),
    ],
  },
]

export const DEMO_STUDY_PLANS: StudyPlan[] = [
  {
    id: 'plan-enem',
    projectId: 'proj-enem',
    name: 'Plano ENEM Matemática · 90 dias',
    startDate: '2026-05-20',
    endDate: '2026-09-15',
    estimatedLeadTimeDays: 118,
    progress: 62,
    delaysDays: 0,
    modules: enemModules,
  },
  {
    id: 'plan-concurso',
    projectId: 'proj-concurso',
    name: 'Plano Concurso Administrativo',
    startDate: '2026-04-10',
    endDate: '2026-10-10',
    estimatedLeadTimeDays: 183,
    progress: 38,
    delaysDays: 3,
    modules: concursoModules,
  },
  {
    id: 'plan-saas',
    projectId: 'proj-saas',
    name: 'Plano Projeto SaaS EstudaFlow',
    startDate: '2026-03-01',
    endDate: '2026-07-30',
    estimatedLeadTimeDays: 151,
    progress: 71,
    delaysDays: 0,
    modules: saasModules,
  },
  {
    id: 'plan-apresentacao',
    projectId: 'proj-apresentacao',
    name: 'Plano Apresentação para gestores',
    startDate: '2026-06-10',
    endDate: '2026-06-28',
    estimatedLeadTimeDays: 18,
    progress: 45,
    delaysDays: 2,
    modules: apresentacaoModules,
  },
]

export const ALL_TOPICS: Topic[] = DEMO_STUDY_PLANS.flatMap((plan) => plan.modules.flatMap((m) => m.topics))

export function getTopicById(topicId: string): Topic | undefined {
  return ALL_TOPICS.find((t) => t.id === topicId)
}

export function getProjectById(projectId: string): Project | undefined {
  return DEMO_PROJECTS.find((p) => p.id === projectId)
}

export function getStudyPlanByProjectId(projectId: string): StudyPlan | undefined {
  return DEMO_STUDY_PLANS.find((p) => p.projectId === projectId)
}

// ---------------------------- Sessões Pomodoro (histórico) -------------------

export const DEMO_POMODORO_SESSIONS: PomodoroSession[] = [
  // -6 dias
  { id: 'sess-1', userId: 'user-victor', projectId: 'proj-enem', topicId: 'top-enem-1-1', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 0, startedAt: '2026-06-15T09:00:00-03:00', completedAt: '2026-06-15T09:25:00-03:00' },
  { id: 'sess-2', userId: 'user-victor', projectId: 'proj-enem', topicId: 'top-enem-1-2', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 1, startedAt: '2026-06-15T15:00:00-03:00', completedAt: '2026-06-15T15:25:00-03:00' },
  // -5 dias
  { id: 'sess-3', userId: 'user-victor', projectId: 'proj-enem', topicId: 'top-enem-1-3', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 0, startedAt: '2026-06-16T09:00:00-03:00', completedAt: '2026-06-16T09:25:00-03:00' },
  { id: 'sess-4', userId: 'user-victor', projectId: 'proj-enem', topicId: 'top-enem-1-3', mode: 'leve', focusMinutes: 15, breakMinutes: 5, status: 'concluido', distractions: 2, startedAt: '2026-06-16T14:00:00-03:00', completedAt: '2026-06-16T14:15:00-03:00' },
  { id: 'sess-5', userId: 'user-victor', projectId: 'proj-concurso', topicId: 'top-concurso-1-1', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 0, startedAt: '2026-06-16T19:00:00-03:00', completedAt: '2026-06-16T19:25:00-03:00' },
  // -4 dias
  { id: 'sess-6', userId: 'user-victor', projectId: 'proj-concurso', topicId: 'top-concurso-1-1', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 1, startedAt: '2026-06-17T09:00:00-03:00', completedAt: '2026-06-17T09:25:00-03:00' },
  { id: 'sess-7', userId: 'user-victor', projectId: 'proj-saas', topicId: 'top-saas-1-1', mode: 'profundo', focusMinutes: 50, breakMinutes: 10, status: 'concluido', distractions: 0, startedAt: '2026-06-17T20:00:00-03:00', completedAt: '2026-06-17T20:50:00-03:00' },
  // -3 dias
  { id: 'sess-8', userId: 'user-victor', projectId: 'proj-saas', topicId: 'top-saas-1-2', mode: 'profundo', focusMinutes: 50, breakMinutes: 10, status: 'concluido', distractions: 0, startedAt: '2026-06-18T10:00:00-03:00', completedAt: '2026-06-18T10:50:00-03:00' },
  { id: 'sess-9', userId: 'user-victor', projectId: 'proj-saas', topicId: 'top-saas-1-2', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 1, startedAt: '2026-06-18T18:00:00-03:00', completedAt: '2026-06-18T18:25:00-03:00' },
  { id: 'sess-10', userId: 'user-victor', projectId: 'proj-enem', topicId: 'top-enem-2-1', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 0, startedAt: '2026-06-18T09:00:00-03:00', completedAt: '2026-06-18T09:25:00-03:00' },
  { id: 'sess-11', userId: 'user-victor', projectId: 'proj-enem', topicId: 'top-enem-2-1', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 2, startedAt: '2026-06-18T15:30:00-03:00', completedAt: '2026-06-18T15:55:00-03:00' },
  // -2 dias
  { id: 'sess-12', userId: 'user-victor', projectId: 'proj-concurso', topicId: 'top-concurso-1-2', mode: 'revisao', focusMinutes: 20, breakMinutes: 5, status: 'concluido', distractions: 0, startedAt: '2026-06-19T09:00:00-03:00', completedAt: '2026-06-19T09:20:00-03:00' },
  { id: 'sess-13', userId: 'user-victor', projectId: 'proj-saas', topicId: 'top-saas-2-1', mode: 'profundo', focusMinutes: 50, breakMinutes: 10, status: 'concluido', distractions: 1, startedAt: '2026-06-19T19:00:00-03:00', completedAt: '2026-06-19T19:50:00-03:00' },
  // -1 dia
  { id: 'sess-14', userId: 'user-victor', projectId: 'proj-enem', topicId: 'top-enem-2-1', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 0, startedAt: '2026-06-20T09:00:00-03:00', completedAt: '2026-06-20T09:25:00-03:00' },
  { id: 'sess-15', userId: 'user-victor', projectId: 'proj-saas', topicId: 'top-saas-2-1', mode: 'profundo', focusMinutes: 50, breakMinutes: 10, status: 'concluido', distractions: 0, startedAt: '2026-06-20T16:00:00-03:00', completedAt: '2026-06-20T16:50:00-03:00' },
  { id: 'sess-16', userId: 'user-victor', projectId: 'proj-apresentacao', topicId: 'top-apresentacao-1-1', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 1, startedAt: '2026-06-20T20:00:00-03:00', completedAt: '2026-06-20T20:25:00-03:00' },
  // hoje
  { id: 'sess-17', userId: 'user-victor', projectId: 'proj-enem', topicId: 'top-enem-2-1', mode: 'classico', focusMinutes: 25, breakMinutes: 5, status: 'concluido', distractions: 0, startedAt: '2026-06-21T08:30:00-03:00', completedAt: '2026-06-21T08:55:00-03:00' },
  { id: 'sess-18', userId: 'user-victor', projectId: 'proj-concurso', topicId: 'top-concurso-1-1', mode: 'revisao', focusMinutes: 20, breakMinutes: 5, status: 'concluido', distractions: 0, startedAt: '2026-06-21T10:00:00-03:00', completedAt: '2026-06-21T10:20:00-03:00' },
  { id: 'sess-19', userId: 'user-victor', projectId: 'proj-enem', topicId: 'top-enem-1-2', mode: 'leve', focusMinutes: 15, breakMinutes: 5, status: 'concluido', distractions: 0, startedAt: '2026-06-21T11:00:00-03:00', completedAt: '2026-06-21T11:15:00-03:00' },
  { id: 'sess-20', userId: 'user-victor', projectId: 'proj-saas', topicId: 'top-saas-2-1', mode: 'profundo', focusMinutes: 50, breakMinutes: 10, status: 'em_andamento', distractions: 0, startedAt: '2026-06-21T14:00:00-03:00' },
]

// ---------------------------- Notas -------------------------------------------

export const DEMO_NOTES: Note[] = [
  {
    id: 'note-1',
    userId: 'user-victor',
    projectId: 'proj-enem',
    projectName: 'ENEM 2026 - Matemática',
    topicId: 'top-enem-2-1',
    topicName: 'Função Afim',
    title: 'Resumo de Função Afim',
    content:
      'Função afim: f(x) = ax + b.\n\n- "a" é o coeficiente angular (inclinação da reta).\n- "b" é o coeficiente linear (onde a reta corta o eixo Y).\n- Zero da função: x = -b/a.\n\nExemplo prático: conta de táxi com bandeirada fixa (b) + valor por km rodado (a).\n\nPonto de atenção: ainda confundo a fórmula do zero da função em provas com tempo curto. Preciso treinar mais exercícios cronometrados.',
    tags: ['matemática', 'funções', 'enem'],
    source: 'pomodoro',
    status: 'revisada',
    focusMinutes: 75,
    createdAt: '2026-06-20T09:30:00-03:00',
  },
  {
    id: 'note-2',
    userId: 'user-victor',
    projectId: 'proj-concurso',
    projectName: 'Concurso Administrativo',
    topicId: 'top-concurso-1-1',
    topicName: 'Direitos fundamentais',
    title: 'Lacunas em Direito Constitucional',
    content:
      'Pontos que preciso revisar depois do teste Feynman:\n\n- Diferença entre direitos e garantias fundamentais.\n- Casos de aplicação prática em questões de banca.\n- Hierarquia entre cláusulas pétreas e emendas constitucionais.\n\nProximo passo: refazer o teste Feynman explicando com um exemplo de caso concreto.',
    tags: ['direito', 'constitucional', 'concurso'],
    source: 'feynman',
    status: 'rascunho',
    focusMinutes: 50,
    createdAt: '2026-06-17T10:00:00-03:00',
  },
  {
    id: 'note-3',
    userId: 'user-victor',
    projectId: 'proj-saas',
    projectName: 'Projeto SaaS EstudaFlow',
    topicId: 'top-saas-2-1',
    topicName: 'Arquitetura do SaaS (agentes e dados)',
    title: 'Estrutura de agentes do SaaS',
    content:
      'Mapeamento inicial dos agentes internos do EstudaFlow AI:\n\n1. Orquestrador — decide qual agente acionar.\n2. Diagnóstico — entende objetivo, prazo e nível.\n3. Planejador Taylor — transforma objetivo em módulos e tópicos.\n4. Pomodoro Coach — conduz foco e pausas.\n5. Feynman Tutor — avalia domínio.\n6. Anotações — organiza notas por projeto/tópico.\n7. Integrações — prepara Notion, Obsidian, GitHub, Cakto.\n8. Pesquisa Atualizada — busca dados externos quando necessário.\n9. Anti-Alucinação — evita respostas inventadas.\n10. Linguagem — interpreta gírias e corrige digitação.\n\nTodos simulados no MVP, prontos para receber lógica real depois.',
    tags: ['saas', 'arquitetura', 'agentes-ia'],
    source: 'ia',
    status: 'dominio_validado',
    focusMinutes: 200,
    createdAt: '2026-06-19T11:00:00-03:00',
  },
  {
    id: 'note-4',
    userId: 'user-victor',
    projectId: 'proj-apresentacao',
    projectName: 'Apresentação para gestores',
    topicId: 'top-apresentacao-1-1',
    topicName: 'Roteiro e storyline',
    title: 'Roteiro de apresentação',
    content:
      'Estrutura da apresentação para os gestores:\n\n1. Contexto e problema atual.\n2. O que foi feito no trimestre (com números).\n3. Principais resultados e aprendizados.\n4. Riscos e pontos de atenção.\n5. Próximos passos e pedido claro de decisão.\n\nManter no máximo 12 slides e treinar a fala em voz alta antes da reunião.',
    tags: ['apresentação', 'storytelling', 'gestão'],
    source: 'manual',
    status: 'rascunho',
    focusMinutes: 50,
    createdAt: '2026-06-20T20:30:00-03:00',
  },
  {
    id: 'note-5',
    userId: 'user-victor',
    projectId: 'proj-enem',
    projectName: 'ENEM 2026 - Matemática',
    topicId: 'top-enem-1-3',
    topicName: 'Porcentagem',
    title: 'Checklist de Porcentagem',
    content:
      'Tipos de questão que mais aparecem:\n\n- Aumento e desconto sucessivo.\n- Porcentagem de porcentagem.\n- Problemas com gráficos e tabelas combinados.\n\nFazer lista de 10 exercícios variados antes de marcar como concluído.',
    tags: ['matemática', 'porcentagem'],
    source: 'pomodoro',
    status: 'rascunho',
    focusMinutes: 40,
    createdAt: '2026-06-16T14:20:00-03:00',
  },
  {
    id: 'note-6',
    userId: 'user-victor',
    projectId: 'proj-saas',
    projectName: 'Projeto SaaS EstudaFlow',
    topicId: 'top-saas-3-1',
    topicName: 'Copy e estrutura de seções',
    title: 'Próximos passos da Landing Page',
    content:
      'Seções já definidas: Hero, Como funciona, Benefícios, Público-alvo, Demonstração, Planos, FAQ, CTA final.\n\nFalta: revisar headline principal e validar contraste das cores neon sobre o fundo escuro em mobile.',
    tags: ['saas', 'copy', 'landing-page'],
    source: 'manual',
    status: 'revisada',
    focusMinutes: 75,
    createdAt: '2026-06-14T16:00:00-03:00',
  },
]

// ---------------------------- Testes Feynman ----------------------------------

export const DEMO_FEYNMAN_TESTS: FeynmanTest[] = [
  {
    id: 'feynman-1',
    userId: 'user-victor',
    projectId: 'proj-enem',
    topicId: 'top-enem-2-1',
    userExplanation:
      'Função afim é quando eu tenho uma reta no gráfico. Ela tem um "a" que é o quanto a reta sobe ou desce, e um "b" que é onde ela começa no eixo Y. Por exemplo, numa corrida de app, o "b" seria a taxa fixa e o "a" o valor por km. Pra achar onde a reta cruza o zero eu uso uma fórmula, mas às vezes esqueço ela na prova.',
    aiFeedback:
      'Sua explicação mostra domínio do conceito geral e do exemplo prático, mas a fórmula do zero da função e a aplicação direta em exercícios ainda precisam de reforço.',
    score: 68,
    clarity: 72,
    simplicity: 70,
    strengths: ['Conceito geral', 'Exemplo prático'],
    gaps: ['Fórmula', 'Aplicação em exercício', 'Diferença entre conceito e exemplo'],
    nextSteps: [
      'Fazer 1 Pomodoro de revisão',
      'Resolver 5 questões',
      'Explicar novamente em até 10 linhas',
    ],
    recommendedPomodoros: 1,
    createdAt: '2026-06-20T09:40:00-03:00',
  },
  {
    id: 'feynman-2',
    userId: 'user-victor',
    projectId: 'proj-concurso',
    topicId: 'top-concurso-1-1',
    userExplanation:
      'Direitos fundamentais são os direitos que a Constituição garante pra todo mundo, tipo vida, liberdade e igualdade. Tem também as cláusulas pétreas que não podem ser tiradas nem com emenda. Eu ainda confundo um pouco a diferença entre direito e garantia.',
    aiFeedback:
      'Boa noção geral sobre direitos fundamentais e cláusulas pétreas. A distinção conceitual entre direito e garantia, e exemplos de aplicação em casos concretos, ainda apresentam lacunas.',
    score: 71,
    clarity: 74,
    simplicity: 68,
    strengths: ['Conceito de cláusulas pétreas', 'Noção geral de direitos fundamentais'],
    gaps: ['Diferença entre direito e garantia', 'Casos de aplicação prática'],
    nextSteps: [
      'Revisar diferença entre direito e garantia com exemplos',
      'Resolver 5 questões de banca sobre o tema',
      'Reexplicar com um caso concreto em até 10 linhas',
    ],
    recommendedPomodoros: 1,
    createdAt: '2026-06-17T10:15:00-03:00',
  },
  {
    id: 'feynman-3',
    userId: 'user-victor',
    projectId: 'proj-saas',
    topicId: 'top-saas-2-1',
    userExplanation:
      'A arquitetura do SaaS tem um orquestrador que recebe o pedido do usuário e decide qual agente especialista chamar: planejamento, pomodoro, feynman, anotações ou integrações. Cada agente tem uma função clara e não deve invadir o papel do outro. Isso facilita manter e trocar peças no futuro.',
    aiFeedback:
      'Explicação clara, simples e bem estruturada sobre o papel do orquestrador e a separação de responsabilidades entre agentes. Domínio sólido do conceito central da arquitetura.',
    score: 84,
    clarity: 88,
    simplicity: 85,
    strengths: ['Papel do orquestrador', 'Separação de responsabilidades', 'Visão de manutenção futura'],
    gaps: ['Detalhar como o Agente Anti-Alucinação se conecta aos demais'],
    nextSteps: ['Detalhar o fluxo do Agente Anti-Alucinação em uma próxima revisão'],
    recommendedPomodoros: 0,
    createdAt: '2026-06-19T11:30:00-03:00',
  },
]

// ---------------------------- Integrações -------------------------------------

export const DEMO_INTEGRATIONS: Integration[] = [
  { id: 'integ-notion', userId: 'user-victor', provider: 'notion', status: 'nao_conectado', createdAt: '2026-06-01T00:00:00-03:00' },
  { id: 'integ-obsidian', userId: 'user-victor', provider: 'obsidian', status: 'disponivel', createdAt: '2026-06-01T00:00:00-03:00' },
  { id: 'integ-github', userId: 'user-victor', provider: 'github', status: 'nao_conectado', createdAt: '2026-06-01T00:00:00-03:00' },
  { id: 'integ-cakto', userId: 'user-victor', provider: 'cakto', status: 'configuracao_futura', createdAt: '2026-06-01T00:00:00-03:00' },
  { id: 'integ-calendar', userId: 'user-victor', provider: 'calendar', status: 'em_breve', createdAt: '2026-06-01T00:00:00-03:00' },
]
