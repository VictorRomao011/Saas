import type { AgentDefinition, AgentLog } from '@/types'

// Estrutura preparada para agentes de IA internos.
// No MVP todos os agentes operam em modo simulado (respostas pré-definidas ou geradas
// localmente). A arquitetura já separa responsabilidades para que, no futuro, cada
// agente possa ser conectado a um modelo real (ex: Claude) com seu próprio prompt e ferramentas.
export const AGENTS: AgentDefinition[] = [
  {
    id: 'orquestrador',
    name: 'Orquestrador',
    function: 'Entende o pedido do usuário e decide qual agente especialista deve ser acionado.',
    icon: 'Workflow',
    status: 'simulado',
  },
  {
    id: 'diagnostico',
    name: 'Agente de Diagnóstico',
    function: 'Entende objetivo, prazo, dificuldade, carga horária e tipo de uso durante o onboarding.',
    icon: 'Stethoscope',
    status: 'simulado',
  },
  {
    id: 'planejador_taylor',
    name: 'Agente Planejador Taylor',
    function: 'Transforma objetivos em etapas, prazos, módulos, tópicos e sessões.',
    icon: 'ListTree',
    status: 'simulado',
  },
  {
    id: 'pomodoro_coach',
    name: 'Agente Pomodoro Coach',
    function: 'Controla foco, pausas, distrações e ritmo durante as sessões.',
    icon: 'TimerIcon',
    status: 'simulado',
  },
  {
    id: 'feynman_tutor',
    name: 'Agente Feynman Tutor',
    function: 'Avalia se o usuário consegue explicar o conteúdo de forma simples e aponta lacunas.',
    icon: 'GraduationCap',
    status: 'simulado',
  },
  {
    id: 'anotacoes',
    name: 'Agente de Anotações',
    function: 'Organiza notas por projeto, tópico, data, sessão e status.',
    icon: 'NotebookPen',
    status: 'simulado',
  },
  {
    id: 'integracoes',
    name: 'Agente de Integrações',
    function: 'Prepara envio de dados para Notion, Obsidian, GitHub e Cakto.',
    icon: 'Plug',
    status: 'simulado',
  },
  {
    id: 'pesquisa_atualizada',
    name: 'Agente de Pesquisa Atualizada',
    function: 'Busca informações externas apenas quando necessário (editais, datas, documentação técnica).',
    icon: 'Search',
    status: 'simulado',
  },
  {
    id: 'anti_alucinacao',
    name: 'Agente Anti-Alucinação',
    function: 'Impede respostas inventadas, exige fonte quando necessário e avisa quando não há certeza.',
    icon: 'ShieldCheck',
    status: 'simulado',
  },
  {
    id: 'linguagem',
    name: 'Agente de Linguagem',
    function: 'Corrige digitação, interpreta gírias e linguagem regional sem constranger o usuário.',
    icon: 'Languages',
    status: 'simulado',
  },
]

export const DEMO_AGENT_LOGS: AgentLog[] = [
  { id: 'log-1', userId: 'user-victor', agentName: 'orquestrador', inputSummary: 'Usuário pediu para reorganizar o plano de Matemática', outputSummary: 'Acionou o Agente Planejador Taylor', latencyMs: 320, estimatedCostUsd: 0.004, createdAt: '2026-06-21T08:00:00-03:00' },
  { id: 'log-2', userId: 'user-victor', agentName: 'planejador_taylor', inputSummary: 'Reorganizar módulos de Função Quadrática e Geometria', outputSummary: 'Plano reordenado priorizando tópicos com prazo mais próximo', latencyMs: 980, estimatedCostUsd: 0.021, createdAt: '2026-06-21T08:00:02-03:00' },
  { id: 'log-3', userId: 'user-victor', agentName: 'feynman_tutor', inputSummary: 'Explicação sobre Função Afim enviada para avaliação', outputSummary: 'Domínio 68%, lacunas em fórmula e aplicação prática', latencyMs: 1240, estimatedCostUsd: 0.018, createdAt: '2026-06-20T09:40:00-03:00' },
  { id: 'log-4', userId: 'user-victor', agentName: 'pomodoro_coach', inputSummary: 'Sessão de foco profundo iniciada em Arquitetura do SaaS', outputSummary: 'Sugeriu pausa de 10 min após 50 minutos de foco', latencyMs: 210, estimatedCostUsd: 0.002, createdAt: '2026-06-21T14:00:00-03:00' },
  { id: 'log-5', userId: 'user-victor', agentName: 'anotacoes', inputSummary: 'Nova nota criada após sessão de Direitos fundamentais', outputSummary: 'Nota categorizada em Concurso Administrativo / Direito Constitucional', latencyMs: 150, estimatedCostUsd: 0.001, createdAt: '2026-06-17T10:00:00-03:00' },
  { id: 'log-6', userId: 'user-victor', agentName: 'anti_alucinacao', inputSummary: 'Resposta sobre data de edital de concurso', outputSummary: 'Marcado como "necessita pesquisa" por envolver dado externo variável', latencyMs: 90, estimatedCostUsd: 0.001, createdAt: '2026-06-16T19:30:00-03:00' },
  { id: 'log-7', userId: 'user-victor', agentName: 'integracoes', inputSummary: 'Usuário clicou em preparar exportação para Obsidian', outputSummary: 'Gerou pré-visualização de exportação em Markdown', latencyMs: 410, estimatedCostUsd: 0.003, createdAt: '2026-06-15T11:00:00-03:00' },
  { id: 'log-8', userId: 'user-victor', agentName: 'diagnostico', inputSummary: 'Onboarding: objetivo "organizar projeto SaaS"', outputSummary: 'Identificado tipo de uso profissional/programação, prazo de 150 dias', latencyMs: 540, estimatedCostUsd: 0.007, createdAt: '2026-03-01T09:01:00-03:00' },
]
