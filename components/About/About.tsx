import dynamic from 'next/dynamic'
import Reveal from '../Effects/Reveal'
import GlowCard from '../Effects/GlowCard'
import { ProgressBar } from '../Effects/SmoothProgress'
import { ABOUT_CARDS } from '../../lib/constants'

const GaussianCurve = dynamic(() => import('../GaussianCurve/GaussianCurve'), { ssr: false })
const Terminal = dynamic(() => import('../Scene/Terminal'), { ssr: false })

const SKILLS_BARS = [
  { label: 'Machine Learning & Statistical Modeling', value: 88, color: 'var(--blue)', delay: 0 },
  { label: 'Python (pandas, sklearn, PyTorch)', value: 85, color: 'var(--blue)', delay: 80 },
  { label: 'LangChain / LangGraph / Agentic AI', value: 72, color: 'var(--teal)', delay: 160 },
  { label: 'Stochastic Calculus (self-study)', value: 55, color: 'var(--coral)', delay: 240 },
  { label: 'Quantitative Finance Foundations', value: 50, color: 'var(--coral)', delay: 320 },
  { label: 'SQL & Data Engineering', value: 80, color: 'var(--blue)', delay: 400 },
]

export default function About() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        {ABOUT_CARDS.map((card, i) => (
          <Reveal key={card.title} variant="fadeUp" delay={i * 80}>
            <GlowCard style={{ padding: '1.25rem', height: '100%' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '22px', color: 'var(--blue)', opacity: 0.25, marginBottom: '0.6rem' }}>{card.icon}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{card.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink2)', lineHeight: 1.65 }}>{card.body}</div>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      {/* Skills progress bars */}
      <Reveal variant="fadeUp" delay={100}>
        <div style={{ border: '0.5px solid rgba(26,26,24,0.1)', borderRadius: 12, background: '#fff', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.1rem' }}>Skill Proficiency</div>
          {SKILLS_BARS.map(s => <ProgressBar key={s.label} label={s.label} value={s.value} color={s.color} delay={s.delay} />)}
        </div>
      </Reveal>

      <Reveal variant="fadeUp" delay={150}>
        <GaussianCurve />
      </Reveal>

      <Reveal variant="fadeUp" delay={200}>
        <div style={{ marginTop: '2rem' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Easter Egg · Terminal</div>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ink2)', marginBottom: '0.8rem' }}>
            Try: {['monte carlo', 'simulate market', 'random walk', 'langgraph'].map((cmd, i) => (
              <span key={cmd}><code style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)' }}>{cmd}</code>{i < 3 ? ' · ' : ''}</span>
            ))}
          </p>
          <Terminal />
        </div>
      </Reveal>
    </div>
  )
}
