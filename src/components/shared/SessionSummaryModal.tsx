import { CheckCircle2, NotebookPen, Brain, RotateCcw, ArrowRight } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SessionSummaryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topicName: string
  focusMinutes: number
  distractions: number
  onAddNote?: () => void
  onStartFeynman?: () => void
  onStartAnother?: () => void
  onFinish?: () => void
}

export function SessionSummaryModal({
  open,
  onOpenChange,
  topicName,
  focusMinutes,
  distractions,
  onAddNote,
  onStartFeynman,
  onStartAnother,
  onFinish,
}: SessionSummaryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <DialogTitle className="text-center">Sessão concluída!</DialogTitle>
          <DialogDescription className="text-center">
            Você focou em <span className="font-medium text-foreground">{topicName}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-6 rounded-xl bg-secondary/40 p-4">
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-foreground">{focusMinutes}min</p>
            <p className="text-xs text-muted-foreground">Tempo focado</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-foreground">{distractions}</p>
            <p className="text-xs text-muted-foreground">Distrações</p>
          </div>
        </div>

        <div className="flex justify-center">
          {distractions === 0 ? (
            <Badge variant="success">Foco impecável nessa sessão</Badge>
          ) : (
            <Badge variant="outline">Ainda bom! Vamos reduzir distrações na próxima</Badge>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
          {onAddNote && (
            <Button variant="outline" onClick={onAddNote}>
              <NotebookPen className="h-4 w-4" /> Adicionar nota
            </Button>
          )}
          {onStartFeynman && (
            <Button variant="outline" onClick={onStartFeynman}>
              <Brain className="h-4 w-4" /> Teste Feynman
            </Button>
          )}
        </div>

        <DialogFooter>
          {onStartAnother && (
            <Button variant="ghost" onClick={onStartAnother}>
              <RotateCcw className="h-4 w-4" /> Outra sessão
            </Button>
          )}
          {onFinish && (
            <Button onClick={onFinish}>
              Finalizar <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
