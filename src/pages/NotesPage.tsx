import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Brain, FileEdit, NotebookPen, Pencil, Plus, Search, Sparkles, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NoteEditor } from '@/components/shared/NoteEditor'
import { useAppStore } from '@/store/appStore'
import type { NoteSource, NoteStatus } from '@/types'

const SOURCE_ICON: Record<NoteSource, typeof NotebookPen> = {
  pomodoro: NotebookPen,
  feynman: Brain,
  manual: FileEdit,
  ia: Sparkles,
}

const SOURCE_LABEL: Record<NoteSource, string> = {
  pomodoro: 'Sessão Pomodoro',
  feynman: 'Teste Feynman',
  manual: 'Manual',
  ia: 'Gerada por IA',
}

const STATUS_BADGE: Record<NoteStatus, { label: string; variant: 'outline' | 'accent' | 'success' }> = {
  rascunho: { label: 'Rascunho', variant: 'outline' },
  revisada: { label: 'Revisada', variant: 'accent' },
  dominio_validado: { label: 'Domínio validado', variant: 'success' },
}

export function NotesPage() {
  const [searchParams] = useSearchParams()
  const notes = useAppStore((s) => s.notes)
  const addNote = useAppStore((s) => s.addNote)
  const updateNote = useAppStore((s) => s.updateNote)
  const deleteNote = useAppStore((s) => s.deleteNote)
  const projects = useAppStore((s) => s.projects)
  const studyPlans = useAppStore((s) => s.studyPlans)

  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  const prefillProjectId = searchParams.get('projectId') ?? ''
  const prefillTopicId = searchParams.get('topicId') ?? ''

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return notes
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some((t) => t.includes(q)),
    )
  }, [notes, query])

  const editingNote = notes.find((n) => n.id === editingId)

  function findTopicMeta(projectId: string, topicId: string) {
    const project = projects.find((p) => p.id === projectId)
    const plan = studyPlans.find((p) => p.projectId === projectId)
    const topic = plan?.modules.flatMap((m) => m.topics).find((t) => t.id === topicId)
    return { project, topic }
  }

  function handleCreate(data: { title: string; content: string; tags: string[] }) {
    const { project, topic } = findTopicMeta(prefillProjectId, prefillTopicId)
    addNote({
      projectId: project?.id ?? prefillProjectId ?? 'sem-projeto',
      projectName: project?.name ?? 'Nota geral',
      topicId: topic?.id ?? prefillTopicId ?? 'sem-topico',
      topicName: topic?.name ?? 'Anotação livre',
      title: data.title,
      content: data.content,
      tags: data.tags,
      source: 'manual',
      status: 'rascunho',
      focusMinutes: 0,
    })
    toast.success('Nota criada')
    setCreating(false)
  }

  function handleUpdate(data: { title: string; content: string; tags: string[] }) {
    if (!editingId) return
    updateNote(editingId, data)
    toast.success('Nota atualizada')
    setEditingId(null)
  }

  function handleDelete(noteId: string) {
    deleteNote(noteId)
    toast.success('Nota excluída')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Central de Anotações</h1>
          <p className="mt-1 text-muted-foreground">Tudo o que você escreveu nas sessões, testes e manualmente.</p>
        </div>
        {!creating && !editingId && (
          <Button onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" /> Nova nota
          </Button>
        )}
      </div>

      {creating && <NoteEditor onSave={handleCreate} onCancel={() => setCreating(false)} />}

      {editingNote && (
        <NoteEditor
          initialTitle={editingNote.title}
          initialContent={editingNote.content}
          initialTags={editingNote.tags}
          onSave={handleUpdate}
          onCancel={() => setEditingId(null)}
        />
      )}

      {!creating && !editingId && (
        <>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, conteúdo ou tag..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((note) => {
                const SourceIcon = SOURCE_ICON[note.source]
                const status = STATUS_BADGE[note.status]
                return (
                  <Card key={note.id} className="flex flex-col">
                    <CardContent className="flex flex-1 flex-col gap-3 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <SourceIcon className="h-3.5 w-3.5" />
                          {SOURCE_LABEL[note.source]}
                        </div>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <div>
                        <h3 className="font-display text-base font-semibold leading-snug">{note.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {note.projectName} · {note.topicName}
                        </p>
                      </div>
                      <p className="line-clamp-4 flex-1 text-sm text-muted-foreground">{note.content}</p>
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {note.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingId(note.id)}
                            aria-label="Editar nota"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(note.id)}
                            aria-label="Excluir nota"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border py-16 text-center">
              <p className="text-muted-foreground">Nenhuma nota encontrada.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
