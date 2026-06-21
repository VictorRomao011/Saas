import type { Mascot } from '@/types'

// Dados estáticos dos mascotes. avatarGradient define o visual placeholder
// (ilustração real entra depois via área de configuração do admin).
export const MASCOTS: Mascot[] = [
  {
    id: 'froid',
    name: 'Froid Coach',
    title: 'O motivador de ritmo',
    description:
      'Rapper motivacional, direto e descontraído. Ideal para quem precisa de energia, ritmo e uma cobrança leve para não desistir.',
    style: 'motivador',
    avatarGradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    voiceEnabled: false,
    color: 'purple',
    samplePhrases: [
      'Bora menino, bora homi, bora todo mundo. Hoje é foco no bloco.',
      'Não precisa vencer o mundo agora. Fecha esse Pomodoro comigo.',
      'Se você consegue explicar simples, você entendeu de verdade.',
      'Respira na pausa, mas não some. A gente volta já.',
      'Menos bagunça, mais ritmo. Bora organizar esse plano.',
    ],
  },
  {
    id: 'feyn',
    name: 'Professor Feyn',
    title: 'O analista calmo',
    description:
      'Calmo, didático e analítico. Ideal para quem quer entender profundamente e explicar qualquer assunto com clareza.',
    style: 'detalhado',
    avatarGradient: 'from-sky-400 via-cyan-400 to-blue-500',
    voiceEnabled: false,
    color: 'blue',
    samplePhrases: [
      'Explique com suas palavras. Simplicidade revela domínio.',
      'Vamos encontrar as lacunas antes da prova encontrar por você.',
      'Todo conceito complexo nasce de partes simples. Vamos por partes.',
      'Dúvida não é fraqueza, é onde o estudo realmente começa.',
    ],
  },
  {
    id: 'taylor',
    name: 'Gestor Taylor',
    title: 'O organizador de prazos',
    description:
      'Organizador, produtivo e focado em prazos. Ideal para projetos, entregas, apresentações e rotina profissional.',
    style: 'direto',
    avatarGradient: 'from-emerald-400 via-green-500 to-teal-500',
    voiceEnabled: false,
    color: 'green',
    samplePhrases: [
      'Todo objetivo precisa virar processo.',
      'Vamos quebrar isso em etapas, prazos e entregáveis.',
      'Prazo sem etapa é só ansiedade. Vamos estruturar.',
      'Entregável claro hoje evita correria amanhã.',
    ],
  },
  {
    id: 'clareza',
    name: 'Capitã Clareza',
    title: 'A guardiã da organização',
    description:
      'Objetiva, visual e prática. Ideal para quem se perde em muitas anotações e precisa organizar ideias.',
    style: 'calmo',
    avatarGradient: 'from-amber-300 via-yellow-400 to-orange-400',
    voiceEnabled: false,
    color: 'gold',
    samplePhrases: [
      'Vamos limpar a bagunça e transformar isso em estrutura.',
      'Uma nota clara hoje evita confusão amanhã.',
      'Cada ideia merece um lugar certo para morar.',
      'Organizar é só decidir o que importa primeiro.',
    ],
  },
]

export function getMascot(id: string | null | undefined): Mascot | undefined {
  return MASCOTS.find((m) => m.id === id)
}

export function randomPhrase(mascot: Mascot | undefined): string {
  if (!mascot) return 'Vamos organizar seus estudos hoje.'
  return mascot.samplePhrases[Math.floor(Math.random() * mascot.samplePhrases.length)]
}
