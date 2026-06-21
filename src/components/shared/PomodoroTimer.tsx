import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PomodoroTimerProps {
  label: string
  secondsLeft: number
  totalSeconds: number
  isRunning: boolean
  onTogglePlay: () => void
  onReset: () => void
  onSkip?: () => void
  className?: string
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const RADIUS = 130
const STROKE = 14
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function PomodoroTimer({
  label,
  secondsLeft,
  totalSeconds,
  isRunning,
  onTogglePlay,
  onReset,
  onSkip,
  className,
}: PomodoroTimerProps) {
  const progress = totalSeconds > 0 ? (totalSeconds - secondsLeft) / totalSeconds : 0
  const offset = CIRCUMFERENCE * (1 - progress)

  return (
    <div className={cn('flex flex-col items-center gap-8', className)}>
      <div className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 300 300">
          <defs>
            <linearGradient id="pomodoro-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          <circle cx="150" cy="150" r={RADIUS} fill="none" stroke="hsl(var(--secondary))" strokeWidth={STROKE} />
          <circle
            cx="150"
            cy="150"
            r={RADIUS}
            fill="none"
            stroke="url(#pomodoro-gradient)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)] transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
          <span className="font-display text-6xl font-bold tabular-nums text-foreground">{formatTime(secondsLeft)}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onReset} aria-label="Reiniciar">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button size="lg" onClick={onTogglePlay} className="h-16 w-16 rounded-full p-0" aria-label={isRunning ? 'Pausar' : 'Iniciar'}>
          {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        {onSkip && (
          <Button variant="outline" size="icon" onClick={onSkip} aria-label="Pular">
            <SkipForward className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
