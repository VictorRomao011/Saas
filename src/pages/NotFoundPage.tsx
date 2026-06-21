import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="font-display text-3xl font-bold">Página não encontrada</h1>
      <p className="max-w-md text-muted-foreground">
        O caminho que você tentou acessar não existe ou foi movido. Vamos te levar de volta para um lugar conhecido.
      </p>
      <Button asChild>
        <Link to="/">Voltar para o início</Link>
      </Button>
    </div>
  )
}
