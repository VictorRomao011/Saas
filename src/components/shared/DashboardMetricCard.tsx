import type { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface DashboardMetricCardProps {
  label: string
  value: string
  icon: LucideIcon
  trend?: string
  accent?: 'purple' | 'blue' | 'green' | 'gold'
  className?: string
}

const ACCENT_MAP: Record<string, string> = {
  purple: 'from-primary/20 to-primary/5 text-primary',
  blue: 'from-accent/20 to-accent/5 text-accent',
  green: 'from-success/20 to-success/5 text-success',
  gold: 'from-warning/20 to-warning/5 text-warning',
}

export function DashboardMetricCard({ label, value, icon: Icon, trend, accent = 'purple', className }: DashboardMetricCardProps) {
  return (
    <Card className={cn('relative overflow-hidden transition-all duration-300 hover:-translate-y-1', className)}>
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-60', ACCENT_MAP[accent])} />
      <CardContent className="relative space-y-3 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl bg-white/5', ACCENT_MAP[accent].split(' ').pop())}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold">{value}</span>
          {trend && <span className="text-xs text-success">{trend}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
