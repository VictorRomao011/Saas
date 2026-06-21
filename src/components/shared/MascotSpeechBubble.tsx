import { useEffect, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { MascotAvatar } from './MascotAvatar'
import type { Mascot } from '@/types'
import { randomPhrase } from '@/data/mascots'
import { Button } from '@/components/ui/button'

interface MascotSpeechBubbleProps {
  mascot: Mascot
  phrase?: string
  size?: 'sm' | 'md' | 'lg'
  showVoicePreview?: boolean
  className?: string
}

export function MascotSpeechBubble({ mascot, phrase, size = 'md', showVoicePreview = false, className }: MascotSpeechBubbleProps) {
  const [currentPhrase, setCurrentPhrase] = useState(phrase ?? randomPhrase(mascot))

  useEffect(() => {
    if (phrase) setCurrentPhrase(phrase)
  }, [phrase])

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <MascotAvatar mascot={mascot} size={size === 'lg' ? 'lg' : 'md'} animated />
      <div className="relative flex-1 rounded-2xl rounded-tl-sm border border-white/10 bg-secondary/50 px-4 py-3 glass-panel">
        <span className="absolute -left-1.5 top-4 h-3 w-3 rotate-45 bg-secondary/50 border-l border-b border-white/10" />
        <p className="text-sm font-medium leading-relaxed text-foreground">{currentPhrase}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{mascot.name}</span>
          {showVoicePreview && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 gap-1 px-2 text-xs text-muted-foreground"
              onClick={() =>
                toast.info('Prévia de voz autorizada', {
                  description: 'Áudio real chega quando os assets licenciados forem enviados pelo admin. Por enquanto, apenas texto.',
                })
              }
            >
              <Volume2 className="h-3 w-3" />
              Prévia de voz autorizada
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
