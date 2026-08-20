/**
 * project.ts — single source of truth for all site content.
 *
 * Content is provided as two language variants, `zh` (default) and `en`,
 * kept in the `content` map. Both variants share the `Content` interface so
 * the structure can never drift between languages. A small composable
 * (`useContent`) selects the active variant by locale.
 *
 * Facts here are extracted from the real Qavor repository
 * (https://github.com/6moran/Qavor). Where a capability is implemented in the
 * real project it is described as such; anything presented as a *planned* or
 * *reserved* module is explicitly flagged so it is never mistaken for shipped
 * work.
 *
 * Edit copy / links here rather than hunting through components.
 */

export type Lang = 'zh' | 'en'

/* ------------------------------------------------------------------ */
/* Shared types                                                        */
/* ------------------------------------------------------------------ */
export interface NavLink {
  id: string
  label: string
}

export type IconName =
  | 'Database'
  | 'GitMerge'
  | 'Bot'
  | 'Activity'
  | 'BarChart3'
  | 'Workflow'

export type SpanStatus = 'ok' | 'error'

export interface TraceSpan {
  name: string
  spanId: string
  durationMs: number
  status: SpanStatus
  note?: string
  children?: TraceSpan[]
}

export interface Step {
  label: string
  sub: string
}

export interface Feature {
  icon: IconName
  title: string
  desc: string
  points: string[]
}

export interface Metric {
  key: string
  label: string
  value: number
  at: number
}

export type ScreenshotKind = 'agent-chat' | 'knowledge-base' | 'agent-trace' | 'tools' | 'models' | 'trace-list'

export interface Screenshot {
  id: ScreenshotKind
  title: string
  caption: string
  src: string
}

export interface ArchNode {
  label: string
  sub: string
  children?: ArchNode[]
}

export interface RagQuery {
  start: Step
  branches: Step[]
  rrf: Step
  rerank: Step
  topk: Step
  llm: Step
  answer: Step
}

export interface Explain {
  key: string
  title: string
  desc: string
}

export interface Content {
  nav: NavLink[]
  ui: {
    github: string
    liveDemo: string
    liveDemoShort: string
  }
  hero: {
    name: string
    titlePre: string
    titleAccent: string
    titlePost: string
    chip: string
    subtitle: string
    description: string
    techTags: string[]
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
  overview: {
    eyebrow: string
    title: string
    intro: string
    steps: Step[]
  }
  story: {
    eyebrow: string
    title: string
    intro: string
    statement: string
    originLabel: string
    origin: string
    chapters: { label: string; title: string; desc: string }[]
  }
  featuresHeading: {
    eyebrow: string
    title: string
    sub: string
  }
  features: Feature[]
  architectureHeading: {
    eyebrow: string
    title: string
    sub: string
  }
  architecture: {
    frontend: ArchNode
    api: ArchNode
    agent: ArchNode
    rag: ArchNode
    trace: ArchNode
    eino: ArchNode
    toolCalling: ArchNode
    retrieval: ArchNode
    pg: ArchNode
    redis: ArchNode
    minio: ArchNode
    python: ArchNode
    tierLabels: {
      frontend: string
      api: string
      agent: string
      rag: string
      trace: string
      storage: string
    }
  }
  ragHeading: {
    eyebrow: string
    title: string
    sub: string
  }
  rag: {
    eyebrow: string
    title: string
    intro: string
    ingestLabel: string
    queryLabel: string
    parallelRecall: string
    ingest: Step[]
    query: RagQuery
    explain: Explain[]
  }
  traceHeading: {
    eyebrow: string
    title: string
    sub: string
  }
  trace: {
    metaLabels: {
      traceId: string
      rootSpanId: string
      duration: string
      status: string
      ok: string
    }
  }
  evaluationHeading: {
    eyebrow: string
    title: string
    sub: string
  }
  evaluation: {
    eyebrow: string
    title: string
    intro: string
    sampleLabel: string
    qLabel: string
    goldLabel: string
    retrievedLabel: string
    hitLabel: string
    metrics: Metric[]
    test: {
      question: string
      expectedChunk: string
      retrieved: { id: string; hit: boolean }[]
    }
  }
  screenshotsHeading: {
    eyebrow: string
    title: string
    sub: string
  }
  screenshots: {
    items: Screenshot[]
    zoomLabel: string
    closeLabel: string
    mock: {
      newAgent: string
      ragHelper: string
      toolBot: string
      documents: string
      upload: string
      indexed: string
      parsing: string
      metrics: string
    }
  }
  techStackHeading: {
    eyebrow: string
    title: string
    sub: string
  }
  techStack: { group: string; items: string[] }[]
  engineeringHeading: {
    eyebrow: string
    title: string
    sub: string
  }
  engineering: { title: string; desc: string; tags: string[] }[]
  footer: {
    tagline: string
    linksLabel: string
    links: { label: string; href: string }[]
    copyright: string
    builtWith: string
  }
}

/* ------------------------------------------------------------------ */
/* Non-translated site config (URLs / brand name)                      */
/* ------------------------------------------------------------------ */
export const site = {
  name: 'Qavor',
  /** Replace with your fork / the deployed demo when available. */
  githubUrl: 'https://github.com/6moran/Qavor',
  /** In-page anchor to the live UI mockups. Swap for a real demo URL if you host one. */
  liveDemoUrl: '#screenshots',
  /** Public screenshot folder (relative to site root). */
  screenshotsBase: 'screenshots',
}

/* ------------------------------------------------------------------ */
/* zh — default language                                               */
/* ------------------------------------------------------------------ */
const zh: Content = {
  nav: [
    { id: 'overview', label: '项目概览' },
    { id: 'story', label: '关于 Qavor' },
    { id: 'features', label: '核心功能' },
    { id: 'architecture', label: '系统架构' },
    { id: 'rag', label: 'RAG 流程' },
    { id: 'trace', label: '链路追踪' },
    { id: 'screenshots', label: '界面预览' },
  ],
  ui: {
    github: 'GitHub',
    liveDemo: '在线演示',
    liveDemoShort: '演示',
  },
  hero: {
    name: 'Qavor',
    titlePre: '构建、运行并',
    titleAccent: '观测',
    titlePost: ' AI Agent',
    chip: '开源 · AI Agent 平台',
    subtitle: '基于 Go 构建的 AI Agent 开发与运行平台',
    description:
      'Qavor 是一个面向开发者的 AI Agent 平台，集成 Agent 编排、RAG 知识库、Tool Calling、Agent Trace 与 RAG Evaluation 等能力，帮助开发者完成从知识接入到 Agent 运行与可观测的一体化开发流程。',
    techTags: ['Go', 'Gin', 'PostgreSQL', 'pgvector', 'Redis', 'Eino', 'Vue 3', 'Docker'],
    primaryCta: { label: '查看 GitHub', href: site.githubUrl },
    secondaryCta: { label: '浏览系统架构', href: '#architecture' },
  },
  overview: {
    eyebrow: '工作流',
    title: '从知识到 Agent',
    intro:
      'Qavor 把零散的 RAG 与 Agent 环节串成一条可运行的流水线：从文档接入，到向量检索，再到 Agent 执行与链路追踪。',
    steps: [
      { label: '知识源', sub: '文档 / 数据' },
      { label: '上传文档', sub: 'PDF / Office / MD' },
      { label: '解析与分块', sub: '解析与分块' },
      { label: '向量化', sub: '语义向量' },
      { label: '向量存储', sub: 'pgvector' },
      { label: 'RAG 检索', sub: '混合检索' },
      { label: 'Agent', sub: 'Eino 编排' },
      { label: '工具调用', sub: 'Tool Calling' },
      { label: '可观测与评测', sub: 'Trace & Eval' },
    ],
  },
  story: {
    eyebrow: '关于 Qavor',
    title: '从真实需求出发，构建可演进的 Agent 工程平台',
    intro:
      'Qavor 关注的不只是“让模型回答一个问题”，而是把模型、知识、工具与运行过程组织成一套可配置、可观测、可评测的完整系统。',
    statement: '让 Agent 从一次性演示，走向能够持续开发、运行和改进的工程化产品。',
    originLabel: '项目与作者',
    origin:
      'Qavor 源于个人对 AI Agent 工程化的长期实践，但这个页面的主角始终是项目本身：它解决的问题、形成的能力，以及仍在继续的演进。',
    chapters: [
      {
        label: '起点',
        title: '不满足于只能演示的 Agent',
        desc: '当模型调用、知识检索、工具执行各自分散，应用很快会在配置、调试和质量判断上失去控制。Qavor 从这些真实工程问题出发。',
      },
      {
        label: '目标',
        title: '把关键链路放进同一个工作台',
        desc: '统一管理 Agent、模型、知识库与工具，让一次请求从输入、检索、推理到工具调用都有清晰的运行路径。',
      },
      {
        label: '现在',
        title: '能力不止于对话界面',
        desc: '项目围绕混合检索、Rerank、Trace / Span 追踪和检索评测形成闭环，使开发者既能构建能力，也能理解运行结果。',
      },
      {
        label: '方向',
        title: '持续增强开放性与可靠性',
        desc: 'Qavor 将继续扩展模型与工具生态，并围绕检索质量、链路稳定性和开发体验打磨更可靠的 Agent 基础设施。',
      },
    ],
  },
  featuresHeading: {
    eyebrow: '核心功能',
    title: '一个平台，覆盖完整生命周期',
    sub: '从知识库到 Agent 运行与可观测，Qavor 把构建 AI Agent 所需的工程能力收敛到同一套系统里。',
  },
  features: [
    {
      icon: 'Database',
      title: 'RAG 知识库',
      desc: '支持文档上传、解析、Markdown 转换、Chunk、Embedding、向量存储与知识库管理。',
      points: ['文档上传与解析', 'Markdown 转换', '分块与向量化', '向量存储与库管理'],
    },
    {
      icon: 'GitMerge',
      title: '混合检索',
      desc: '结合 Vector Search 与 Keyword Search，通过 RRF 完成结果融合，再由 Rerank 完成精排。',
      points: ['向量检索', '关键词检索', 'RRF 融合', 'Rerank 精排'],
    },
    {
      icon: 'Bot',
      title: 'AI Agent',
      desc: '基于 CloudWeGo Eino 实现 Agent 编排，支持 Tool Calling 与多种 Agent 执行模式。',
      points: ['Eino 编排', 'Tool Calling', '多种运行模式', '流式输出'],
    },
    {
      icon: 'Activity',
      title: '链路追踪',
      desc: 'Trace 设计参考 OpenTelemetry 的 Trace / Span 模型——对 Retriever、Rerank、LLM、Tool 等节点进行链路追踪。',
      points: ['Retriever Span', 'Rerank Span', 'LLM Span', 'Tool Span'],
    },
    {
      icon: 'BarChart3',
      title: 'RAG 评测',
      desc: '通过 Recall、Precision、MRR、NDCG 等指标量化评估知识库检索质量。',
      points: ['Recall@K', 'Precision@K', 'MRR', 'NDCG'],
    },
    {
      icon: 'Workflow',
      title: '异步处理',
      desc: '文档解析与索引等耗时任务采用异步任务处理，并向前端暴露任务状态。',
      points: ['Redis 任务队列', '异步 Worker', '实时状态', '非阻塞体验'],
    },
  ],
  architectureHeading: {
    eyebrow: '系统架构',
    title: '分层、可观测、异步',
    sub: '前端通过 HTTP / SSE 与 Go / Gin API 通信；Agent、RAG、Agent Trace 作为独立运行模块，最终落到 PostgreSQL（pgvector / pg_trgm）与 Redis。',
  },
  architecture: {
    frontend: { label: 'Vue 3', sub: 'Web 界面' },
    api: { label: 'Go / Gin API', sub: 'HTTP / SSE' },
    agent: { label: 'Agent', sub: 'CloudWeGo Eino' },
    rag: { label: 'RAG', sub: '检索引擎' },
    trace: { label: 'Agent Trace', sub: 'Span 采集' },
    eino: { label: 'Eino', sub: 'Agent 框架' },
    toolCalling: { label: 'Tool Calling', sub: 'MCP / Skills' },
    retrieval: {
      label: '检索引擎',
      sub: '混合检索',
      children: [
        { label: 'Vector Search', sub: 'pgvector' },
        { label: 'Keyword Search', sub: 'pg_trgm' },
        { label: 'RRF', sub: '排名融合' },
        { label: 'Rerank', sub: '相关性精排' },
      ],
    },
    pg: { label: 'PostgreSQL', sub: 'pgvector · pg_trgm' },
    redis: { label: 'Redis', sub: '运行与文档队列' },
    minio: { label: 'MinIO', sub: '文件与解析产物' },
    python: { label: 'Python Parser', sub: 'Docling · RapidOCR' },
    tierLabels: {
      frontend: '前端',
      api: 'API 层',
      agent: 'Agent',
      rag: 'RAG',
      trace: '链路追踪',
      storage: '存储',
    },
  },
  ragHeading: {
    eyebrow: 'RAG 流水线',
    title: '端到端的混合检索',
    sub: '从文档入库到用户提问，RAG Pipeline 在检索阶段用 Vector + Keyword 双通道召回，经 RRF 融合与 Rerank 精排，再交给 LLM 生成答案。',
  },
  rag: {
    eyebrow: 'RAG 流程',
    title: '端到端的混合检索',
    intro:
      '从文档入库到用户提问，RAG Pipeline 在检索阶段用 Vector + Keyword 双通道召回，经 RRF 融合与 Rerank 精排，再交给 LLM 生成答案。',
    ingestLabel: '入库流程',
    queryLabel: '查询流程',
    parallelRecall: '并行召回',
    ingest: [
      { label: 'Document Upload', sub: 'PDF / Office / MD' },
      { label: 'Document Parser', sub: 'Go / Python' },
      { label: 'Markdown', sub: '结构化正文' },
      { label: 'Chunking', sub: '按 Token 分块' },
      { label: 'Embedding', sub: '语义向量' },
      { label: 'pgvector', sub: '向量存储' },
      { label: 'Knowledge Base', sub: '可检索库' },
    ],
    query: {
      start: { label: 'User Query', sub: '自然语言提问' },
      branches: [
        { label: 'Vector Search', sub: 'pgvector 语义召回' },
        { label: 'Keyword Search', sub: 'pg_trgm 关键词召回' },
      ],
      rrf: { label: 'RRF', sub: 'Reciprocal Rank Fusion' },
      rerank: { label: 'Rerank', sub: '相关性精排' },
      topk: { label: 'Top-K Chunks', sub: '高质量候选' },
      llm: { label: 'LLM', sub: '生成答案' },
      answer: { label: 'Answer', sub: '返回结果' },
    },
    explain: [
      {
        key: 'Vector Search',
        title: 'Vector Search',
        desc: '基于 pgvector 完成语义相似度检索，召回与查询意图相近的文档块。',
      },
      {
        key: 'Keyword Search',
        title: 'Keyword Search',
        desc: '结合 PostgreSQL pg_trgm 完成关键词 / 模糊匹配召回，补足语义检索的精确命中。',
      },
      {
        key: 'RRF',
        title: 'RRF',
        desc: 'Reciprocal Rank Fusion：对不同召回通道的排名结果进行分数融合，避免单一通道的偏置。',
      },
      {
        key: 'Rerank',
        title: 'Rerank',
        desc: '对融合后的候选文档进一步做相关性排序，提升最终送入 LLM 的上下文质量。',
      },
    ],
  },
  traceHeading: {
    eyebrow: '链路追踪',
    title: '让执行过程可观测',
    sub: 'Trace 设计参考 OpenTelemetry 的 Trace / Span 模型，对 Retriever、Rerank、LLM、Tool 等执行节点进行链路追踪，并采集 Parent / Child 关系、执行耗时与状态。',
  },
  trace: {
    metaLabels: {
      traceId: 'TraceID',
      rootSpanId: '根 SpanID',
      duration: '耗时',
      status: '状态',
      ok: '正常',
    },
  },
  evaluationHeading: {
    eyebrow: 'RAG 评测',
    title: '量化检索质量',
    sub: 'Qavor 不只实现 RAG，还内置检索评测：用 gold chunk 作为基准，计算 Recall、Precision、MRR、NDCG 等指标，量化知识库检索效果。',
  },
  evaluation: {
    eyebrow: 'RAG Evaluation',
    title: 'Measure Retrieval Quality',
    intro:
      'Qavor 不只实现 RAG，还内置检索评测：用 gold chunk 作为基准，计算 Recall、Precision、MRR、NDCG 等指标，量化知识库检索效果。',
    sampleLabel: '评测样例',
    qLabel: '问题',
    goldLabel: '期望分块 (Gold)',
    retrievedLabel: '召回分块',
    hitLabel: '命中',
    metrics: [
      { key: 'recall', label: 'Recall@5', value: 0.86, at: 5 },
      { key: 'precision', label: 'Precision@5', value: 0.72, at: 5 },
      { key: 'mrr', label: 'MRR', value: 0.81, at: 5 },
      { key: 'ndcg', label: 'NDCG@5', value: 0.84, at: 5 },
    ],
    test: {
      question: 'Go GC 是如何工作的？',
      expectedChunk: 'golang-gc.md#chunk-17',
      retrieved: [
        { id: '#17', hit: true },
        { id: '#31', hit: false },
        { id: '#08', hit: false },
      ],
    },
  },
  screenshotsHeading: {
    eyebrow: '界面预览',
    title: '走进产品',
    sub: '从 Agent 对话与知识库管理，到模型、工具和全链路追踪，这些真实界面展示了 Qavor 如何串联 Agent 的开发、运行与排障。点击任意图片查看完整细节。',
  },
  screenshots: {
    zoomLabel: '放大查看',
    closeLabel: '关闭图片',
    items: [
      {
        id: 'agent-chat',
        title: 'Agent 对话',
        caption: '流式对话、工具调用与运行过程',
        src: `${site.screenshotsBase}/agent-chat.png`,
      },
      {
        id: 'knowledge-base',
        title: '知识库',
        caption: '文档管理、分块与向量入库',
        src: `${site.screenshotsBase}/knowledge-base.png`,
      },
      {
        id: 'agent-trace',
        title: '链路追踪',
        caption: 'Span 时间线与 Trace 详情',
        src: `${site.screenshotsBase}/agent-trace.png`,
      },
      {
        id: 'tools',
        title: '工具 / MCP',
        caption: '内置工具与第三方 MCP 扩展',
        src: `${site.screenshotsBase}/tools.png`,
      },
      {
        id: 'models',
        title: '模型管理',
        caption: 'Chat / Embedding / Rerank 统一接入',
        src: `${site.screenshotsBase}/models.png`,
      },
      {
        id: 'trace-list',
        title: '链路列表',
        caption: '多次 Agent 调用的总览与排障',
        src: `${site.screenshotsBase}/trace-list.png`,
      },
    ],
    mock: {
      newAgent: '新建 Agent',
      ragHelper: 'RAG 助手',
      toolBot: '工具机器人',
      documents: '文档',
      upload: '+ 上传',
      indexed: '已入库',
      parsing: '解析中',
      metrics: '检索指标',
    },
  },
  techStackHeading: {
    eyebrow: '技术栈',
    title: '务实而现代的技术选型',
    sub: '后端以 Go 为核心，AI 层基于 CloudWeGo Eino，数据与检索落在 PostgreSQL / pgvector / Redis，前端使用 Vue 3 + Vite。',
  },
  techStack: [
    { group: '后端', items: ['Go', 'Gin', 'GORM'] },
    { group: 'AI / Agent', items: ['CloudWeGo Eino', 'Tool Calling', 'RAG'] },
    { group: '数据库', items: ['PostgreSQL', 'pgvector', 'pg_trgm', 'Redis', 'MinIO'] },
    { group: '前端', items: ['Vue 3', 'TypeScript', 'Vite'] },
    { group: 'DevOps', items: ['Docker', 'GitHub Actions', 'GitHub Pages'] },
  ],
  engineeringHeading: {
    eyebrow: '工程亮点',
    title: '不只是 CRUD 项目',
    sub: '这些设计点体现了 AI 应用工程能力：混合检索、Agent 可观测、异步文档流水线，以及以指标驱动的检索评测。',
  },
  engineering: [
    { title: 'Hybrid Retrieval', desc: '语义与关键词双通道召回，RRF 融合 + Rerank 精排。', tags: ['Vector', 'Keyword', 'RRF', 'Rerank'] },
    { title: 'Agent Observability', desc: 'Trace / Span 级执行追踪，覆盖 Retriever、Rerank、LLM、Tool。', tags: ['Trace', 'Span', 'Duration', 'Status'] },
    { title: 'Async Document Pipeline', desc: '上传 → 解析 → 入库全异步，任务状态实时暴露给前端。', tags: ['Upload', 'Parse', 'Index'] },
    { title: 'Evaluation Driven', desc: '以 Recall / Precision / MRR / NDCG 量化检索效果，而非凭感觉。', tags: ['Recall', 'Precision', 'MRR', 'NDCG'] },
  ],
  footer: {
    tagline: '为构建 AI Agent 的开发者而设计。',
    linksLabel: '链接',
    links: [
      { label: 'GitHub 仓库', href: site.githubUrl },
      { label: '基于 Go & Vue 构建', href: site.githubUrl },
      { label: 'GitHub Pages', href: 'https://pages.github.com/' },
    ],
    copyright: '© 2026 Qavor · 开源项目展示',
    builtWith: '基于 Go & Vue 构建 · 部署于 GitHub Pages',
  },
}

/* ------------------------------------------------------------------ */
/* en — English variant                                               */
/* ------------------------------------------------------------------ */
const en: Content = {
  nav: [
    { id: 'overview', label: 'Overview' },
    { id: 'story', label: 'About Qavor' },
    { id: 'features', label: 'Features' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'rag', label: 'RAG Pipeline' },
    { id: 'trace', label: 'Agent Trace' },
    { id: 'screenshots', label: 'Screenshots' },
  ],
  ui: {
    github: 'GitHub',
    liveDemo: 'Live Demo',
    liveDemoShort: 'Demo',
  },
  hero: {
    name: 'Qavor',
    titlePre: 'Build, Run and ',
    titleAccent: 'Observe',
    titlePost: ' AI Agents',
    chip: 'Open Source · AI Agent Platform',
    subtitle: 'An AI Agent development & runtime platform built with Go',
    description:
      'Qavor is a developer-focused AI Agent platform integrating agent orchestration, RAG knowledge base, tool calling, agent trace and RAG evaluation — covering the full pipeline from knowledge ingestion to agent execution and observability.',
    techTags: ['Go', 'Gin', 'PostgreSQL', 'pgvector', 'Redis', 'Eino', 'Vue 3', 'Docker'],
    primaryCta: { label: 'View on GitHub', href: site.githubUrl },
    secondaryCta: { label: 'Explore Architecture', href: '#architecture' },
  },
  overview: {
    eyebrow: 'Workflow',
    title: 'From Knowledge to Agent',
    intro:
      'Qavor connects the fragmented pieces of RAG and Agent into a single runnable pipeline: from document ingestion and vector retrieval to agent execution and trace.',
    steps: [
      { label: 'Knowledge', sub: 'Docs / Data' },
      { label: 'Upload Documents', sub: 'PDF / Office / MD' },
      { label: 'Parse & Chunk', sub: 'Parse & Chunk' },
      { label: 'Embedding', sub: 'Semantic Vector' },
      { label: 'Vector Store', sub: 'pgvector' },
      { label: 'RAG Retrieval', sub: 'Hybrid Retrieval' },
      { label: 'Agent', sub: 'Eino Orchestration' },
      { label: 'Tool Calling', sub: 'Tool Calling' },
      { label: 'Trace & Evaluation', sub: 'Observe & Eval' },
    ],
  },
  story: {
    eyebrow: 'About Qavor',
    title: 'From Real Needs to an Evolvable Agent Platform',
    intro:
      'Qavor is not only about making a model answer a question. It brings models, knowledge, tools, and runtime behavior into one configurable, observable, and measurable system.',
    statement: 'Move Agents beyond one-off demos into products that teams can continuously build, run, and improve.',
    originLabel: 'Project & creator',
    origin:
      'Qavor grew from long-term personal exploration of Agent engineering, but the project remains the focus: the problems it addresses, the capabilities it brings together, and the direction it continues to pursue.',
    chapters: [
      {
        label: 'Origin',
        title: 'Beyond Agents That Only Demo Well',
        desc: 'When model calls, retrieval, and tool execution live in separate places, configuration, debugging, and quality quickly become hard to control. Qavor starts from these real engineering problems.',
      },
      {
        label: 'Goal',
        title: 'One Workspace for the Critical Path',
        desc: 'Manage Agents, models, knowledge bases, and tools together, with a clear path from input and retrieval through reasoning and tool execution.',
      },
      {
        label: 'Today',
        title: 'More Than a Chat Interface',
        desc: 'Hybrid retrieval, reranking, Trace / Span observability, and retrieval evaluation form a feedback loop for building capabilities and understanding their results.',
      },
      {
        label: 'Direction',
        title: 'More Open, More Reliable',
        desc: 'Qavor will keep expanding its model and tool ecosystem while improving retrieval quality, runtime reliability, and the overall Agent development experience.',
      },
    ],
  },
  featuresHeading: {
    eyebrow: 'Core Features',
    title: 'One Platform, Full Lifecycle',
    sub: 'From knowledge base to agent execution and observability, Qavor converges the engineering capabilities needed to build AI Agents into one system.',
  },
  features: [
    {
      icon: 'Database',
      title: 'RAG Knowledge Base',
      desc: 'Document upload, parsing, Markdown conversion, chunking, embedding, vector storage and knowledge base management.',
      points: ['Document Upload & Parse', 'Markdown Conversion', 'Chunk & Embedding', 'Vector Store & KB Mgmt'],
    },
    {
      icon: 'GitMerge',
      title: 'Hybrid Search',
      desc: 'Combines Vector Search and Keyword Search, fuses results via RRF, then re-ranks with Rerank.',
      points: ['Vector Search', 'Keyword Search', 'RRF Fusion', 'Rerank'],
    },
    {
      icon: 'Bot',
      title: 'AI Agent',
      desc: 'Agent orchestration built on CloudWeGo Eino, with Tool Calling and multiple execution modes.',
      points: ['Eino Orchestration', 'Tool Calling', 'Multiple Run Modes', 'Streaming Output'],
    },
    {
      icon: 'Activity',
      title: 'Agent Trace',
      desc: 'Trace design inspired by the OpenTelemetry Trace / Span model — traces Retriever, Rerank, LLM, Tool and more.',
      points: ['Retriever Span', 'Rerank Span', 'LLM Span', 'Tool Span'],
    },
    {
      icon: 'BarChart3',
      title: 'RAG Evaluation',
      desc: 'Quantify retrieval quality with Recall, Precision, MRR and NDCG.',
      points: ['Recall@K', 'Precision@K', 'MRR', 'NDCG'],
    },
    {
      icon: 'Workflow',
      title: 'Async Processing',
      desc: 'Time-consuming tasks like parsing and indexing run asynchronously, with task status exposed to the frontend.',
      points: ['Redis Task Queue', 'Async Worker', 'Real-time Status', 'Non-blocking UX'],
    },
  ],
  architectureHeading: {
    eyebrow: 'System Architecture',
    title: 'Layered, Observable, Async',
    sub: 'The frontend talks to the Go / Gin API over HTTP / SSE; Agent, RAG and Agent Trace run as independent modules, backed by PostgreSQL (pgvector / pg_trgm) and Redis.',
  },
  architecture: {
    frontend: { label: 'Vue 3', sub: 'Web UI' },
    api: { label: 'Go / Gin API', sub: 'HTTP / SSE' },
    agent: { label: 'Agent', sub: 'CloudWeGo Eino' },
    rag: { label: 'RAG', sub: 'Retrieval Engine' },
    trace: { label: 'Agent Trace', sub: 'Span Collector' },
    eino: { label: 'Eino', sub: 'Agent Framework' },
    toolCalling: { label: 'Tool Calling', sub: 'MCP / Skills' },
    retrieval: {
      label: 'Retrieval Engine',
      sub: 'Hybrid Retrieval',
      children: [
        { label: 'Vector Search', sub: 'pgvector' },
        { label: 'Keyword Search', sub: 'pg_trgm' },
        { label: 'RRF', sub: 'Rank Fusion' },
        { label: 'Rerank', sub: 'Re-ranking' },
      ],
    },
    pg: { label: 'PostgreSQL', sub: 'pgvector · pg_trgm' },
    redis: { label: 'Redis', sub: 'Run & Doc Queues' },
    minio: { label: 'MinIO', sub: 'Files & Parse Artifacts' },
    python: { label: 'Python Parser', sub: 'Docling · RapidOCR' },
    tierLabels: {
      frontend: 'Frontend',
      api: 'API',
      agent: 'Agent',
      rag: 'RAG',
      trace: 'Agent Trace',
      storage: 'Storage',
    },
  },
  ragHeading: {
    eyebrow: 'RAG Pipeline',
    title: 'Hybrid Retrieval, End to End',
    sub: 'From ingestion to query, the RAG Pipeline recalls in parallel through Vector + Keyword channels, fuses via RRF and re-ranks with Rerank before the LLM generates an answer.',
  },
  rag: {
    eyebrow: 'RAG Pipeline',
    title: 'Hybrid Retrieval, End to End',
    intro:
      'From ingestion to query, the RAG Pipeline recalls in parallel through Vector + Keyword channels, fuses via RRF and re-ranks with Rerank before the LLM generates an answer.',
    ingestLabel: 'Ingestion',
    queryLabel: 'Query',
    parallelRecall: 'parallel recall',
    ingest: [
      { label: 'Document Upload', sub: 'PDF / Office / MD' },
      { label: 'Document Parser', sub: 'Go / Python' },
      { label: 'Markdown', sub: 'Structured Body' },
      { label: 'Chunking', sub: 'Token-based' },
      { label: 'Embedding', sub: 'Semantic Vector' },
      { label: 'pgvector', sub: 'Vector Store' },
      { label: 'Knowledge Base', sub: 'Retrievable' },
    ],
    query: {
      start: { label: 'User Query', sub: 'Natural Language' },
      branches: [
        { label: 'Vector Search', sub: 'pgvector Semantic' },
        { label: 'Keyword Search', sub: 'pg_trgm Keyword' },
      ],
      rrf: { label: 'RRF', sub: 'Reciprocal Rank Fusion' },
      rerank: { label: 'Rerank', sub: 'Re-ranking' },
      topk: { label: 'Top-K Chunks', sub: 'High-quality Candidates' },
      llm: { label: 'LLM', sub: 'Generate Answer' },
      answer: { label: 'Answer', sub: 'Return Result' },
    },
    explain: [
      {
        key: 'Vector Search',
        title: 'Vector Search',
        desc: 'Semantic similarity retrieval via pgvector, recalling chunks close to the query intent.',
      },
      {
        key: 'Keyword Search',
        title: 'Keyword Search',
        desc: 'Keyword / fuzzy matching via PostgreSQL pg_trgm, complementing exact hits that semantic search misses.',
      },
      {
        key: 'RRF',
        title: 'RRF',
        desc: 'Reciprocal Rank Fusion: blends ranking scores from different recall channels, avoiding single-channel bias.',
      },
      {
        key: 'Rerank',
        title: 'Rerank',
        desc: 'Further re-ranks the fused candidates to improve the context quality fed into the LLM.',
      },
    ],
  },
  traceHeading: {
    eyebrow: 'Agent Trace',
    title: 'Execution, Made Observable',
    sub: 'Trace design inspired by the OpenTelemetry Trace / Span model — traces Retriever, Rerank, LLM, Tool and more, capturing parent / child relations, duration and status.',
  },
  trace: {
    metaLabels: {
      traceId: 'TraceID',
      rootSpanId: 'Root SpanID',
      duration: 'Duration',
      status: 'Status',
      ok: 'OK',
    },
  },
  evaluationHeading: {
    eyebrow: 'RAG Evaluation',
    title: 'Measure Retrieval Quality',
    sub: 'Qavor does not just implement RAG — it ships retrieval evaluation: using gold chunks as a baseline to compute Recall, Precision, MRR and NDCG, quantifying retrieval quality.',
  },
  evaluation: {
    eyebrow: 'RAG Evaluation',
    title: 'Measure Retrieval Quality',
    intro:
      'Qavor does not just implement RAG — it ships retrieval evaluation: using gold chunks as a baseline to compute Recall, Precision, MRR and NDCG, quantifying retrieval quality.',
    sampleLabel: 'Evaluation Sample',
    qLabel: 'Question',
    goldLabel: 'Expected Chunk (Gold)',
    retrievedLabel: 'Retrieved Chunks',
    hitLabel: 'HIT',
    metrics: [
      { key: 'recall', label: 'Recall@5', value: 0.86, at: 5 },
      { key: 'precision', label: 'Precision@5', value: 0.72, at: 5 },
      { key: 'mrr', label: 'MRR', value: 0.81, at: 5 },
      { key: 'ndcg', label: 'NDCG@5', value: 0.84, at: 5 },
    ],
    test: {
      question: 'How does Go GC work?',
      expectedChunk: 'golang-gc.md#chunk-17',
      retrieved: [
        { id: '#17', hit: true },
        { id: '#31', hit: false },
        { id: '#08', hit: false },
      ],
    },
  },
  screenshotsHeading: {
    eyebrow: 'Screenshots',
    title: 'Inside the Product',
    sub: 'From Agent chat and knowledge management to models, tools, and end-to-end tracing, these real interfaces show how Qavor connects Agent development, operation, and debugging. Select any image to view the full detail.',
  },
  screenshots: {
    zoomLabel: 'View larger',
    closeLabel: 'Close image',
    items: [
      {
        id: 'agent-chat',
        title: 'Agent Chat',
        caption: 'Streaming chat, tool calls and run trace',
        src: `${site.screenshotsBase}/agent-chat.png`,
      },
      {
        id: 'knowledge-base',
        title: 'Knowledge Base',
        caption: 'Document management, chunking and vector ingestion',
        src: `${site.screenshotsBase}/knowledge-base.png`,
      },
      {
        id: 'agent-trace',
        title: 'Agent Trace',
        caption: 'Span timeline and trace details',
        src: `${site.screenshotsBase}/agent-trace.png`,
      },
      {
        id: 'tools',
        title: 'Tools & MCP',
        caption: 'Built-in tools and 3rd-party MCP extensions',
        src: `${site.screenshotsBase}/tools.png`,
      },
      {
        id: 'models',
        title: 'Model Management',
        caption: 'Unified Chat / Embedding / Rerank configuration',
        src: `${site.screenshotsBase}/models.png`,
      },
      {
        id: 'trace-list',
        title: 'Trace List',
        caption: 'Multi-run overview and debugging',
        src: `${site.screenshotsBase}/trace-list.png`,
      },
    ],
    mock: {
      newAgent: 'New Agent',
      ragHelper: 'RAG Helper',
      toolBot: 'Tool Bot',
      documents: 'Documents',
      upload: '+ Upload',
      indexed: 'Indexed',
      parsing: 'Parsing',
      metrics: 'Retrieval Metrics',
    },
  },
  techStackHeading: {
    eyebrow: 'Tech Stack',
    title: 'Built on a Pragmatic Stack',
    sub: 'Go-centric backend, CloudWeGo Eino for the AI layer, PostgreSQL / pgvector / Redis for data and retrieval, and Vue 3 + Vite on the frontend.',
  },
  techStack: [
    { group: 'Backend', items: ['Go', 'Gin', 'GORM'] },
    { group: 'AI / Agent', items: ['CloudWeGo Eino', 'Tool Calling', 'RAG'] },
    { group: 'Database', items: ['PostgreSQL', 'pgvector', 'pg_trgm', 'Redis', 'MinIO'] },
    { group: 'Frontend', items: ['Vue 3', 'TypeScript', 'Vite'] },
    { group: 'DevOps', items: ['Docker', 'GitHub Actions', 'GitHub Pages'] },
  ],
  engineeringHeading: {
    eyebrow: 'Engineering Highlights',
    title: 'Not a CRUD Project',
    sub: 'These design points reflect AI application engineering: hybrid retrieval, agent observability, async document pipeline, and metric-driven retrieval evaluation.',
  },
  engineering: [
    { title: 'Hybrid Retrieval', desc: 'Semantic + keyword dual-channel recall, RRF fusion + Rerank re-ranking.', tags: ['Vector', 'Keyword', 'RRF', 'Rerank'] },
    { title: 'Agent Observability', desc: 'Trace / Span level execution tracking across Retriever, Rerank, LLM, Tool.', tags: ['Trace', 'Span', 'Duration', 'Status'] },
    { title: 'Async Document Pipeline', desc: 'Upload → Parse → Index fully async, task status exposed to the frontend in real time.', tags: ['Upload', 'Parse', 'Index'] },
    { title: 'Evaluation Driven', desc: 'Quantify retrieval with Recall / Precision / MRR / NDCG instead of guesswork.', tags: ['Recall', 'Precision', 'MRR', 'NDCG'] },
  ],
  footer: {
    tagline: 'Designed for developers building AI Agents.',
    linksLabel: 'Links',
    links: [
      { label: 'GitHub Repository', href: site.githubUrl },
      { label: 'Built with Go & Vue', href: site.githubUrl },
      { label: 'GitHub Pages', href: 'https://pages.github.com/' },
    ],
    copyright: '© 2026 Qavor · Open Source Project Showcase',
    builtWith: 'Built with Go & Vue · Deployed on GitHub Pages',
  },
}

export const content: Record<Lang, Content> = { zh, en }

// Re-export the trace structure (language-independent, kept as technical terms).
export const traceDemo = {
  traceId: '4f1c8f92ab37d0e2',
  shortId: '8f92ab',
  totalMs: 2310,
  root: {
    name: 'Agent Run',
    spanId: 'a1',
    durationMs: 2310,
    status: 'ok' as SpanStatus,
    children: [
      {
        name: 'Retrieve',
        spanId: 'b1',
        durationMs: 180,
        status: 'ok' as SpanStatus,
        children: [
          { name: 'Vector Search', spanId: 'c1', durationMs: 72, status: 'ok' as SpanStatus },
          { name: 'Keyword Search', spanId: 'c2', durationMs: 51, status: 'ok' as SpanStatus },
        ],
      },
      { name: 'RRF', spanId: 'b2', durationMs: 12, status: 'ok' as SpanStatus },
      { name: 'Rerank', spanId: 'b3', durationMs: 326, status: 'ok' as SpanStatus },
      { name: 'LLM', spanId: 'b4', durationMs: 1680, status: 'ok' as SpanStatus },
      { name: 'Tool Call', spanId: 'b5', durationMs: 103, status: 'ok' as SpanStatus, note: 'get_weather' },
    ],
  } as TraceSpan,
}
