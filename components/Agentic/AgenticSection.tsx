import Reveal from '../Effects/Reveal'
import GlowCard from '../Effects/GlowCard'
import { useState } from 'react'
import { AGENTIC_PROJECTS } from '../../lib/constants'

// ─── LangGraph diagram rendered as SVG ────────────────────────────────────────
function LangGraphDiagram() {
  const [hover, setHover] = useState<string | null>(null)

  const nodes = [
    { id: 'user',     x: 60,  y: 120, label: '__start__',   color: '#1F3C88', text: '#fff',            desc: 'Entry point. User query arrives here.' },
    { id: 'planner',  x: 220, y: 60,  label: 'Planner',     color: '#4ECDC4', text: '#0a4a46',          desc: 'Decomposes the task into sub-goals and decides which tools to invoke.' },
    { id: 'executor', x: 380, y: 120, label: 'Executor',    color: '#FF6B6B', text: '#5a0000',          desc: 'Runs tools: API calls, code execution, data retrieval.' },
    { id: 'critic',   x: 380, y: 240, label: 'Critic',      color: '#D4A017', text: '#4a2a00',          desc: 'Evaluates output quality. Routes back to Planner if unsatisfied.' },
    { id: 'memory',   x: 220, y: 240, label: 'Memory',      color: '#7B61FF', text: '#fff',             desc: 'Persists state between steps. Vector store + conversation buffer.' },
    { id: 'end',      x: 540, y: 165, label: '__end__',     color: '#27ae60', text: '#fff',             desc: 'Final answer returned to user after Critic approves.' },
  ]

  const edges = [
    { from: 'user',     to: 'planner',  label: 'query'    },
    { from: 'planner',  to: 'executor', label: 'sub-tasks' },
    { from: 'executor', to: 'critic',   label: 'output'   },
    { from: 'critic',   to: 'planner',  label: 'revise', dashed: true },
    { from: 'critic',   to: 'end',      label: 'approve'  },
    { from: 'executor', to: 'memory',   label: 'store'    },
    { from: 'memory',   to: 'planner',  label: 'recall'   },
  ]

  const getNode = (id: string) => nodes.find(n => n.id === id)!
  const cx = (n: ReturnType<typeof getNode>) => n.x + 52
  const cy = (n: ReturnType<typeof getNode>) => n.y + 18

  return (
    <div style={{ border: '0.5px solid var(--border)', borderRadius: 12, background: '#fff', overflow: 'hidden' }}>
      <div style={{ background: 'var(--blue)', padding: '0.7rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em' }}>LANGGRAPH.STATE_MACHINE</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>hover nodes to explore</span>
      </div>
      <div style={{ padding: '1rem', background: '#fafaf8', position: 'relative' }}>
        <svg width="100%" viewBox="0 0 660 320" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M1 1L9 5L1 9" fill="none" stroke="#1F3C88" strokeWidth="1.5" strokeLinecap="round" />
            </marker>
            <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M1 1L9 5L1 9" fill="none" stroke="#888780" strokeWidth="1.5" strokeLinecap="round" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((e, i) => {
            const from = getNode(e.from), to = getNode(e.to)
            const x1 = cx(from), y1 = cy(from), x2 = cx(to), y2 = cy(to)
            const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={e.dashed ? '#888780' : '#1F3C88'}
                  strokeWidth="1" strokeDasharray={e.dashed ? '5 4' : 'none'}
                  markerEnd={`url(#${e.dashed ? 'arr-gray' : 'arr-blue'})`}
                  opacity={e.dashed ? 0.5 : 0.35}
                />
                <text x={mx} y={my - 5} textAnchor="middle"
                  style={{ fontSize: '9px', fontFamily: 'var(--mono)', fill: e.dashed ? '#888' : '#444' }}
                >{e.label}</text>
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map(n => (
            <g key={n.id}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={n.x} y={n.y} width={104} height={36} rx={7}
                fill={n.color}
                opacity={hover === n.id ? 1 : 0.88}
                style={{ transition: 'opacity 0.15s' }}
              />
              <text x={n.x + 52} y={n.y + 22} textAnchor="middle"
                style={{ fontSize: '11px', fontFamily: 'var(--mono)', fontWeight: 500, fill: n.text, userSelect: 'none' }}
              >{n.label}</text>
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        <div style={{
          minHeight: '40px', padding: '0.5rem 0',
          fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink2)',
          transition: 'opacity 0.2s',
          opacity: hover ? 1 : 0,
          borderTop: '0.5px solid var(--border2)',
          marginTop: '0.5rem',
        }}>
          {hover && <>
            <span style={{ color: 'var(--blue)', fontWeight: 500 }}>{getNode(hover).label}:</span>{' '}
            {getNode(hover).desc}
          </>}
        </div>
      </div>
    </div>
  )
}

// ─── Tech stack pills ─────────────────────────────────────────────────────────
function StackPill({ label }: { label: string }) {
  const colors: Record<string, string> = {
    LangGraph: 'var(--blue)', LangChain: '#2a8a86', Python: '#D4A017',
    OpenAI: 'var(--ink2)', FAISS: 'var(--coral)', pandas: '#27ae60',
    yfinance: '#27ae60', Whisper: '#7B61FF', FastAPI: '#7B61FF', PyMuPDF: 'var(--ink3)',
  }
  const c = colors[label] || 'var(--ink3)'
  return (
    <span style={{
      fontFamily: 'var(--mono)', fontSize: '10px', padding: '0.15rem 0.55rem',
      borderRadius: 100, border: `0.5px solid ${c}`, color: c,
      background: `${c}0d`, // 5% alpha
    }}>
      {label}
    </span>
  )
}

// ─── Concept chips ────────────────────────────────────────────────────────────
function ConceptChip({ label }: { label: string }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)', fontSize: '10px', padding: '0.15rem 0.55rem',
      borderRadius: 4, background: 'rgba(31,60,136,0.06)', color: 'var(--blue)',
    }}>
      {label}
    </span>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: 'complete' | 'building' }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)', fontSize: '10px', padding: '0.15rem 0.55rem',
      borderRadius: 100,
      background: status === 'complete' ? 'rgba(39,174,96,0.1)' : 'rgba(212,160,23,0.1)',
      color: status === 'complete' ? 'var(--green)' : 'var(--gold)',
      border: `0.5px solid ${status === 'complete' ? 'var(--green)' : 'var(--gold)'}`,
    }}>
      {status === 'complete' ? '✓ complete' : '⬡ building'}
    </span>
  )
}

// ─── Framework explainer cards ────────────────────────────────────────────────
const FRAMEWORKS = [
  {
    name: 'LangChain',
    tagline: 'The composable LLM framework',
    color: '#2a8a86',
    points: [
      'Chains: sequence prompts, tools, and parsers into pipelines',
      'Document loaders + text splitters for RAG ingestion',
      'Vector store integrations: FAISS, Chroma, Pinecone',
      'Output parsers: structured JSON, Pydantic models',
      'RetrievalQA, ConversationalRetrievalChain out of the box',
    ],
  },
  {
    name: 'LangGraph',
    tagline: 'Stateful multi-actor graphs',
    color: '#1F3C88',
    points: [
      'Nodes are Python functions or LLM agents',
      'Typed state dict flows between nodes via edges',
      'Conditional edges for dynamic routing & branching',
      'Human-in-the-loop: interrupt and resume at any node',
      'Built-in persistence: checkpoint state across runs',
    ],
  },
  {
    name: 'Agentic Patterns',
    tagline: 'Design patterns for autonomous AI',
    color: '#7B61FF',
    points: [
      'ReAct: Reason → Act → Observe loop',
      'Reflexion: Actor + Evaluator + Self-reflection memory',
      'Plan-and-Execute: Planner decomposes, Executor runs',
      'Multi-agent: specialized agents collaborate via message passing',
      'Tool use: web search, code execution, API calls, DB queries',
    ],
  },
]

// ─── Main export ──────────────────────────────────────────────────────────────
// Animated version
export default function AgenticSection() {
  return (
    <div>
      {/* Framework explainers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {FRAMEWORKS.map(fw => (
          <div key={fw.name} style={{ border: '0.5px solid var(--border)', borderRadius: 10, background: '#fff', overflow: 'hidden' }}>
            <div style={{ padding: '0.75rem 1.1rem', borderBottom: '0.5px solid var(--border2)', background: `${fw.color}09` }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: 700, color: fw.color }}>{fw.name}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', marginTop: '0.15rem' }}>{fw.tagline}</div>
            </div>
            <ul style={{ listStyle: 'none', padding: '0.75rem 1.1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {fw.points.map((pt, i) => (
                <li key={i} style={{ fontSize: '12px', color: 'var(--ink2)', lineHeight: 1.5, display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <span style={{ color: fw.color, flexShrink: 0, marginTop: '1px' }}>›</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* LangGraph state machine diagram */}
      <div style={{ marginBottom: '2rem' }}>
        <LangGraphDiagram />
      </div>

      {/* Projects grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {AGENTIC_PROJECTS.map(proj => (
          <div key={proj.title} style={{ border: '0.5px solid var(--border)', borderRadius: 10, background: '#fff', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '20px', color: 'var(--blue)', opacity: 0.3 }}>{proj.icon}</span>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 700, lineHeight: 1.3 }}>{proj.title}</div>
              </div>
              <StatusBadge status={proj.status} />
            </div>
            {/* Description */}
            <p style={{ fontSize: '13px', color: 'var(--ink2)', lineHeight: 1.65, margin: 0 }}>{proj.desc}</p>
            {/* Stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {proj.stack.map(s => <StackPill key={s} label={s} />)}
            </div>
            {/* Concepts */}
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Key concepts</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {proj.concepts.map(c => <ConceptChip key={c} label={c} />)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Code snippet preview */}
      <div style={{ marginTop: '1.5rem', border: '0.5px solid var(--border)', borderRadius: 10, overflow: 'hidden', background: '#1a1a18' }}>
        <div style={{ background: '#252522', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
          <span style={{ color: '#555', fontSize: '11px', marginLeft: '0.5rem', fontFamily: 'var(--mono)' }}>market_analyst_graph.py</span>
        </div>
        <pre style={{ padding: '1.25rem', margin: 0, fontSize: '12px', lineHeight: 1.75, overflowX: 'auto', fontFamily: 'var(--mono)', color: '#c8f6c8' }}>
{`from langgraph.graph import StateGraph, END
from typing import TypedDict, List

class AgentState(TypedDict):
    query: str
    plan: List[str]
    results: List[str]
    critique: str
    final_answer: str

# Build the graph
graph = StateGraph(AgentState)

graph.add_node("planner",  planner_node)   # decomposes query → sub-tasks
graph.add_node("executor", executor_node)  # runs tools, fetches data
graph.add_node("critic",   critic_node)    # evaluates, routes or approves
graph.add_node("memory",   memory_node)    # persists + retrieves state

graph.set_entry_point("planner")
graph.add_edge("planner",  "executor")
graph.add_edge("executor", "critic")
graph.add_edge("executor", "memory")
graph.add_edge("memory",   "planner")

# Conditional edge: revise if critic unsatisfied
graph.add_conditional_edges(
    "critic",
    lambda s: "planner" if s["critique"] == "revise" else END
)

app = graph.compile()
result = app.invoke({"query": "Analyse NVDA earnings sentiment"})`}
        </pre>
      </div>
    </div>
  )
}
