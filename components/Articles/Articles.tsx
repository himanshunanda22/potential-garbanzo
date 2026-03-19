// components/Articles/Articles.tsx
// Drop-in replacement. Adds a project card variant for entries with isProject: true.
// All existing cards are identical to the original — same GlowCard, Reveal, CSS vars.

import { useRouter } from 'next/router'
import Reveal from '../Effects/Reveal'
import GlowCard from '../Effects/GlowCard'
import { ARTICLES } from '../../lib/constants'

type Article = {
  tag: string
  title: string
  excerpt: string
  url: string | null
  status: 'published' | 'draft'
  isProject?: boolean
}

const STACK_TAGS = ['PyTorch', 'MDP', 'Double DQN', 'FastAPI', 'Online RL']

export default function Articles() {
  const router = useRouter()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(ARTICLES as Article[]).map((a, i) => {
        const isProject = !!a.isProject
        const isExternal = a.url?.startsWith('http') ?? false

        const handleClick = () => {
          if (!a.url) return
          if (isExternal) window.open(a.url, '_blank')
          else router.push(a.url)
        }

        return (
          <Reveal key={i} variant="fadeUp" delay={i * 100}>
            <GlowCard
              glowColor={isProject ? '31,60,136' : a.status === 'published' ? '31,60,136' : '136,135,128'}
              style={{
                padding: isProject ? '0' : '1.5rem',
                opacity: a.status === 'draft' ? 0.55 : 1,
                cursor: a.url ? 'pointer' : 'default',
                overflow: 'hidden',
              }}
            >
              {isProject ? (
                /* ── Project card — full-bleed header + body ── */
                <div onClick={handleClick}>
                  {/* Header strip matching your other section headers */}
                  <div style={{
                    background: 'var(--blue)',
                    padding: '0.7rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em' }}>
                      {a.tag.toUpperCase()}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '0.15rem 0.6rem', borderRadius: 100, background: 'rgba(78,205,196,0.2)', color: 'var(--teal)', border: '0.5px solid rgba(78,205,196,0.4)' }}>
                        ● live
                      </span>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.25rem 1.25rem 1rem' }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.35, color: 'var(--ink)' }}>
                      {a.title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--ink2)', lineHeight: 1.65, marginBottom: '1rem' }}>
                      {a.excerpt}
                    </div>

                    {/* Stack pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                      {STACK_TAGS.map(t => (
                        <span key={t} style={{
                          fontFamily: 'var(--mono)', fontSize: '10px',
                          padding: '0.15rem 0.55rem', borderRadius: 100,
                          border: '0.5px solid rgba(31,60,136,0.35)',
                          color: 'var(--blue)', background: 'rgba(31,60,136,0.05)',
                        }}>{t}</span>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', borderTop: '0.5px solid rgba(26,26,24,0.06)', paddingTop: '0.85rem' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span>Open playground</span>
                        <span>→</span>
                      </div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)' }}>
                        Simulation · Mathematics · Deep dive
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Standard article card — unchanged from original ── */
                <div onClick={handleClick}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.55rem' }}>
                    {a.tag}
                  </div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--ink2)', lineHeight: 1.65 }}>
                    {a.excerpt}
                  </div>
                  {a.url && (
                    <div style={{ marginTop: '0.8rem', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span>{isExternal ? 'Read on Medium' : 'Open →'}</span>
                      <span style={{ transition: 'transform 0.2s' }}>→</span>
                    </div>
                  )}
                </div>
              )}
            </GlowCard>
          </Reveal>
        )
      })}
    </div>
  )
}
