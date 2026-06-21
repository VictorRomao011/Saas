// Tipos centrais do EstudaFlow AI.
// Espelham o schema de banco de dados descrito no planejamento do produto.
// Em produção, estas interfaces correspondem a tabelas reais (Postgres/Supabase).
// Por ora, todo o app roda com dados simulados (ver src/data/mockData.ts).

export type MascotId = 'froid' | 'feyn' | 'taylor' | 'clareza'

export type PlanId = 'free' | 'pro' | 'study_pro' | 'business'

export type UsageType =
  | 'concurso'
  | 'enem'
  | 'faculdade'
  | 'projeto_profissional'
  | 'projeto_programacao'
  | 'apresentacao'
  | 'nova_habilidade'
  | 'outro'

export type CommunicationStyle = 'motivador' | 'calmo' | 'direto' | 'detalhado'

export interface User {
  id: string
  name: string
  email: string
  language: 'pt-BR' | 'en-US' | 'es-ES'
  usageType: UsageType
  selectedMascot: MascotId | null
  plan: PlanId
  createdAt: string
  onboardingCompleted: boolean
}

export type ProjectType =
  | 'concurso'
  | 'enem'
  | 'faculdade'
  | 'profissional'
  | 'programacao'
  | 'apresentacao'
  | 'habilidade'
  | 'outro'

export type ProjectStatus = 'nao_iniciado' | 'em_andamento' | 'atrasado' | 'concluido'

export interface Project {
  id: string
  userId: string
  name: string
  type: ProjectType
  goal: string
  deadline: string
  dailyHours: number
  weeklyDays: number
  status: ProjectStatus
  progress: number
  createdAt: string
  nextSession?: string
}

export interface StudyPlan {
  id: string
  projectId: string
  name: string
  startDate: string
  endDate: string
  estimatedLeadTimeDays: number
  progress: number
  delaysDays: number
  modules: Module[]
}

export interface Module {
  id: string
  name: string
  order: number
  topics: Topic[]
}

export type TopicStatus = 'nao_iniciado' | 'em_andamento' | 'concluido'
export type FeynmanStatus = 'pendente' | 'concluido'

export interface Topic {
  id: string
  projectId: string
  moduleId: string
  name: string
  description: string
  priority: 'baixa' | 'media' | 'alta'
  status: TopicStatus
  plannedPomodoros: number
  completedPomodoros: number
  feynmanStatus: FeynmanStatus
  feynmanScore: number // 0-100
}

export type PomodoroMode = 'classico' | 'leve' | 'profundo' | 'revisao'
export type SessionStatus = 'em_andamento' | 'pausado' | 'concluido' | 'cancelado'

export interface PomodoroSession {
  id: string
  userId: string
  projectId: string
  topicId: string
  mode: PomodoroMode
  focusMinutes: number
  breakMinutes: number
  status: SessionStatus
  distractions: number
  startedAt: string
  completedAt?: string
}

export type NoteSource = 'pomodoro' | 'feynman' | 'manual' | 'ia'
export type NoteStatus = 'rascunho' | 'revisada' | 'dominio_validado'

export interface Note {
  id: string
  userId: string
  projectId: string
  projectName: string
  topicId: string
  topicName: string
  title: string
  content: string
  tags: string[]
  source: NoteSource
  status: NoteStatus
  focusMinutes: number
  createdAt: string
}

export interface FeynmanTest {
  id: string
  userId: string
  projectId: string
  topicId: string
  userExplanation: string
  aiFeedback: string
  score: number // 0-100
  clarity: number // 0-100
  simplicity: number // 0-100
  strengths: string[]
  gaps: string[]
  nextSteps: string[]
  recommendedPomodoros: number
  createdAt: string
}

export type IntegrationProvider = 'notion' | 'obsidian' | 'github' | 'cakto' | 'calendar'
export type IntegrationStatus = 'nao_conectado' | 'disponivel' | 'conectado' | 'em_breve' | 'configuracao_futura'

export interface Integration {
  id: string
  userId: string
  provider: IntegrationProvider
  status: IntegrationStatus
  createdAt: string
}

export interface Mascot {
  id: MascotId
  name: string
  title: string
  description: string
  style: CommunicationStyle
  avatarGradient: string
  voiceEnabled: boolean
  samplePhrases: string[]
  color: 'purple' | 'blue' | 'green' | 'gold'
}

export type AgentName =
  | 'orquestrador'
  | 'diagnostico'
  | 'planejador_taylor'
  | 'pomodoro_coach'
  | 'feynman_tutor'
  | 'anotacoes'
  | 'integracoes'
  | 'pesquisa_atualizada'
  | 'anti_alucinacao'
  | 'linguagem'

export interface AgentLog {
  id: string
  userId: string
  agentName: AgentName
  inputSummary: string
  outputSummary: string
  latencyMs: number
  estimatedCostUsd: number
  createdAt: string
}

export interface AgentDefinition {
  id: AgentName
  name: string
  function: string
  icon: string
  status: 'ativo' | 'simulado'
}

export interface OnboardingData {
  category: UsageType
  hasPlan: 'importar' | 'sugerir_ia' | 'bagunçado'
  goalText: string
  startDate: string
  endDate: string
  dailyHours: number
  weeklyDays: number
  level: 'iniciante' | 'intermediario' | 'avancado' | 'nao_sei'
  style: PomodoroMode | 'ia_decide'
}

export interface PomodoroSettings {
  focusMinutes: number
  shortBreakMinutes: number
  longBreakMinutes: number
  cyclesBeforeLongBreak: number
}

export interface AiSettings {
  helpLevel: 'basico' | 'padrao' | 'avancado'
  responseLength: 'curta' | 'detalhada'
  allowWebSearch: boolean
  restrictScope: boolean
}

export interface MascotSettings {
  voiceVolume: number
  motivationalPhrasesEnabled: boolean
  communicationStyle: CommunicationStyle
}
