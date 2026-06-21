import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import { PublicLayout } from '@/components/layout/PublicLayout'
import { OnboardingLayout } from '@/components/layout/OnboardingLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { RequireAuth } from '@/components/layout/RequireAuth'
import { RequireAuthOnly } from '@/components/layout/RequireAuthOnly'

import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { PricingPage } from '@/pages/PricingPage'
import { MascotSelectionPage } from '@/pages/MascotSelectionPage'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { StudyPlanPage } from '@/pages/StudyPlanPage'
import { FocusRoomPage } from '@/pages/FocusRoomPage'
import { FeynmanTestPage } from '@/pages/FeynmanTestPage'
import { NotesPage } from '@/pages/NotesPage'
import { IntegrationsPage } from '@/pages/IntegrationsPage'
import { ReportsPage } from '@/pages/ReportsPage'
import { AgentsPage } from '@/pages/AgentsPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { AdminPage } from '@/pages/AdminPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Toaster theme="dark" position="top-right" richColors />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<SignupPage />} />
          <Route path="/planos" element={<PricingPage />} />
        </Route>

        <Route element={<RequireAuthOnly />}>
          <Route element={<OnboardingLayout />}>
            <Route path="/escolha-mascote" element={<MascotSelectionPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projetos" element={<ProjectsPage />} />
            <Route path="/plano/:projectId" element={<StudyPlanPage />} />
            <Route path="/foco" element={<FocusRoomPage />} />
            <Route path="/feynman" element={<FeynmanTestPage />} />
            <Route path="/anotacoes" element={<NotesPage />} />
            <Route path="/integracoes" element={<IntegrationsPage />} />
            <Route path="/relatorios" element={<ReportsPage />} />
            <Route path="/agentes" element={<AgentsPage />} />
            <Route path="/configuracoes" element={<SettingsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
