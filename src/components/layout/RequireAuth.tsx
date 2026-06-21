import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppStore } from '@/store/appStore'

export function RequireAuth() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated)
  const user = useAppStore((s) => s.user)
  const location = useLocation()

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  if (!user.selectedMascot) {
    return <Navigate to="/escolha-mascote" replace />
  }
  if (!user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />
  }
  return <Outlet />
}
