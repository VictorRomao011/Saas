import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type {
  User,
  Project,
  StudyPlan,
  Note,
  FeynmanTest,
  PomodoroSession,
  Integration,
  IntegrationProvider,
  IntegrationStatus,
  MascotId,
  OnboardingData,
  PomodoroSettings,
  AiSettings,
  MascotSettings,
  TopicStatus,
  FeynmanStatus,
  PlanId,
} from '@/types'
import {
  DEMO_USER,
  DEMO_PROJECTS,
  DEMO_STUDY_PLANS,
  DEMO_POMODORO_SESSIONS,
  DEMO_NOTES,
  DEMO_FEYNMAN_TESTS,
  DEMO_INTEGRATIONS,
} from '@/data/mockData'
import { generateModulesFromOnboarding, estimateLeadTimeDays } from '@/lib/planGenerator'

interface RegisteredAccount {
  password: string
  user: User
}

interface AppState {
  isAuthenticated: boolean
  user: User | null
  registeredAccounts: Record<string, RegisteredAccount>

  projects: Project[]
  studyPlans: StudyPlan[]
  notes: Note[]
  feynmanTests: FeynmanTest[]
  pomodoroSessions: PomodoroSession[]
  integrations: Integration[]

  pomodoroSettings: PomodoroSettings
  aiSettings: AiSettings
  mascotSettings: MascotSettings

  // Auth
  loginDemo: () => void
  loginSocialMock: (provider: 'google' | 'github') => void
  login: (email: string, password: string) => { success: boolean; message: string }
  signup: (name: string, email: string, password: string) => { success: boolean; message: string }
  logout: () => void

  // Onboarding / mascote
  selectMascot: (mascotId: MascotId) => void
  completeOnboarding: (data: OnboardingData) => string

  // Projetos / planos
  reorganizePlanWithAI: (projectId: string) => void

  // Tópicos
  updateTopicProgress: (
    topicId: string,
    patch: Partial<{ status: TopicStatus; completedPomodoros: number; feynmanStatus: FeynmanStatus; feynmanScore: number }>,
  ) => void

  // Pomodoro
  startPomodoroSession: (session: Omit<PomodoroSession, 'id' | 'userId' | 'status'>) => string
  completePomodoroSession: (sessionId: string, distractions: number) => void

  // Notas
  addNote: (note: Omit<Note, 'id' | 'userId' | 'createdAt'>) => void
  updateNote: (noteId: string, patch: Partial<Note>) => void
  deleteNote: (noteId: string) => void

  // Feynman
  addFeynmanTest: (test: Omit<FeynmanTest, 'id' | 'userId' | 'createdAt'>) => void

  // Integrações
  setIntegrationStatus: (provider: IntegrationProvider, status: IntegrationStatus) => void

  // Perfil / preferências
  updateUserProfile: (patch: Partial<User>) => void
  updatePomodoroSettings: (patch: Partial<PomodoroSettings>) => void
  updateAiSettings: (patch: Partial<AiSettings>) => void
  updateMascotSettings: (patch: Partial<MascotSettings>) => void
  setPlan: (plan: PlanId) => void

  // Dados / conta
  clearHistory: () => void
  resetDemoData: () => void
}

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const initialIntegrations = DEMO_INTEGRATIONS

const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
}

const DEFAULT_AI_SETTINGS: AiSettings = {
  helpLevel: 'padrao',
  responseLength: 'detalhada',
  allowWebSearch: true,
  restrictScope: true,
}

const DEFAULT_MASCOT_SETTINGS: MascotSettings = {
  voiceVolume: 70,
  motivationalPhrasesEnabled: true,
  communicationStyle: 'motivador',
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      registeredAccounts: {
        [DEMO_USER.email]: { password: 'demo123', user: DEMO_USER },
      },

      projects: DEMO_PROJECTS,
      studyPlans: DEMO_STUDY_PLANS,
      notes: DEMO_NOTES,
      feynmanTests: DEMO_FEYNMAN_TESTS,
      pomodoroSessions: DEMO_POMODORO_SESSIONS,
      integrations: initialIntegrations,

      pomodoroSettings: DEFAULT_POMODORO_SETTINGS,
      aiSettings: DEFAULT_AI_SETTINGS,
      mascotSettings: DEFAULT_MASCOT_SETTINGS,

      loginDemo: () => {
        set({ isAuthenticated: true, user: DEMO_USER })
      },

      loginSocialMock: (_provider) => {
        // Placeholder: login social real (Google/GitHub OAuth) entra aqui no futuro.
        set({ isAuthenticated: true, user: DEMO_USER })
      },

      login: (email, password) => {
        const account = get().registeredAccounts[email.trim().toLowerCase()]
        if (!account) {
          return { success: false, message: 'Não encontramos uma conta com este e-mail. Que tal se cadastrar?' }
        }
        if (account.password !== password) {
          return { success: false, message: 'Senha incorreta. Tente novamente.' }
        }
        set({ isAuthenticated: true, user: account.user })
        return { success: true, message: 'Login realizado com sucesso.' }
      },

      signup: (name, email, password) => {
        const normalizedEmail = email.trim().toLowerCase()
        if (get().registeredAccounts[normalizedEmail]) {
          return { success: false, message: 'Já existe uma conta com este e-mail. Faça login.' }
        }
        const newUser: User = {
          id: uid('user'),
          name: name.trim() || 'Novo usuário',
          email: normalizedEmail,
          language: 'pt-BR',
          usageType: 'outro',
          selectedMascot: null,
          plan: 'free',
          createdAt: new Date().toISOString(),
          onboardingCompleted: false,
        }
        set((state) => ({
          registeredAccounts: {
            ...state.registeredAccounts,
            [normalizedEmail]: { password, user: newUser },
          },
          isAuthenticated: true,
          user: newUser,
          // Conta nova começa sem projetos/notas para demonstrar o fluxo do zero.
          projects: [],
          studyPlans: [],
          notes: [],
          feynmanTests: [],
          pomodoroSessions: [],
        }))
        return { success: true, message: 'Conta criada com sucesso.' }
      },

      logout: () => set({ isAuthenticated: false, user: null }),

      selectMascot: (mascotId) => {
        set((state) => {
          if (!state.user) return state
          const updatedUser = { ...state.user, selectedMascot: mascotId }
          return {
            user: updatedUser,
            registeredAccounts: {
              ...state.registeredAccounts,
              [updatedUser.email]: { password: state.registeredAccounts[updatedUser.email]?.password ?? '', user: updatedUser },
            },
          }
        })
      },

      completeOnboarding: (data) => {
        const state = get()
        if (!state.user) return ''

        const projectId = uid('proj')
        const typeMap: Record<string, Project['type']> = {
          concurso: 'concurso',
          enem: 'enem',
          faculdade: 'faculdade',
          projeto_profissional: 'profissional',
          projeto_programacao: 'programacao',
          apresentacao: 'apresentacao',
          nova_habilidade: 'habilidade',
          outro: 'outro',
        }

        const categoryLabels: Record<string, string> = {
          concurso: 'Concurso',
          enem: 'ENEM',
          faculdade: 'Faculdade',
          projeto_profissional: 'Projeto profissional',
          projeto_programacao: 'Projeto de programação',
          apresentacao: 'Apresentação',
          nova_habilidade: 'Nova habilidade',
          outro: 'Objetivo',
        }

        const newProject: Project = {
          id: projectId,
          userId: state.user.id,
          name: `${categoryLabels[data.category] ?? 'Objetivo'} · ${data.goalText.slice(0, 32) || 'Plano gerado por IA'}`,
          type: typeMap[data.category] ?? 'outro',
          goal: data.goalText || 'Objetivo definido durante o onboarding.',
          deadline: data.endDate,
          dailyHours: data.dailyHours,
          weeklyDays: data.weeklyDays,
          status: 'nao_iniciado',
          progress: 0,
          createdAt: new Date().toISOString(),
          nextSession: 'Primeira sessão sugerida pela IA',
        }

        const modules = generateModulesFromOnboarding(data, projectId)
        const newPlan: StudyPlan = {
          id: uid('plan'),
          projectId,
          name: `Plano gerado por IA · ${newProject.name}`,
          startDate: data.startDate,
          endDate: data.endDate,
          estimatedLeadTimeDays: estimateLeadTimeDays(data.startDate, data.endDate),
          progress: 0,
          delaysDays: 0,
          modules,
        }

        const updatedUser: User = { ...state.user, onboardingCompleted: true, usageType: data.category }

        set((s) => ({
          projects: [...s.projects, newProject],
          studyPlans: [...s.studyPlans, newPlan],
          user: updatedUser,
          registeredAccounts: {
            ...s.registeredAccounts,
            [updatedUser.email]: { password: s.registeredAccounts[updatedUser.email]?.password ?? '', user: updatedUser },
          },
        }))

        return projectId
      },

      reorganizePlanWithAI: (projectId) => {
        set((state) => ({
          studyPlans: state.studyPlans.map((plan) => {
            if (plan.projectId !== projectId) return plan
            const reorderedModules = plan.modules.map((mod) => ({
              ...mod,
              topics: [...mod.topics].sort((a, b) => {
                const order = { alta: 0, media: 1, baixa: 2 }
                if (a.status !== b.status) {
                  const statusOrder = { em_andamento: 0, nao_iniciado: 1, concluido: 2 }
                  return statusOrder[a.status] - statusOrder[b.status]
                }
                return order[a.priority] - order[b.priority]
              }),
            }))
            return { ...plan, modules: reorderedModules }
          }),
        }))
      },

      updateTopicProgress: (topicId, patch) => {
        set((state) => ({
          studyPlans: state.studyPlans.map((plan) => ({
            ...plan,
            modules: plan.modules.map((mod) => ({
              ...mod,
              topics: mod.topics.map((t) => (t.id === topicId ? { ...t, ...patch } : t)),
            })),
          })),
        }))
      },

      startPomodoroSession: (session) => {
        const state = get()
        if (!state.user) return ''
        const id = uid('sess')
        const newSession: PomodoroSession = {
          ...session,
          id,
          userId: state.user.id,
          status: 'em_andamento',
        }
        set((s) => ({ pomodoroSessions: [...s.pomodoroSessions, newSession] }))
        return id
      },

      completePomodoroSession: (sessionId, distractions) => {
        set((state) => ({
          pomodoroSessions: state.pomodoroSessions.map((s) =>
            s.id === sessionId
              ? { ...s, status: 'concluido', distractions, completedAt: new Date().toISOString() }
              : s,
          ),
        }))
      },

      addNote: (note) => {
        const state = get()
        if (!state.user) return
        const newNote: Note = { ...note, id: uid('note'), userId: state.user.id, createdAt: new Date().toISOString() }
        set((s) => ({ notes: [newNote, ...s.notes] }))
      },

      updateNote: (noteId, patch) => {
        set((state) => ({ notes: state.notes.map((n) => (n.id === noteId ? { ...n, ...patch } : n)) }))
      },

      deleteNote: (noteId) => {
        set((state) => ({ notes: state.notes.filter((n) => n.id !== noteId) }))
      },

      addFeynmanTest: (test) => {
        const state = get()
        if (!state.user) return
        const newTest: FeynmanTest = { ...test, id: uid('feynman'), userId: state.user.id, createdAt: new Date().toISOString() }
        set((s) => ({ feynmanTests: [newTest, ...s.feynmanTests] }))
      },

      setIntegrationStatus: (provider, status) => {
        set((state) => ({
          integrations: state.integrations.map((i) => (i.provider === provider ? { ...i, status } : i)),
        }))
      },

      updateUserProfile: (patch) => {
        set((state) => {
          if (!state.user) return state
          const updatedUser = { ...state.user, ...patch }
          return {
            user: updatedUser,
            registeredAccounts: {
              ...state.registeredAccounts,
              [updatedUser.email]: { password: state.registeredAccounts[updatedUser.email]?.password ?? '', user: updatedUser },
            },
          }
        })
      },

      updatePomodoroSettings: (patch) => set((state) => ({ pomodoroSettings: { ...state.pomodoroSettings, ...patch } })),
      updateAiSettings: (patch) => set((state) => ({ aiSettings: { ...state.aiSettings, ...patch } })),
      updateMascotSettings: (patch) => set((state) => ({ mascotSettings: { ...state.mascotSettings, ...patch } })),
      setPlan: (plan) => get().updateUserProfile({ plan }),

      clearHistory: () => set({ notes: [], feynmanTests: [], pomodoroSessions: [] }),

      resetDemoData: () => {
        set({
          user: DEMO_USER,
          isAuthenticated: true,
          projects: DEMO_PROJECTS,
          studyPlans: DEMO_STUDY_PLANS,
          notes: DEMO_NOTES,
          feynmanTests: DEMO_FEYNMAN_TESTS,
          pomodoroSessions: DEMO_POMODORO_SESSIONS,
          integrations: initialIntegrations,
          pomodoroSettings: DEFAULT_POMODORO_SETTINGS,
          aiSettings: DEFAULT_AI_SETTINGS,
          mascotSettings: DEFAULT_MASCOT_SETTINGS,
        })
      },
    }),
    {
      name: 'estudaflow-storage',
    },
  ),
)
