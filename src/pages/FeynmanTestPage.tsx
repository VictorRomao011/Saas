import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Brain } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FeynmanScoreCard } from '@/components/shared/FeynmanScoreCard'
import { MascotSpeechBubble } from '@/components/shared/MascotSpeechBubble'
import { useAppStore } from '@/store/appStore'
import { getMascot } from '@/data/mascots'
import { analyzeFeynmanExplanation, type FeynmanAnalysisResult } from '@/lib/feynmanAnalyzer'

export function FeynmanTestPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const user = useAppStore((s) => s.user)
  const projects = useAppStore((s) => s.projects)
  const studyPlans = useAppStore((s) => s.studyPlans)
  const addFeynmanTest = useAppStore((s) => s.addFeynmanTest)
  const updateTopicProgress = useAppStore((s) => s.updateTopicProgress)

  const mascot = getMascot(user?.selectedMascot)

  const [projectId, setProjectId] = useState(searchParams.get('projectId') ?? '')
  const [topicId, setTopicId] = useState(searchParams.get('topicId') ?? '')
  const [explanation, setExplanation] = useState('')
  const [result, setResult] = useState<FeynmanAnalysisResult | null>(null)

  const availableTopics = useMemo(() => {
    const plan = studyPlans.find((p) => p.projectId === projectId)
    if (!plan) return []
    return plan.modules.flatMap((m) => m.topics)
  }, [studyPlans, projectId])

  const selectedTopic = availableTopics.find((t) => t.id === topicId)

  function handleAnalyze() {
    if (!projectId || !topicId) {
      toast.error('Escolha um projeto e um tópico para testar.')
      return
    }
    if (!explanation.trim()) {
      toast.error('Escreva sua explicação antes de analisar.')
      return
    }

    const analysis = analyzeFeynmanExplanation(selectedTopic?.name ?? 'o tópico', explanation)
    setResult(analysis)
    addFeynmanTest({
      projectId,
      topicId,
      userExplanation: explanation,
      aiFeedback: analysis.aiFeedback,
      score: analysis.score,
      clarity: analysis.clarity,
      simplicity: analysis.simplicity,
      strengths: analysis.strengths,
      gaps: analysis.gaps,
      nextSteps: analysis.nextSteps,
      recommendedPomodoros: analysis.recommendedPomodoros,
    })
    updateTopicProgress(topicId, { feynmanStatus: 'concluido', feynmanScore: analysis.score })
    toast.success('Análise concluída pelo Agente Feynman Tutor (simulado)')
  }

  function handleNewTest() {
    setResult(null)
    setExplanation('')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Teste Feynman</h1>
        <p className="mt-1 text-muted-foreground">
          Explique o tema com suas próprias palavras, como se estivesse ensinando alguém. Isso revela o quanto você
          realmente domina o assunto.
        </p>
      </div>

      {mascot && <MascotSpeechBubble mascot={mascot} />}

      {!result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Escolha o tópico</CardTitle>
            <CardDescription>Selecione o que você quer testar e escreva sua explicação abaixo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Projeto</Label>
                <Select
                  value={projectId}
                  onValueChange={(v) => {
                    setProjectId(v)
                    setTopicId('')
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Tópico</Label>
                <Select value={topicId} onValueChange={setTopicId}>
                  <SelectTrigger disabled={!projectId}>
                    <SelectValue placeholder={projectId ? 'Selecione um tópico' : 'Escolha um projeto primeiro'} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTopics.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="explanation">Sua explicação</Label>
              <Textarea
                id="explanation"
                placeholder="Explique este tópico como se estivesse ensinando um colega que nunca viu o assunto..."
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="min-h-[180px]"
              />
            </div>

            <Button className="w-full" size="lg" onClick={handleAnalyze}>
              <Brain className="h-4 w-4" /> Analisar explicação
            </Button>
          </CardContent>
        </Card>
      )}

      {result && (
        <>
          <FeynmanScoreCard
            score={result.score}
            clarity={result.clarity}
            simplicity={result.simplicity}
            strengths={result.strengths}
            gaps={result.gaps}
            nextSteps={result.nextSteps}
            recommendedPomodoros={result.recommendedPomodoros}
            onGenerateReview={() => navigate(`/foco?projectId=${projectId}&topicId=${topicId}&mode=revisao`)}
          />
          <Button variant="outline" className="w-full" onClick={handleNewTest}>
            Fazer novo teste
          </Button>
        </>
      )}
    </div>
  )
}
