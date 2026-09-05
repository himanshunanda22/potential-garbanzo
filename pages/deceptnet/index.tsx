import { useState } from 'react'
import Reveal from '../../components/Effects/Reveal'
import DeceptNetLayout from '../../components/DeceptNet/DeceptNetLayout'

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

  return (
    <DeceptNetLayout title="DeceptNet v2 — Playground">
      <div className="deceptnet-page">
        <Reveal variant="fadeLeft" duration={600}>
          <div className="deceptnet-kicker">R&D Project</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={60} duration={650}>
          <h1 className="deceptnet-title">DeceptNet v2</h1>
        </Reveal>
        <Reveal variant="fadeUp" delay={120} duration={600}>
          <p className="deceptnet-subtitle">Cybersecurity × Reinforcement Learning</p>
        </Reveal>
        <Reveal variant="fadeUp" delay={160} duration={600}>
          <p className="deceptnet-summary">
            A middleware that uses a <strong className="deceptnet-emphasis">Markov Decision Process</strong> and <strong className="deceptnet-emphasis">Double DQN</strong> to intercept attacker sessions, respond with convincing fake data, and continuously learn optimal deception policies from live traffic.
          </p>
        </Reveal>
        <Reveal variant="fadeUp" delay={200} duration={600}>
          <div className="deceptnet-tag-list">
            {STACK.map(t => (
              <span key={t} className="deceptnet-tag">{t}</span>
            ))}
          </div>
        </Reveal>

        <Reveal variant="fadeLeft" duration={600}>
          <div className="deceptnet-section-header">How it works</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={60} duration={650}>
          <h2 className="deceptnet-section-title">The pipeline</h2>
        </Reveal>

        <Reveal variant="fadeUp" delay={100}>
          <div className="deceptnet-pipeline-shell">
            <div className="deceptnet-pipeline-header">
              <span className="deceptnet-pipeline-label">REQUEST_LIFECYCLE</span>
              <span className="deceptnet-pipeline-status" />
            </div>
            <div className="deceptnet-pipeline-grid">
              {PIPELINE.map((s, i) => (
                <div
                  key={s.step}
                  className={`deceptnet-pipeline-step ${i < 3 ? 'is-top-row' : ''} ${(i + 1) % 3 !== 0 ? 'has-right-border' : ''}`}
                >
                  <div className="deceptnet-pipeline-step-index">{s.step}</div>
                  <div className="deceptnet-pipeline-step-title">{s.title}</div>
                  <div className="deceptnet-pipeline-step-body">{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal variant="fadeLeft" duration={600}>
          <div className="deceptnet-section-header">Local gateway</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={60} duration={650}>
          <h2 className="deceptnet-section-title">Platform dashboard</h2>
        </Reveal>
        <Reveal variant="fadeUp" delay={100}>
          <p className="deceptnet-local-note">
            Requires the DeceptNet gateway running locally — <code className="deceptnet-inline-code">bash run.sh serve</code>
          </p>
        </Reveal>

        <Reveal variant="fadeUp" delay={140}>
          <div className="deceptnet-dashboard-shell">
            <button onClick={() => setOpen(o => !o)} className={`deceptnet-dashboard-toggle ${open ? 'is-open' : ''}`}>
              <div>
                <div className="deceptnet-dashboard-toggle-label">Live threat dashboard</div>
                <div className="deceptnet-dashboard-toggle-text">
                  Real-time intercept log, Q-value visualiser, threat type breakdown, MDP agent status
                </div>
              </div>
              <span className="deceptnet-dashboard-chevron">↓</span>
            </button>

            {open && (
              <div className="deceptnet-dashboard-body">
                <div className="deceptnet-dashboard-title">Start the gateway first</div>
                <div className="deceptnet-dashboard-copy">
                  The platform dashboard is a static file that connects to the FastAPI backend on :8000. Run <code className="deceptnet-inline-code">bash run.sh serve</code> then open it below.
                </div>
                <div className="deceptnet-dashboard-link-row">
                  <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer" className="deceptnet-primary-link">
                    Open platform dashboard ↗
                  </a>
                  <a href="https://github.com/himanshunanda22/DeceptNet" target="_blank" rel="noopener noreferrer" className="deceptnet-secondary-link">
                    GitHub repo ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal variant="fadeUp" delay={160}>
          <div className="deceptnet-terminal-shell">
            <div className="deceptnet-terminal-header">
              {[
                { color: 'terminal-red', value: '#ff5f57' },
                { color: 'terminal-yellow', value: '#febc2e' },
                { color: 'terminal-green', value: '#28c840' },
              ].map(dot => (
                <span key={dot.color} className={`deceptnet-terminal-dot ${dot.color}`} aria-hidden="true" />
              ))}
              <span className="deceptnet-terminal-caption">quick_start.sh</span>
            </div>
            <pre className="deceptnet-terminal-pre">
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
