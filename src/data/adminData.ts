export interface AdminRecentUser {
  id: string
  name: string
  email: string
  plan: string
  mascot: string
  projects: number
  lastActivity: string
}

export const ADMIN_STATS = {
  totalUsers: 4821,
  totalProjects: 9340,
  totalPomodoroSessions: 58210,
  totalFeynmanTests: 12604,
  avgLatencyMs: 640,
  estimatedAiCostUsd: 318.42,
}

export const MASCOT_POPULARITY = [
  { mascot: 'Froid Coach', value: 42 },
  { mascot: 'Professor Feyn', value: 26 },
  { mascot: 'Gestor Taylor', value: 19 },
  { mascot: 'Capitã Clareza', value: 13 },
]

export const PLAN_USAGE = [
  { plan: 'Free', value: 58 },
  { plan: 'Pro', value: 24 },
  { plan: 'Study Pro', value: 13 },
  { plan: 'Business', value: 5 },
]

export const ADMIN_RECENT_USERS: AdminRecentUser[] = [
  { id: 'u1', name: 'Victor R.', email: 'demo@estudaflow.ai', plan: 'Pro', mascot: 'Froid Coach', projects: 4, lastActivity: 'há 12 minutos' },
  { id: 'u2', name: 'Marina S.', email: 'marina.s@email.com', plan: 'Study Pro', mascot: 'Professor Feyn', projects: 2, lastActivity: 'há 38 minutos' },
  { id: 'u3', name: 'Lucas A.', email: 'lucas.a@email.com', plan: 'Free', mascot: 'Gestor Taylor', projects: 1, lastActivity: 'há 1 hora' },
  { id: 'u4', name: 'Bianca T.', email: 'bianca.t@email.com', plan: 'Business', mascot: 'Capitã Clareza', projects: 5, lastActivity: 'há 2 horas' },
  { id: 'u5', name: 'Pedro H.', email: 'pedro.h@email.com', plan: 'Pro', mascot: 'Froid Coach', projects: 3, lastActivity: 'há 3 horas' },
  { id: 'u6', name: 'Carla M.', email: 'carla.m@email.com', plan: 'Study Pro', mascot: 'Professor Feyn', projects: 2, lastActivity: 'há 5 horas' },
  { id: 'u7', name: 'Diego F.', email: 'diego.f@email.com', plan: 'Free', mascot: 'Capitã Clareza', projects: 1, lastActivity: 'há 1 dia' },
]
