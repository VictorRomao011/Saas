import { useState } from 'react'
import { X, Plus, Save } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface NoteEditorProps {
  initialTitle?: string
  initialContent?: string
  initialTags?: string[]
  onSave: (data: { title: string; content: string; tags: string[] }) => void
  onCancel?: () => void
  className?: string
}

export function NoteEditor({
  initialTitle = '',
  initialContent = '',
  initialTags = [],
  onSave,
  onCancel,
  className,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [tags, setTags] = useState<string[]>(initialTags)
  const [tagInput, setTagInput] = useState('')

  function addTag() {
    const value = tagInput.trim().toLowerCase()
    if (value && !tags.includes(value)) {
      setTags([...tags, value])
    }
    setTagInput('')
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-base">{initialTitle ? 'Editar nota' : 'Nova nota'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Título da nota" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea
          placeholder="Escreva sua anotação..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[160px]"
        />

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="gap-1">
                {tag}
                <button onClick={() => removeTag(tag)} aria-label={`Remover tag ${tag}`}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Adicionar tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addTag()
                }
              }}
              className="h-9"
            />
            <Button type="button" variant="outline" size="sm" onClick={addTag}>
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button onClick={() => onSave({ title: title.trim() || 'Nota sem título', content, tags })} disabled={!content.trim()}>
            <Save className="h-4 w-4" /> Salvar nota
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
