import { useState, useRef } from 'react'

type LineType = 'cmd' | 'out' | 'err' | 'sys'
interface Line { type: LineType; text: string }

const COMMANDS: Record<string, { out: string; hint?: string }> = {
  help:             { out: 'COMMANDS:\n  monte carlo      — GBM path sampling\n  simulate market  — strategy playground\n  random walk      — pure Brownian motion\n  gradient descent — θ := θ - α∇L(θ)\n  bayes theorem    — posterior update\n  langgraph        — multi-agent graph info\n  clear            — clear terminal' },
  'monte carlo':    { out: '→ Sampling geometric Brownian motion\n→ μ=0.08, σ=0.20, N=252 trading days\n→ dS = μS dt + σS dWt\n→ Scroll to playground ↓', hint: 'playground' },
  'simulate market':{ out: '→ Initializing strategy simulator\n→ Strategies: momentum | mean-reversion | pairs | GBM\n→ Scroll to playground ↓', hint: 'playground' },
  'random walk':    { out: '→ dX_t = σ dW_t  (zero drift)\n→ A Wiener process. No signal, just noise.\n→ This is what markets look like without edge.' },
  'gradient descent':{ out: '→ θ := θ - α∇L(θ)\n→ Iterating toward minimum loss...\n→ Learning rate: 0.01 | Converged at step 847' },
  'bayes theorem':  { out: '→ P(θ|X) ∝ P(X|θ) · P(θ)\n→ Prior beliefs revised with new evidence.\n→ Posterior is sharper. Uncertainty reduced.' },
  langgraph:        { out: '→ LangGraph: stateful multi-actor graphs\n→ Nodes = agents or tools\n→ Edges = typed state transitions\n→ Scroll to agentic AI section ↓', hint: 'agentic' },
  clear:            { out: '__CLEAR__' },
}

export default function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { type: 'sys', text: 'Mathematical playground. Type "help" for commands.' },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const run = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    const cmd = input.trim().toLowerCase()
    setInput('')
    if (!cmd) return

    const found = COMMANDS[cmd]
    if (!found) {
      setHistory(h => [...h, { type: 'cmd', text: cmd }, { type: 'err', text: `"${cmd}" not found. Try "help".` }])
      return
    }
    if (found.out === '__CLEAR__') { setHistory([]); return }

    setHistory(h => [...h, { type: 'cmd', text: cmd }, { type: 'out', text: found.out }])

    if (found.hint) {
      setTimeout(() => document.getElementById(found.hint!)?.scrollIntoView({ behavior: 'smooth' }), 800)
    }

    setTimeout(() => bodyRef.current?.scrollTo(0, 9999), 50)
  }

  return (
    <div style={{ background: '#1a1a18', borderRadius: 10, overflow: 'hidden', fontFamily: 'var(--mono)', cursor: 'text' }} onClick={() => inputRef.current?.focus()}>
      {/* Title bar */}
      <div style={{ background: '#252522', padding: '0.45rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
        <span style={{ color: '#555', fontSize: '11px', marginLeft: '0.5rem' }}>himanshu@quant ~ </span>
      </div>
      {/* Body */}
      <div ref={bodyRef} style={{ padding: '1rem', minHeight: '90px', maxHeight: '240px', overflowY: 'auto' }}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '2px' }}>
            {line.type === 'cmd' && <div style={{ fontSize: '12px', color: '#c8f6c8' }}><span style={{ color: '#4ECDC4' }}>$ </span>{line.text}</div>}
            {line.type === 'out'  && <div style={{ fontSize: '11px', color: '#888', paddingLeft: '1rem', borderLeft: '2px solid #4ECDC4', margin: '3px 0 6px', whiteSpace: 'pre', lineHeight: 1.8 }}>{line.text}</div>}
            {line.type === 'err'  && <div style={{ fontSize: '11px', color: 'var(--coral)', paddingLeft: '1rem', margin: '2px 0 4px' }}>{line.text}</div>}
            {line.type === 'sys'  && <div style={{ fontSize: '12px', color: '#4ECDC4', marginBottom: '4px' }}>{line.text}</div>}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
          <span style={{ color: '#4ECDC4', fontSize: '12px' }}>$</span>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={run} placeholder="enter command..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#c8f6c8', fontFamily: 'var(--mono)', fontSize: '12px', flex: 1, caretColor: '#4ECDC4' }} />
        </div>
      </div>
    </div>
  )
}
