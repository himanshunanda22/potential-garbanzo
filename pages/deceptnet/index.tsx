import { useState } from 'react'
import { useRouter } from 'next/router'
import Reveal from '../../components/Effects/Reveal'
import GlowCard from '../../components/Effects/GlowCard'
import DeceptNetLayout from '../../components/DeceptNet/DeceptNetLayout'

// ── Sub-page cards ─────────────────────────────────────────────────────────────
const SUB_PAGES = [
  {
    href: '/deceptnet/simulation',
    tag: 'Interactive · 3 scenarios',
    title: 'Session simulation',
    excerpt: 'Step through a complete attacker session request by request — feature extraction, ThreatNet classification, MDP state building, Q-value computation, deception response, footprint capture, and Bellman update, all animated live.',
    glow: '31,60,136',
  },
  {
    href: '/deceptnet/explainer',
    tag: 'Reference · MathJax rendered',
    title: 'Architecture & mathematics',
    excerpt: 'MDP formulation, state encoding, Bellman optimality, Double DQN target, reward shaping, and training pipeline — every equation typeset and linked to the code that implements it.',
    glow: '78,205,196',
  },
  {
    href: '/deceptnet/deep-explainer',
    tag: 'Deep dive · 7 chapters',
    title: 'From classifier to decision engine',
    excerpt: 'The complete story: why v1 wasn\'t enough, what the finite-to-infinite projection means mathematically, the Bellman equation derived from scratch, Double DQN explained, and interactive demos throughout.',
    glow: '123,97,255',
  },
]

// ── Pipeline steps ─────────────────────────────────────────────────────────────
const PIPELINE = [
  { step: '01', title: 'Intercept',  body: 'FastAPI middleware captures every HTTP request before it reaches the protected route.' },
  { step: '02', title: 'Classify',   body: 'ThreatNet (3-layer MLP) outputs p̂ ∈ [0,1] and attack type across 5 classes.' },
  { step: '03', title: 'Decide',     body: 'MDP agent evaluates Q(s,a) across 4 actions on the 104-dim session state, picks argmax.' },
  { step: '04', title: 'Deceive',    body: 'Returns convincing fake HTTP 200 — standard, enriched, or critical by action chosen.' },
  { step: '05', title: 'Capture',    body: 'IP, UA, payload hash, Q-values written to SQLite. Session depth and reward computed.' },
  { step: '06', title: 'Learn',      body: 'Bellman update via Double DQN. Policy improves continuously on every real attacker request.' },
]

const STACK = ['PyTorch', 'FastAPI', 'Double DQN', 'MDP', 'Online RL', 'SQLite']

export default function DeceptNetIndex() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <DeceptNetLayout title="DeceptNet v2 — Playground">
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '5rem 2rem 4rem' }}>

        {/* ── Hero ── */}
        <Reveal variant="fadeLeft" duration={600}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            R&D Project
          </div>
        </Reveal>
        <Reveal variant="fadeUp" delay={60} duration={650}>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--ink)', lineHeight: 1.1 }}>
            DeceptNet v2
          </h1>
        </Reveal>
        <Reveal variant="fadeUp" delay={120} duration={600}>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--ink2)', marginBottom: '1.25rem' }}>
            Cybersecurity × Reinforcement Learning
          </p>
        </Reveal>
        <Reveal variant="fadeUp" delay={160} duration={600}>
          <p style={{ fontSize: '15px', color: 'var(--ink2)', maxWidth: '580px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            A middleware that uses a <strong style={{ color: 'var(--ink)' }}>Markov Decision Process</strong> and <strong style={{ color: 'var(--ink)' }}>Double DQN</strong> to intercept attacker sessions, respond with convincing fake data, and continuously learn optimal deception policies from live traffic.
          </p>
        </Reveal>
        <Reveal variant="fadeUp" delay={200} duration={600}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '3rem' }}>
            {STACK.map(t => (
              <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '11px', padding: '0.2rem 0.65rem', borderRadius: 100, border: '0.5px solid rgba(31,60,136,0.35)', color: 'var(--blue)', background: 'rgba(31,60,136,0.05)' }}>{t}</span>
            ))}
          </div>
        </Reveal>

        {/* ── Sub-page cards ── */}
        <Reveal variant="fadeLeft" duration={600}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Explore</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={60} duration={650}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--ink)' }}>
            Sections
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
          {SUB_PAGES.map((p, i) => (
            <Reveal key={p.href} variant="fadeUp" delay={i * 80}>
              <GlowCard
                glowColor={p.glow}
                style={{ padding: '1.5rem', cursor: 'pointer' }}
              >
                <div onClick={() => router.push(p.href)}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.55rem' }}>
                    {p.tag}
                  </div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--ink2)', lineHeight: 1.65 }}>
                    {p.excerpt}
                  </div>
                  <div style={{ marginTop: '0.8rem', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>Open</span><span>→</span>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        {/* ── Pipeline ── */}
        <Reveal variant="fadeLeft" duration={600}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>How it works</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={60} duration={650}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--ink)' }}>
            The pipeline
          </h2>
        </Reveal>

        <Reveal variant="fadeUp" delay={100}>
          <div style={{ border: '0.5px solid rgba(26,26,24,0.1)', borderRadius: 12, background: '#fff', overflow: 'hidden', marginBottom: '3rem' }}>
            <div style={{ background: 'var(--blue)', padding: '0.7rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em' }}>REQUEST_LIFECYCLE</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '0' }}>
              {PIPELINE.map((s, i) => (
                <div key={s.step} style={{
                  padding: '1rem 1.25rem',
                  borderRight: (i + 1) % 3 !== 0 ? '0.5px solid rgba(26,26,24,0.07)' : 'none',
                  borderBottom: i < 3 ? '0.5px solid rgba(26,26,24,0.07)' : 'none',
                }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>{s.step}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.3rem' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink2)', lineHeight: 1.6 }}>{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Live dashboard toggle ── */}
        <Reveal variant="fadeLeft" duration={600}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Local gateway</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={60} duration={650}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--ink)' }}>
            Platform dashboard
          </h2>
        </Reveal>
        <Reveal variant="fadeUp" delay={100}>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ink2)', marginBottom: '1rem' }}>
            Requires the DeceptNet gateway running locally — <code style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)' }}>bash run.sh serve</code>
          </p>
        </Reveal>

        <Reveal variant="fadeUp" delay={140}>
          <div style={{ border: '0.5px solid rgba(26,26,24,0.1)', borderRadius: 12, background: '#fff', overflow: 'hidden', marginBottom: '1rem' }}>
            <button
              onClick={() => setOpen(o => !o)}
              style={{
                width: '100%', padding: '1rem 1.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: open ? 'rgba(31,60,136,0.03)' : 'transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                transition: 'background 0.2s',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--coral)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  Live threat dashboard
                </div>
                <div style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: 1.4 }}>
                  Real-time intercept log, Q-value visualiser, threat type breakdown, MDP agent status
                </div>
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--ink3)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)', display: 'inline-block', flexShrink: 0, marginLeft: '1rem' }}>↓</span>
            </button>

            {open && (
              <div style={{ borderTop: '0.5px solid rgba(26,26,24,0.07)', padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Start the gateway first
                </div>
                <div style={{ fontSize: '13px', color: 'var(--ink2)', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto 1.25rem' }}>
                  The platform dashboard is a static file that connects to the FastAPI backend on :8000. Run <code style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)' }}>bash run.sh serve</code> then open it below.
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="http://localhost:8000" target="_blank" rel="noreferrer"
                    style={{ fontFamily: 'var(--mono)', fontSize: '12px', padding: '0.5rem 1.1rem', background: 'var(--blue)', color: '#fff', borderRadius: 6, textDecoration: 'none' }}>
                    Open platform dashboard ↗
                  </a>
                  <a href="https://github.com/himanshunanda22/DeceptNet" target="_blank" rel="noreferrer"
                    style={{ fontFamily: 'var(--mono)', fontSize: '12px', padding: '0.5rem 1.1rem', background: 'transparent', color: 'var(--blue)', border: '0.5px solid rgba(31,60,136,0.35)', borderRadius: 6, textDecoration: 'none' }}>
                    GitHub repo ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* ── Quick start ── */}
        <Reveal variant="fadeUp" delay={160}>
          <div style={{ border: '0.5px solid rgba(26,26,24,0.1)', borderRadius: 12, background: '#1a1a18', overflow: 'hidden' }}>
            <div style={{ background: '#252522', padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
              <span style={{ color: '#555', fontSize: '11px', marginLeft: '0.5rem', fontFamily: 'var(--mono)' }}>quick_start.sh</span>
            </div>
            <pre style={{ padding: '1.25rem', margin: 0, fontSize: '12px', lineHeight: 2, overflowX: 'auto', fontFamily: 'var(--mono)', color: '#c8f6c8' }}>
              {`# Install dependencies
              pip install -r requirements.txt

              # Train classifier + pre-train MDP Q-network
              bash run.sh train

              # Start the gateway on :8000
              bash run.sh serve

              # Simulate attacks (new terminal)
              bash run.sh test

              # Open platform dashboard
              open deceptive-nn-v2/platform/index.html`}
            </pre>
          </div>
        </Reveal>

      </div>
    </DeceptNetLayout>
  )
}
