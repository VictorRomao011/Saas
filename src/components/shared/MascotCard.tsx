import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MascotAvatar } from './MascotAvatar'
import type { Mascot } from '@/types'

interface MascotCardProps {
  mascot: Mascot
  selected?: boolean
  onSelect: () => void
}

const RING_BY_COLOR: Record<Mascot['color'], string> = {
  purple: 'hover:border-primary/50 data-[selected=true]:border-primary',
  blue: 'hover:border-accent/50 data-[selected=true]:border-accent',
  green: 'hover:border-success/50 data-[selected=true]:border-success',
  gold: 'hover:border-warning/50 data-[selected=true]:border-warning',
}

export function MascotCard({ mascot, selected = false, onSelect }: MascotCardProps) {
  return (
    <Card
      data-selected={selected}
      className={cn(
        'group relative flex flex-col items-center gap-4 border-2 border-border p-6 text-center transition-all duration-300 hover:-translate-y-1',
        RING_BY_COLOR[mascot.color],
        selected && 'shadow-glow',
      )}
    >
      {selected && (
        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
      <MascotAvatar mascot={mascot} size="lg" animated />
      <div className="space-y-1">
        <h3 className="font-display text-lg font-semibold">{mascot.name}</h3>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{mascot.title}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{mascot.description}</p>
      <blockquote className="rounded-xl bg-secondary/40 px-3 py-2 text-xs italic text-foreground/80">
        “{mascot.samplePhrases[0]}”
      </blockquote>
      <Button
        variant={selected ? 'default' : 'outline'}
        className="mt-auto w-full"
        onClick={onSelect}
      >
        {selected ? 'Escolhido' : 'Escolher'}
      </Button>
    </Card>
  )
}
