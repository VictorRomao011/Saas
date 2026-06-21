import { Link, Outlet } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export function OnboardingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 py-6 sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">EstudaFlow AI</span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
        <Outlet />
      </main>
    </div>
  )
}
