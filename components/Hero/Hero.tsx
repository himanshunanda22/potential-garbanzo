import dynamic from 'next/dynamic'
import Reveal from '../Effects/Reveal'
import MagneticButton from '../Effects/MagneticButton'
import Typewriter from '../Effects/TypewriterText'
import { PERSON, SKILLS } from '../../lib/constants'

const ParticleField = dynamic(() => import('../Effects/ParticleField'), { ssr: false })

const EQUATIONS = [
  { text: '∇f(x)',    top: '18px',  left: '42px',  opacity: 0.22, fontSize: '16px', delay: '0s'    },
  { text: '∫e^x dx', top: '58px',  left: '135px', opacity: 0.15, fontSize: '13px', delay: '0.8s'  },
  { text: 'P(A|B)',   top: '105px', left: '20px',  opacity: 0.12, fontSize: '13px', delay: '1.5s'  },
  { text: 'σ²',       top: '148px', left: '175px', opacity: 0.18, fontSize: '15px', delay: '0.4s'  },
  { text: 'E[X|ℱ_t]',top: '192px', left: '62px',  opacity: 0.10, fontSize: '13px', delay: '2.1s'  },
  { text: 'Σ_ij',     top: '52px',  left: '205px', opacity: 0.17, fontSize: '14px', delay: '1.2s'  },
  { text: 'dW_t',     top: '168px', left: '138px', opacity: 0.12, fontSize: '13px', delay: '0.6s'  },
  { text: 'β',        top: '88px',  left: '88px',  opacity: 0.09, fontSize: '18px', delay: '1.8s'  },
]

const chipColor = (type: string) => ({
  blue:  { border: 'rgba(31,60,136,0.35)',  color: 'var(--blue)',  bg: 'rgba(31,60,136,0.05)'  },
  teal:  { border: 'rgba(78,205,196,0.45)', color: '#1d8a86',     bg: 'rgba(78,205,196,0.07)' },
  coral: { border: 'rgba(255,107,107,0.4)', color: '#d94f4f',     bg: 'rgba(255,107,107,0.06)'},
}[type] ?? { border: 'rgba(26,26,24,0.15)', color: 'var(--ink2)', bg: 'transparent' })

export default function Hero({
  onPlayground, onResearch,
}: { onPlayground: () => void; onResearch: () => void }) {

  return (
    <section id="hero" style={{
      position: 'relative',
      padding: '7rem 2rem 5rem',
      maxWidth: '860px',
      margin: '0 auto',
      overflow: 'visible',
    }}>

      {/* Particle math symbols rising up — subtle ambient layer */}
      <ParticleField />

      {/* Floating equations top-right — the original aesthetic, always present */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: '4rem',
        width: '270px',
        height: '280px',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        {EQUATIONS.map((eq, i) => (
          <span key={i} style={{
            position: 'absolute',
            fontFamily: 'var(--mono)',
            color: 'var(--blue)',
            userSelect: 'none',
            top: eq.top,
            left: eq.left,
            opacity: eq.opacity,
            fontSize: eq.fontSize,
            animation: `float ${3.5 + i * 0.35}s ease-in-out infinite`,
            animationDelay: eq.delay,
          }}>
            {eq.text}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <Reveal variant="fadeUp" delay={0} duration={700}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--coral)',
            letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.1rem',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--coral)', display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            {PERSON.role} → {PERSON.aspiration}
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal variant="fadeUp" delay={120} duration={800}>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            fontWeight: 700, lineHeight: 1.08,
            marginBottom: '0.5rem', color: 'var(--ink)',
          }}>
            Mathematics is<br />
            the language of{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>uncertainty.</em>
          </h1>
        </Reveal>

        {/* Typewriter subline */}
        <Reveal variant="fadeUp" delay={280} duration={700}>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: '1.1rem',
            color: 'var(--ink2)', fontStyle: 'italic',
            marginBottom: '1.75rem', minHeight: '1.8rem',
          }}>
            Currently building:{' '}
            <Typewriter
              words={[
                'LangGraph multi-agent systems.',
                'Monte Carlo simulations.',
                'Quant strategy backtests.',
                'Stochastic process models.',
                'RAG pipelines for finance.',
              ]}
              style={{ color: 'var(--blue)' }}
            />
          </div>
        </Reveal>

        {/* Bio */}
        <Reveal variant="fadeUp" delay={380} duration={700}>
          <p style={{
            fontSize: '15px', color: 'var(--ink2)',
            maxWidth: '560px', lineHeight: 1.8, marginBottom: '2rem',
          }}>
            I&apos;m a {PERSON.age}-year-old data scientist at {PERSON.company}, building toward
            quantitative research. I study stochastic calculus, build agentic AI systems with
            LangGraph, and work at the intersection of ML, finance, and rigorous mathematics.
          </p>
        </Reveal>

        {/* Skill chips */}
        <Reveal variant="fadeUp" delay={460} duration={700}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2.5rem' }}>
            {SKILLS.map((s, i) => {
              const c = chipColor(s.type)
              return (
                <span key={s.text} style={{
                  fontFamily: 'var(--mono)', fontSize: '11px',
                  padding: '0.28rem 0.75rem', borderRadius: '100px',
                  border: `0.5px solid ${c.border}`, color: c.color, background: c.bg,
                  opacity: 0,
                  animation: `fadeIn 0.5s ease forwards`,
                  animationDelay: `${600 + i * 55}ms`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-2px)'
                    el.style.boxShadow = `0 4px 12px rgba(31,60,136,0.1)`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = ''
                    el.style.boxShadow = ''
                  }}
                >
                  {s.text}
                </span>
              )
            })}
          </div>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal variant="fadeUp" delay={560} duration={700}>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <MagneticButton
              onClick={onPlayground}
              style={{
                fontFamily: 'var(--mono)', fontSize: '12px', padding: '0.6rem 1.3rem',
                background: 'var(--blue)', color: '#fff', borderRadius: 7,
                letterSpacing: '0.02em', boxShadow: '0 4px 20px rgba(31,60,136,0.25)',
              }}
            >
              ⬡ Quant Playground
            </MagneticButton>
            <MagneticButton
              onClick={() => document.getElementById('agentic')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: 'var(--mono)', fontSize: '12px', padding: '0.6rem 1.3rem',
                background: 'transparent', color: 'var(--blue)',
                border: '0.5px solid rgba(31,60,136,0.35)', borderRadius: 7,
              }}
            >
              Agentic AI
            </MagneticButton>
            <MagneticButton
              onClick={onResearch}
              style={{
                fontFamily: 'var(--mono)', fontSize: '12px', padding: '0.6rem 1.3rem',
                background: 'transparent', color: 'var(--blue)',
                border: '0.5px solid rgba(31,60,136,0.35)', borderRadius: 7,
              }}
            >
              Research
            </MagneticButton>
            <MagneticButton
              href="/resume.pdf"
              style={{
                fontFamily: 'var(--mono)', fontSize: '12px', padding: '0.6rem 1.3rem',
                background: 'transparent', color: 'var(--ink3)',
                border: '0.5px solid rgba(26,26,24,0.18)', borderRadius: 7,
              }}
            >
              Resume ↓
            </MagneticButton>
          </div>
        </Reveal>

        {/* Scroll indicator */}
        <Reveal variant="fadeIn" delay={1200} duration={800}>
          <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 1, height: 40,
              background: 'linear-gradient(to bottom, transparent, rgba(26,26,24,0.2))',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '10px',
              color: 'var(--ink3)', letterSpacing: '0.1em',
            }}>
              SCROLL TO EXPLORE
            </span>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
