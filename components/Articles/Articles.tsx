import Reveal from '../Effects/Reveal'
import GlowCard from '../Effects/GlowCard'
import { ARTICLES } from '../../lib/constants'

export default function Articles() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {ARTICLES.map((a, i) => (
        <Reveal key={i} variant="fadeUp" delay={i * 100}>
          <GlowCard
            glowColor={a.status === 'published' ? '31,60,136' : '136,135,128'}
            style={{
              padding: '1.5rem',
              opacity: a.status === 'draft' ? 0.55 : 1,
              cursor: a.url ? 'pointer' : 'default',
            }}
          >
            <div onClick={() => a.url && window.open(a.url, '_blank')}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.55rem' }}>{a.tag}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.35 }}>{a.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink2)', lineHeight: 1.65 }}>{a.excerpt}</div>
              {a.url && (
                <div style={{ marginTop: '0.8rem', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>Read on Medium</span>
                  <span style={{ transition: 'transform 0.2s' }}>→</span>
                </div>
              )}
            </div>
          </GlowCard>
        </Reveal>
      ))}
    </div>
  )
}
