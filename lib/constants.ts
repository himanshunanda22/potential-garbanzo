// ─── Personal Details ─────────────────────────────────────────────────────────
export const PERSON = {
  name: 'Himanshu Nanda',
  role: 'Data Scientist',
  aspiration: 'Aspiring Quant Researcher',
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
  { text: 'Machine Learning',         type: 'blue'  },
  { text: 'Probability Theory',       type: 'blue'  },
  { text: 'Stochastic Processes',     type: 'blue'  },
  { text: 'LangChain / LangGraph',    type: 'teal'  },
  { text: 'Agentic AI Systems',       type: 'teal'  },
  { text: 'Quantitative Finance',     type: 'teal'  },
  { text: 'AT&T · Data Scientist',    type: 'coral' },
  { text: 'Self-directed Quant Study',type: 'coral' },
]

// ─── Articles ─────────────────────────────────────────────────────────────────
export const ARTICLES = [
  {
    tag: 'Medium · Statistics',
    title: 'I Tried to Fit a Line to Some Data and Ended Up Questioning How Reality Generates Points',
    excerpt:
      'A journey from ordinary least squares into the generative assumptions hiding beneath every regression model — and what happens when those assumptions break.',
    url: 'https://medium.com',
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
    institution: 'PES University',           // ← update with your actual university
    institutionShort: 'B.Tech CSE',
    location: 'India',
    period: '2021 - 2025',
    score: '8.64 / 10 CGPA',
    scoreType: 'cgpa' as const,
    icon: '⬡',
    highlights: [
      'Specialisation in Cybersecuirty, AI, and Data Science',
      'Published research paper at ICCCT 2025 (Springer Nature)',
      'Active participant in competitive programming and hackathons',
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
  title: 'Paper Under Publication',
  venue: 'International Conference on Communication and Computational Technologies',
  venueShort: 'ICCCT 2025',
  publisher: 'Springer Nature',
  series: 'Lecture Notes in Networks and Systems',
  seriesVolume: 'Volume 1674',
  proceedings: 'ICCCT 2025, Volume 5',
  releaseDate: 'April 1, 2026',
  springerUrl: 'https://link.springer.com/book/9789819534975',
  topics: ['Intelligent Systems', 'Artificial Intelligence', 'Machine Learning', 'Communication Technologies'],
  status: 'under-publication' as const,
  note: 'Presented at ICCCT 2025, National Forensic Sciences University Goa, India · Feb 14–15, 2025',
}

// ─── About Cards ─────────────────────────────────────────────────────────────
export const ABOUT_CARDS = [
  {
    icon: '∑',
    title: 'Where I Am Now',
    body: 'Data Scientist at AT&T, building ML systems for large-scale telco data — predictive modeling, anomaly detection, and statistical analysis in production.',
  },
  {
    icon: '→',
    title: 'Where I\'m Heading',
    body: 'Quantitative Research. I\'m drawn to the mathematical rigor of finance — stochastic calculus, risk models, option pricing, and algorithmic strategy design.',
  },
  {
    icon: '⬡',
    title: 'Building Agentic Systems',
    body: 'Actively building multi-agent AI pipelines using LangGraph and LangChain — stateful graphs, RAG systems, tool-using agents, and Reflexion-style self-improving loops.',
  },
  {
    icon: 'σ',
    title: 'What I\'m Studying',
    body: 'Shreve\'s Stochastic Calculus, Glasserman\'s Monte Carlo Methods, Gatheral\'s The Volatility Surface. Also grinding LeetCode for quant interview preparation.',
  },
]
