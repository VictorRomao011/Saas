import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Timer,
  Brain,
  NotebookPen,
  Plug,
  BarChart3,
  Bot,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/appStore'
import { getMascot } from '@/data/mascots'
import { MascotSpeechBubble } from '@/components/shared/MascotSpeechBubble'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projetos', label: 'Meus Projetos', icon: FolderKanban },
  { to: '/foco', label: 'Sala de Foco', icon: Timer },
  { to: '/feynman', label: 'Teste Feynman', icon: Brain },
  { to: '/anotacoes', label: 'Anotações', icon: NotebookPen },
  { to: '/integracoes', label: 'Integrações', icon: Plug },
  { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
]

const UTILITY_ITEMS = [
  { to: '/agentes', label: 'Agentes de IA', icon: Bot },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
]

interface SidebarProps {
  className?: string
  onNavigate?: () => void
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useAppStore((s) => s.user)
  const logout = useAppStore((s) => s.logout)
  const mascot = getMascot(user?.selectedMascot)

  function isActive(to: string) {
    return location.pathname === to || location.pathname.startsWith(`${to}/`)
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <aside className={cn('flex h-full w-72 flex-col border-r border-sidebar-border bg-sidebar-background', className)}>
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-lg font-bold text-sidebar-foreground">EstudaFlow AI</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 scrollbar-thin">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/15 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25)]'
                  : 'text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}

        <div className="my-3 h-px bg-sidebar-border" />

        {UTILITY_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/15 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25)]'
                  : 'text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {mascot && (
        <div className="px-4 pb-3">
          <MascotSpeechBubble mascot={mascot} size="sm" />
        </div>
      )}

      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-white/5 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  )
}
