import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  BookOpen,
  Landmark,
  Briefcase,
  Code2,
  Presentation,
  Lightbulb,
  Sparkles,
  FolderDown,
  Wand2,
  Shuffle,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { OnboardingStep } from '@/components/shared/OnboardingStep'
import { useAppStore } from '@/store/appStore'
import type { OnboardingData, UsageType, PomodoroMode } from '@/types'

const TOTAL_STEPS = 6

const CATEGORY_OPTIONS: { value: UsageType; label: string; icon: typeof GraduationCap }[] = [
  { value: 'concurso', label: 'Concurso público', icon: Landmark },
  { value: 'enem', label: 'ENEM', icon: GraduationCap },
  { value: 'faculdade', label: 'Faculdade', icon: BookOpen },
  { value: 'projeto_profissional', label: 'Projeto profissional', icon: Briefcase },
  { value: 'projeto_programacao', label: 'Projeto de programação', icon: Code2 },
  { value: 'apresentacao', label: 'Apresentação', icon: Presentation },
  { value: 'nova_habilidade', label: 'Nova habilidade', icon: Lightbulb },
  { value: 'outro', label: 'Outro objetivo', icon: Sparkles },
]

const HAS_PLAN_OPTIONS: { value: OnboardingData['hasPlan']; label: string; description: string; icon: typeof FolderDown }[] = [
  { value: 'importar', label: 'Já tenho um plano', description: 'Quero organizar o que já tenho.', icon: FolderDown },
  { value: 'sugerir_ia', label: 'Quero que a IA sugira', description: 'Monte um plano completo para mim.', icon: Wand2 },
  { value: 'bagunçado', label: 'Tenho um pouco de tudo', description: 'Está bagunçado, precisa organizar.', icon: Shuffle },
]

const LEVEL_OPTIONS: { value: OnboardingData['level']; label: string }[] = [
  { value: 'iniciante', label: 'Iniciante' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' },
  { value: 'nao_sei', label: 'Não sei dizer' },
]

const STYLE_OPTIONS: { value: OnboardingData['style']; label: string; description: string }[] = [
  { value: 'classico', label: 'Clássico 25/5', description: '25 min de foco, 5 min de pausa.' },
  { value: 'leve', label: 'Foco leve 15/5', description: 'Sessões curtas, ideal para começar.' },
  { value: 'profundo', label: 'Foco profundo 50/10', description: 'Sessões longas para tarefas complexas.' },
  { value: 'revisao', label: 'Revisão 20/5', description: 'Ideal para repassar conteúdo já estudado.' },
  { value: 'ia_decide', label: 'Deixar a IA decidir', description: 'A IA escolhe com base no seu objetivo.' },
]

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const today = new Date()

export function OnboardingPage() {
  const navigate = useNavigate()
  const completeOnboarding = useAppStore((s) => s.completeOnboarding)

  const [step, setStep] = useState(1)
  const [data, setData] = useState<Partial<OnboardingData>>({
    startDate: addDays(today, 0),
    endDate: addDays(today, 90),
    dailyHours: 2,
    weeklyDays: 5,
  })

  function patch(updates: Partial<OnboardingData>) {
    setData((prev) => ({ ...prev, ...updates }))
  }

  function handleFinish() {
    const finalData = data as OnboardingData
    const projectId = completeOnboarding(finalData)
    if (projectId) {
      navigate(`/plano/${projectId}`)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="w-full">
      {step === 1 && (
        <OnboardingStep
          stepNumber={1}
          totalSteps={TOTAL_STEPS}
          title="Qual é o seu objetivo?"
          subtitle="Isso ajuda a IA a montar o tipo certo de plano para você."
          onNext={() => setStep(2)}
          nextDisabled={!data.category}
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => patch({ category: opt.value })}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border-2 border-border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40',
                  data.category === opt.value && 'border-primary shadow-glow',
                )}
              >
                <opt.icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium leading-snug">{opt.label}</span>
              </button>
            ))}
          </div>
        </OnboardingStep>
      )}

      {step === 2 && (
        <OnboardingStep
          stepNumber={2}
          totalSteps={TOTAL_STEPS}
          title="Você já tem um plano de estudos ou projeto?"
          subtitle="Não tem problema se estiver bagunçado — a IA ajuda a organizar."
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
          nextDisabled={!data.hasPlan}
        >
          <div className="space-y-3">
            {HAS_PLAN_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => patch({ hasPlan: opt.value })}
                className={cn(
                  'flex w-full items-center gap-4 rounded-xl border-2 border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40',
                  data.hasPlan === opt.value && 'border-primary shadow-glow',
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <opt.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.description}</p>
                </div>
              </button>
            ))}
          </div>
        </OnboardingStep>
      )}

      {step === 3 && (
        <OnboardingStep
          stepNumber={3}
          totalSteps={TOTAL_STEPS}
          title="Descreva seu objetivo e o prazo"
          subtitle="Quanto mais específico, melhor a IA consegue organizar seu plano."
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
          nextDisabled={!data.goalText?.trim() || !data.startDate || !data.endDate}
        >
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="goal">Seu objetivo</Label>
              <Textarea
                id="goal"
                placeholder="Ex: Passar no concurso da prefeitura, focando em Direito e Português."
                value={data.goalText ?? ''}
                onChange={(e) => patch({ goalText: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="start-date">Início</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={data.startDate ?? ''}
                  onChange={(e) => patch({ startDate: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="end-date">Prazo final</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={data.endDate ?? ''}
                  onChange={(e) => patch({ endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </OnboardingStep>
      )}

      {step === 4 && (
        <OnboardingStep
          stepNumber={4}
          totalSteps={TOTAL_STEPS}
          title="Qual sua disponibilidade?"
          subtitle="Vamos ajustar o plano ao tempo que você realmente tem."
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        >
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Horas de estudo por dia</Label>
                <span className="font-display text-lg font-semibold text-primary">{data.dailyHours}h</span>
              </div>
              <Slider
                value={[data.dailyHours ?? 2]}
                min={1}
                max={8}
                step={1}
                onValueChange={([v]) => patch({ dailyHours: v })}
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Dias por semana</Label>
                <span className="font-display text-lg font-semibold text-primary">{data.weeklyDays} dias</span>
              </div>
              <Slider
                value={[data.weeklyDays ?? 5]}
                min={1}
                max={7}
                step={1}
                onValueChange={([v]) => patch({ weeklyDays: v })}
              />
            </div>
          </div>
        </OnboardingStep>
      )}

      {step === 5 && (
        <OnboardingStep
          stepNumber={5}
          totalSteps={TOTAL_STEPS}
          title="Qual seu nível atual no assunto?"
          subtitle="Isso ajuda a calibrar a dificuldade dos tópicos sugeridos."
          onBack={() => setStep(4)}
          onNext={() => setStep(6)}
          nextDisabled={!data.level}
        >
          <div className="grid grid-cols-2 gap-3">
            {LEVEL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => patch({ level: opt.value })}
                className={cn(
                  'rounded-xl border-2 border-border bg-card p-4 text-center text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40',
                  data.level === opt.value && 'border-primary shadow-glow',
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </OnboardingStep>
      )}

      {step === 6 && (
        <OnboardingStep
          stepNumber={6}
          totalSteps={TOTAL_STEPS}
          title="Qual estilo de Pomodoro prefere?"
          subtitle="Você pode ajustar isso depois em Configurações."
          onBack={() => setStep(5)}
          onNext={handleFinish}
          nextLabel="Gerar meu plano com IA"
          nextDisabled={!data.style}
        >
          <div className="space-y-3">
            {STYLE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => patch({ style: opt.value as PomodoroMode | 'ia_decide' })}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl border-2 border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40',
                  data.style === opt.value && 'border-primary shadow-glow',
                )}
              >
                <div>
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.description}</p>
                </div>
              </button>
            ))}
          </div>
        </OnboardingStep>
      )}
    </div>
  )
}
