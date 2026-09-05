// ─── Personal Details ─────────────────────────────────────────────────────────
export const PERSON = {
  name: 'Himanshu Nanda',
  role: 'Applied Scientist',
  aspiration: 'LLM & Machine Learning',
  company: 'AT&T',
  age: 23,
  email: 'himanshu.nanda22@gmail.com',
  linkedin: 'https://www.linkedin.com/in/himanshu-nanda-8537a6225/',
  leetcode: 'https://leetcode.com/u/nh22/',
  github: 'https://github.com/himanshunanda22',
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: 'hero',       label: 'home'      },
  { id: 'about',      label: 'about'     },
  { id: 'playground', label: 'playground'},
  { id: 'agentic',    label: 'agentic ai'},
  { id: 'education',  label: 'education' },
  { id: 'research',   label: 'research'  },
  { id: 'articles',   label: 'articles'  },
  { id: 'contact',    label: 'contact'   },
]

// ─── Skills / Chips ───────────────────────────────────────────────────────────
export const SKILLS = [
  { text: 'LLM Systems',              type: 'blue'  },
  { text: 'Machine Learning',         type: 'blue'  },
  { text: 'Deep Learning',            type: 'blue'  },
  { text: 'RAG & Evaluation',         type: 'teal'  },
  { text: 'LangChain / LangGraph',    type: 'teal'  },
  { text: 'Model Optimization',       type: 'teal'  },
  { text: 'AT&T · Applied ML',        type: 'coral' },
  { text: 'Self-directed LLM Study',  type: 'coral' },
]

// ─── Articles ─────────────────────────────────────────────────────────────────
export const ARTICLES = [
  // ── DeceptNet v2 — interactive project entry (renders as a project card) ──
  {
    tag: 'R&D Project · Cybersecurity × RL',
    title: 'DeceptNet v2 — MDP-Enhanced Neural Deception Gateway',
    excerpt:
      'A cybersecurity middleware that uses Markov Decision Processes and Double DQN to intercept attacker sessions, respond with convincing fake data, and continuously learn optimal deception policies from live traffic. Includes a live platform dashboard, animated session simulation, and deep mathematical explainers.',
    url: '/deceptnet',          // internal Next.js route — opens the playground
    status: 'published' as const,
    isProject: true,
  },
  {
    tag: 'Medium · LLM Systems',
    title: 'Your SLM Is Small, So Why Is Inference Still Expensive?',
    excerpt:
      'A practical breakdown of why small language models can still be costly at inference time — from KV cache behavior and memory bandwidth to batching, quantization, and serving architecture trade-offs.',
    url: 'https://medium.com/@himanshunanda2002/your-slm-is-small-so-why-is-inference-still-expensive-593795550ed4',
    status: 'published' as const,
  },
  {
    tag: 'Medium · Statistics',
    title: 'I Tried to Fit a Line to Some Data and Ended Up Questioning How Reality Generates Points',
    excerpt:
      'A journey from ordinary least squares into the generative assumptions hiding beneath every regression model — and what happens when those assumptions break.',
    url: 'https://medium.com/@himanshunanda2002/i-tried-to-fit-a-line-to-some-data-and-ended-up-questioning-how-reality-generates-points-e003c18235a7',
    status: 'published' as const,
  },
  {
    tag: 'Draft in Progress',
    title: 'The Geometry of Risk: Why Covariance Matrices Are Not Just Spreadsheets',
    excerpt:
      'How high-dimensional correlation structures shape portfolio outcomes, and why the eigenvalues of Σ matter more than individual variances.',
    url: null,
    status: 'draft' as const,
  },
  {
    tag: 'Draft in Progress',
    title: 'Building a Multi-Agent Research Assistant with LangGraph',
    excerpt:
      'A walkthrough of constructing a graph-based agentic pipeline — planner, executor, and critic nodes connected by typed state edges.',
    url: null,
    status: 'draft' as const,
  },
]

// ─── Agentic AI Projects ──────────────────────────────────────────────────────
export const AGENTIC_PROJECTS = [
  {
    icon: '⬡',
    title: 'LangGraph Market Analyst',
    stack: ['LangGraph', 'LangChain', 'Python', 'OpenAI'],
    status: 'building' as const,
    desc: 'A stateful multi-agent graph where a Planner node decomposes a market research query, Executor nodes call financial APIs and run sentiment analysis, and a Critic node validates output before surfacing a final report.',
    concepts: ['StateGraph', 'Conditional edges', 'Tool nodes', 'Human-in-the-loop'],
  },
  {
    icon: '∿',
    title: 'RAG Pipeline for Quant Papers',
    stack: ['LangChain', 'FAISS', 'OpenAI', 'PyMuPDF'],
    status: 'complete' as const,
    desc: 'A retrieval-augmented generation pipeline that ingests academic finance papers, chunks and embeds them, and lets you ask questions grounded in citations. Built as a personal study tool.',
    concepts: ['Document loaders', 'Vector stores', 'RetrievalQA chain', 'Prompt templates'],
  },
  {
    icon: '⟳',
    title: 'Reflexion Agent for Strategy Backtest',
    stack: ['LangGraph', 'LangChain', 'pandas', 'yfinance'],
    status: 'building' as const,
    desc: 'An agent that autonomously writes a backtest, runs it, reads the Sharpe and drawdown, critiques its own output, revises the strategy parameters, and iterates — implementing the Reflexion framework.',
    concepts: ['Actor-Evaluator-Self-reflection', 'Tool use', 'Memory', 'Iterative refinement'],
  },
  {
    icon: '⊕',
    title: 'Earnings Call Summarizer',
    stack: ['LangChain', 'Whisper', 'OpenAI', 'FastAPI'],
    status: 'complete' as const,
    desc: 'A pipeline that transcribes earnings call audio via Whisper, extracts structured signals (guidance, risks, tone shifts) using a chain of LangChain prompts, and outputs a structured analyst-style brief.',
    concepts: ['Sequential chains', 'Output parsers', 'Structured extraction', 'FastAPI deployment'],
  },
]

// ─── Education ───────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    id: 'btech',
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'PES University',
    institutionShort: 'B.Tech CSE',
    location: 'India',
    period: '2021 - 2025',
    score: '8.64 / 10 CGPA',
    scoreType: 'cgpa' as const,
    icon: '⬡',
    highlights: [
      'Specialisation in Cybersecurity, AI, and Data Science',
      'Published in Springer Nature after ICCCT 2025',
      'Active in AI/ML projects, LLM experimentation, and problem-solving competitions',
    ],
    relevantCourses: [
      'Data Structures & Algorithms',
      'Probability & Statistics',
      'Machine Learning',
      'Linear Algebra',
      'Database Management',
      'Operating Systems',
      'Computer Networks',
      'Artificial Intelligence',
    ],
  },
  {
    id: 'xii',
    degree: 'Class XII — Science (PCM + CS)',
    institution: 'City Montessori School',
    institutionShort: 'CMS',
    location: 'Lucknow, India',
    period: '2013 - 2021',
    score: '93.25%',
    scoreType: 'percentage' as const,
    icon: '∑',
    highlights: [
      'City Montessori School - one of the largest schools in the world (Guinness World Records)',
      'Physics, Chemistry, Mathematics, Computer Science stream',
      'Strong foundation in calculus and discrete mathematics',
      'Developed early interest in programming and problem-solving',
    ],
    relevantCourses: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Computer Science',
      'English',
    ],
  },
]

// ─── Research Publication ─────────────────────────────────────────────────────
export const RESEARCH = {
  title: 'Published Research Chapter',
  venue: 'International Conference on Communication and Computational Technologies',
  venueShort: 'ICCCT 2025',
  publisher: 'Springer Nature',
  series: 'Lecture Notes in Networks and Systems',
  seriesVolume: 'Volume 1674',
  proceedings: 'ICCCT 2025 — published in Springer Nature',
  releaseDate: 'Published online',
  springerUrl: 'https://link.springer.com/book/10.1007/978-981-95-3498-2',
  topics: ['Intelligent Systems', 'Artificial Intelligence', 'Machine Learning', 'Communication Technologies'],
  status: 'published' as const,
  note: 'Presented at ICCCT 2025, National Forensic Sciences University Goa, India · Feb 14–15, 2025',
}

// ─── About Cards ─────────────────────────────────────────────────────────────
export const ABOUT_CARDS = [
  {
    icon: '∑',
    title: 'Where I Am Now',
    body: 'Applied ML work at AT&T focused on machine learning, statistical modeling, and practical AI systems for large-scale telecommunication data and decision support.',
  },
  {
    icon: '→',
    title: 'Where I\'m Heading',
    body: 'I want to build a career as an Applied Scientist in LLMs and machine learning — combining model design, experimentation, evaluation, and production impact.',
  },
  {
    icon: '⬡',
    title: 'Building Agentic Systems',
    body: 'Actively building multi-agent AI pipelines using LangGraph and LangChain — stateful graphs, RAG systems, tool-using agents, and self-improving workflows.',
  },
  {
    icon: 'σ',
    title: 'What I\'m Studying',
    body: 'Transformer architectures, LLM evaluation, fine-tuning strategies, retrieval systems, model efficiency, and practical deployment patterns for real-world ML applications.',
  },
]
