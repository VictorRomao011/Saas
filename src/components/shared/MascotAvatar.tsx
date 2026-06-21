import { cn } from '@/lib/utils'
import type { Mascot } from '@/types'

const INITIAL_ICON: Record<Mascot['id'], string> = {
  froid: '🎤',
  feyn: '🧪',
  taylor: '📋',
  clareza: '✨',
}

interface MascotAvatarProps {
  mascot: Mascot
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  className?: string
}

const SIZE_MAP = {
  sm: 'h-10 w-10 text-lg',
  md: 'h-16 w-16 text-2xl',
  lg: 'h-24 w-24 text-4xl',
  xl: 'h-36 w-36 text-6xl',
}

// Placeholder visual do mascote. Quando os assets oficiais (imagem/voz licenciada)
// forem enviados pelo admin, este componente passa a renderizar a imagem real.
export function MascotAvatar({ mascot, size = 'md', animated = false, className }: MascotAvatarProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full bg-gradient-to-br shadow-glow shrink-0',
        mascot.avatarGradient,
        SIZE_MAP[size],
        animated && 'animate-float',
        className,
      )}
    >
      <span className="drop-shadow-lg" role="img" aria-label={mascot.name}>
        {INITIAL_ICON[mascot.id]}
      </span>
      <span className="absolute inset-0 rounded-full ring-2 ring-white/20" />
    </div>
  )
}
