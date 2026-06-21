import type { ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ProgressCardProps {
  title: string
  description?: string
  progress: number
  footer?: ReactNode
  className?: string
}

export function ProgressCard({ title, description, progress, footer, className }: ProgressCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Progress value={progress} className="flex-1" />
          <span className="ml-3 font-display text-sm font-semibold text-foreground">{progress}%</span>
        </div>
        {footer}
      </CardContent>
    </Card>
  )
}
