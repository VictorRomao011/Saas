// Simulação do "Agente Feynman Tutor".
// Em produção, este módulo enviaria a explicação do usuário para um modelo de IA real
// (com instruções do Agente Anti-Alucinação) e retornaria uma avaliação genuína.
// Aqui aplicamos uma heurística simples baseada em tamanho/estrutura do texto para
// que a demonstração pareça viva e responda de forma consistente ao que foi digitado.

export interface FeynmanAnalysisResult {
  score: number
  clarity: number
  simplicity: number
  strengths: string[]
  gaps: string[]
  nextSteps: string[]
  recommendedPomodoros: number
  aiFeedback: string
}

const GENERIC_STRENGTHS = ['Conceito geral', 'Estrutura da explicação', 'Uso de exemplo prático', 'Sequência lógica das ideias']
const GENERIC_GAPS = ['Fórmula ou definição formal', 'Aplicação em exercício', 'Diferença entre conceito e exemplo', 'Casos de exceção']

export function analyzeFeynmanExplanation(topicName: string, explanation: string): FeynmanAnalysisResult {
  const trimmed = explanation.trim()
  const wordCount = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length
  const hasExample = /exemplo|por exemplo|tipo|como/i.test(trimmed)
  const sentenceCount = trimmed.split(/[.!?]/).filter((s) => s.trim().length > 3).length

  if (wordCount < 12) {
    return {
      score: 18,
      clarity: 20,
      simplicity: 25,
      strengths: [],
      gaps: ['Explicação muito curta para avaliar domínio real', 'Falta desenvolver o raciocínio completo'],
      nextSteps: ['Escreva pelo menos 5 a 8 linhas explicando o tema', 'Inclua um exemplo prático', 'Tente novamente o Teste Feynman'],
      recommendedPomodoros: 2,
      aiFeedback: `Sua explicação sobre "${topicName}" foi breve demais para uma avaliação confiável. Tente detalhar o raciocínio como se estivesse ensinando alguém que nunca viu o assunto.`,
    }
  }

  let score = 40 + Math.min(35, wordCount / 4) + (hasExample ? 10 : 0) + Math.min(10, sentenceCount * 2)
  score = Math.max(30, Math.min(96, Math.round(score)))

  const clarity = Math.max(25, Math.min(98, Math.round(score + (hasExample ? 4 : -4))))
  const simplicity = Math.max(25, Math.min(98, Math.round(score + (sentenceCount >= 3 ? 2 : -6))))

  const strengthsCount = score > 75 ? 3 : score > 55 ? 2 : 1
  const gapsCount = score > 75 ? 1 : score > 55 ? 2 : 3

  const strengths = GENERIC_STRENGTHS.slice(0, strengthsCount)
  const gaps = GENERIC_GAPS.slice(0, gapsCount)

  const recommendedPomodoros = score > 80 ? 0 : score > 60 ? 1 : 2

  const nextSteps = [
    recommendedPomodoros > 0 ? `Fazer ${recommendedPomodoros} Pomodoro${recommendedPomodoros > 1 ? 's' : ''} de revisão` : 'Manter o tópico em revisão espaçada',
    'Resolver algumas questões práticas sobre o tema',
    'Explicar novamente em até 10 linhas, focando nas lacunas apontadas',
  ]

  const feedback =
    score > 80
      ? `Excelente! Sua explicação sobre "${topicName}" está clara, simples e bem estruturada. Isso indica domínio real do assunto.`
      : score > 55
        ? `Você já entende a base de "${topicName}", mas ainda há pontos a aprofundar antes de considerar o domínio completo.`
        : `Sua explicação sobre "${topicName}" mostra que o entendimento ainda está superficial. Vale revisar o conteúdo antes de tentar explicar novamente.`

  return { score, clarity, simplicity, strengths, gaps, nextSteps, recommendedPomodoros, aiFeedback: feedback }
}
