import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Plus, Timer, ChevronDown, User as UserIcon, Settings, LogOut } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/appStore'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from './Sidebar'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

interface TopbarProps {
  className?: string
}

export function Topbar({ className }: TopbarProps) {
  const navigate = useNavigate()
  const user = useAppStore((s) => s.user)
  const logout = useAppStore((s) => s.logout)
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header
      className={cn(
        'flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-4 backdrop-blur-xl sm:px-6',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <Sidebar onNavigate={() => setMobileOpen(false)} className="border-r-0" />
          </SheetContent>
        </Sheet>
        <div>
          <p className="text-xs text-muted-foreground">
            {greeting()}, {user?.name?.split(' ')[0] ?? 'estudante'}
          </p>
          <h2 className="font-display text-lg font-semibold text-foreground">Vamos continuar de onde você parou</h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => navigate('/onboarding')}>
          <Plus className="h-4 w-4" /> Novo projeto
        </Button>
        <Button size="sm" className="hidden sm:flex" onClick={() => navigate('/foco')}>
          <Timer className="h-4 w-4" /> Nova sessão
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 transition-colors hover:bg-white/5">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user ? initials(user.name) : 'EF'}</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
              <UserIcon className="h-4 w-4" /> Meu perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
              <Settings className="h-4 w-4" /> Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
