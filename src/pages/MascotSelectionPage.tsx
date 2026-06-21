import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { MascotCard } from '@/components/shared/MascotCard'
import { MASCOTS } from '@/data/mascots'
import { useAppStore } from '@/store/appStore'
import type { MascotId } from '@/types'

export function MascotSelectionPage() {
  const navigate = useNavigate()
  const user = useAppStore((s) => s.user)
  const selectMascot = useAppStore((s) => s.selectMascot)
  const [selected, setSelected] = useState<MascotId | null>(user?.selectedMascot ?? null)

  function handleContinue() {
    if (!selected) return
    selectMascot(selected)
    navigate('/onboarding')
  }

  return (
    <div className="w-full max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Escolha seu mascote</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Ele vai te acompanhar nas sessões de foco, nos testes Feynman e nas recomendações. Você pode trocar depois
          em Configurações.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MASCOTS.map((mascot) => (
          <MascotCard
            key={mascot.id}
            mascot={mascot}
            selected={selected === mascot.id}
            onSelect={() => setSelected(mascot.id)}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button size="lg" disabled={!selected} onClick={handleContinue}>
          Continuar <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
