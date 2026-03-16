import Reveal from '../Effects/Reveal'
import GlowCard from '../Effects/GlowCard'
import { RESEARCH } from '../../lib/constants'

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '0.7rem 1.25rem', borderBottom: '0.5px solid rgba(26,26,24,0.06)', alignItems: 'flex-start', transition: 'background 0.2s' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(31,60,136,0.02)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
    >
      <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)', width: 110, flexShrink: 0, paddingTop: '2px' }}>{label}</span>
      <span style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: 1.5 }}>{value}</span>
    </div>
  )
}

export default function ResearchSection() {
  const metaRows = [
    { label: 'Proceedings', value: RESEARCH.proceedings },
    { label: 'Conference',  value: 'ICCCT 2025 — 7th International Conference on Communication & Computational Technologies' },
    { label: 'Organised by',value: 'Soft Computing Research Society (SCRS) & National Forensic Sciences University, Goa, India' },
    { label: 'Publisher',   value: 'Springer Nature Singapore' },
    { label: 'Series',      value: `${RESEARCH.series}, Vol. 1674` },
    { label: 'Release date',value: RESEARCH.releaseDate },
    { label: 'ISBN',        value: '978-981-95-3497-5 (print) · 978-981-95-3498-2 (eBook)' },
  ]

  return (
    <div>
      <Reveal variant="scaleIn" delay={0}>
        <GlowCard glowColor="31,60,136" style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ background: 'var(--blue)', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em' }}>RESEARCH_PUBLICATION</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '0.2rem 0.65rem', borderRadius: 100, background: 'rgba(255,193,7,0.2)', color: '#ffc107', border: '0.5px solid rgba(255,193,7,0.4)' }}>⧖ under publication</span>
          </div>

          {/* Badges + title */}
          <div style={{ padding: '1.5rem 1.25rem', borderBottom: '0.5px solid rgba(26,26,24,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {[
                { text: 'SPRINGER NATURE', color: 'var(--gold)', bg: 'rgba(212,160,23,0.1)', border: 'rgba(212,160,23,0.35)' },
                { text: `LNNS · ${RESEARCH.seriesVolume}`, color: 'var(--blue)', bg: 'rgba(31,60,136,0.07)', border: 'rgba(31,60,136,0.2)' },
                { text: 'ICCCT 2025', color: 'var(--coral)', bg: 'rgba(255,107,107,0.07)', border: 'rgba(255,107,107,0.3)' },
              ].map(badge => (
                <div key={badge.text} style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.06em', padding: '0.2rem 0.65rem', borderRadius: 4, background: badge.bg, color: badge.color, border: `0.5px solid ${badge.border}` }}>{badge.text}</div>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.35, marginBottom: '0.5rem' }}>Paper Title to be Updated Upon Full Publication</div>
            <div style={{ fontSize: '13px', color: 'var(--ink2)', lineHeight: 1.7, maxWidth: '580px' }}>
              Presented at {RESEARCH.note}. Published in the <em>Lecture Notes in Networks and Systems</em> series by Springer Nature, covering state-of-the-art research in intelligent systems, AI, and communication technologies.
            </div>
          </div>

          {/* Metadata */}
          {metaRows.map((row, i) => (
            <Reveal key={row.label} variant="fadeLeft" delay={i * 50}>
              <MetaRow label={row.label} value={row.value} />
            </Reveal>
          ))}

          {/* CTA */}
          <div style={{ padding: '1rem 1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a href={RESEARCH.springerUrl} target="_blank" rel="noreferrer" style={{
              fontFamily: 'var(--mono)', fontSize: '12px', padding: '0.5rem 1.1rem',
              background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 6,
              cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(31,60,136,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ''; (e.currentTarget as HTMLElement).style.transform = '' }}
            >
              View on Springer ↗
            </a>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)' }}>Full text available after {RESEARCH.releaseDate}</span>
          </div>
        </GlowCard>
      </Reveal>

      {/* Research interests + reading list */}
      <Reveal variant="fadeUp" delay={150}>
        <div style={{ border: '0.5px solid rgba(26,26,24,0.1)', borderRadius: 10, background: '#fff', padding: '1.25rem' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Research Interests</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {['Stochastic Calculus', 'Bayesian Inference', 'Time Series Models', 'Portfolio Optimization', 'Volatility Modeling', 'Market Microstructure', 'Algorithmic Strategy', 'Intelligent Systems', 'Machine Learning', 'Risk & Drawdown'].map((tag, i) => (
              <span key={tag} style={{
                fontFamily: 'var(--mono)', fontSize: '11px', padding: '0.2rem 0.6rem', borderRadius: 100,
                border: '0.5px solid rgba(31,60,136,0.25)', color: 'var(--blue)', background: 'rgba(31,60,136,0.04)',
                opacity: 0, animation: `fadeIn 0.4s ease forwards ${i * 45}ms`,
                transition: 'transform 0.2s', cursor: 'default',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Currently Self-Studying</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { title: 'Stochastic Calculus for Finance I & II', author: 'Steven E. Shreve' },
              { title: 'Monte Carlo Methods in Financial Engineering', author: 'Paul Glasserman' },
              { title: 'The Volatility Surface', author: 'Jim Gatheral' },
              { title: 'Options, Futures, and Other Derivatives', author: 'John C. Hull' },
            ].map((book, i) => (
              <div key={book.title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', opacity: 0, animation: `fadeIn 0.4s ease forwards ${i * 70 + 200}ms` }}>
                <span style={{ color: 'var(--coral)', fontFamily: 'var(--mono)', fontSize: '11px', flexShrink: 0 }}>›</span>
                <span style={{ fontSize: '13px' }}>
                  <em style={{ fontFamily: 'var(--serif)' }}>{book.title}</em>
                  <span style={{ color: 'var(--ink3)', fontFamily: 'var(--mono)', fontSize: '11px', marginLeft: '0.5rem' }}>— {book.author}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
