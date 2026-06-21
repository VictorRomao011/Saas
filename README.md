# EstudaFlow AI

**Prévia funcional de um SaaS de organização de estudos e projetos**, combinando Técnica Pomodoro, Técnica de Feynman, planejamento com IA, anotações automáticas e um painel de progresso — com mascotes animados como companheiros de estudo.

> ⚠️ **Isto é uma prévia de produto com dados simulados.** Não há backend real, banco de dados ou integrações de fato com Notion, Obsidian, GitHub ou Cakto. Todo o "estado" da aplicação vive no navegador (Zustand + `localStorage`) e é resetado a qualquer momento. Os "Agentes de IA" exibidos no app são simulados — não chamam nenhum modelo de linguagem real nesta versão.

## Para quem é

Estudantes, concurseiros, vestibulandos/ENEM, profissionais em capacitação e criadores de conteúdo educacional que precisam organizar projetos de estudo, manter ritmo de foco e revisar conteúdo de forma mais eficiente.

## Funcionalidades

- **Landing page + planos** — apresentação do produto e página de preços (`/`, `/planos`), sem cobrança real.
- **Login / cadastro simulados** — fluxo de autenticação local, incluindo login social "simulado" (`/login`, `/cadastro`).
- **Onboarding com escolha de mascote** — diagnóstico inicial de objetivo, prazo e tipo de uso, seguido da escolha de um companheiro animado (`/escolha-mascote`, `/onboarding`).
- **Dashboard** — visão geral de progresso, projetos ativos e próxima ação recomendada (`/dashboard`).
- **Projetos e plano de estudos** — criação de projetos (estudo, concurso, programação, etc.) com plano gerado e reorganizável "por IA" (`/projetos`, `/plano/:projectId`).
- **Sala de foco (Pomodoro)** — timer de foco com pausas e resumo de sessão (`/foco`).
- **Teste de Feynman** — avaliação simulada de quão bem o usuário consegue explicar um tópico com linguagem simples (`/feynman`).
- **Anotações** — editor de notas organizadas por projeto/tópico (`/anotacoes`).
- **Integrações** — pré-visualização de exportação para Notion, Obsidian, GitHub e Cakto (preparado para o futuro, nada é enviado de fato) (`/integracoes`).
- **Relatórios** — gráficos de evolução e desempenho (`/relatorios`).
- **Agentes de IA** — painel interno mostrando a arquitetura de 10 agentes especialistas simulados (orquestrador, planejador, pomodoro coach, tutor Feynman, anti-alucinação, etc.) e seus logs (`/agentes`).
- **Configurações** — preferências de conta e do mascote (`/configuracoes`).
- **Painel administrativo** — visão interna de usuários, planos e métricas agregadas, acessível por URL direta (`/admin`).

### Princípios de segurança e confiança (aplicados em todo o produto)

- Nunca promete aprovação em concurso/vestibular nem cura para falta de foco — apenas linguagem como "ajuda a organizar", "ajuda a manter o ritmo", "facilita a revisão".
- Nunca inventa dados externos: informações que exigiriam consulta em tempo real são sinalizadas como "necessita pesquisa".
- Não substitui professores, médicos, psicólogos ou advogados.
- Dados de projetos e usuários diferentes nunca se misturam.
- Mascotes não usam voz ou imagem reais sem assets licenciados — o botão de voz é apenas um placeholder ("Prévia de voz autorizada"), sem áudio real.

## Stack técnica

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** (sobre **Radix UI**), tema escuro com acentos roxo/azul-neon/verde
- **React Router DOM** para navegação entre as rotas
- **Zustand** (`persist`) como "backend" simulado em `localStorage`
- **Recharts** para os gráficos de relatórios
- **Framer Motion** para animações
- **Sonner** para notificações (toasts)

## Como executar localmente

Requer Node.js 18+.

```bash
npm install      # instala as dependências
npm run dev      # inicia o servidor de desenvolvimento (Vite)
```

Acesse `http://localhost:5173`.

Outros comandos disponíveis:

```bash
npm run build    # type-check (tsc -b) + build de produção
npm run preview  # serve o build de produção localmente
npm run lint     # roda o ESLint
```

### Login de demonstração

Na tela de login, use:

- **E-mail:** `demo@estudaflow.ai`
- **Senha:** `demo123`

Também é possível criar uma conta nova pela tela de cadastro — os dados ficam apenas no `localStorage` do navegador.

## Estrutura do projeto

```
src/
├── pages/              # Uma página por rota (Landing, Dashboard, Plano, Foco, Feynman, ...)
├── components/
│   ├── layout/         # Sidebar, Topbar, layouts (público, onboarding, dashboard) e guards de rota
│   ├── shared/          # Componentes de domínio (ProjectCard, PomodoroTimer, MascotAvatar, ...)
│   └── ui/              # Primitivos shadcn/ui (button, card, dialog, tabs, ...)
├── store/
│   └── appStore.ts      # Estado global (Zustand) — usuário, projetos, planos, notas, agentes...
├── data/                # Dados simulados (mock data) — usuários, mascotes, agentes, planos, preços
├── lib/                 # Lógica auxiliar (geração de plano, análise de respostas Feynman, utils)
└── types/               # Tipos TypeScript compartilhados (User, Project, StudyPlan, ...)
```

## Status do projeto

Esta é uma prévia de produto (MVP visual/funcional), pensada para validar fluxo e experiência antes de qualquer integração real com backend, IA ou serviços de terceiros.
