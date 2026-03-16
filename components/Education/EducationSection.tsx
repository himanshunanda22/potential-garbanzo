import { useState } from 'react'
import Reveal from '../Effects/Reveal'
import GlowCard from '../Effects/GlowCard'
import CountUp from '../Effects/CountUp'
import { EDUCATION } from '../../lib/constants'

function ScoreBadge({ score, type }: { score: string; type: 'cgpa' | 'percentage' }) {
  const num = parseFloat(score)
  const isHigh = type === 'cgpa' ? num >= 8.5 : num >= 90
  const color = isHigh ? '#27ae60' : 'var(--blue)'
  const bg    = isHigh ? 'rgba(39,174,96,0.07)' : 'rgba(31,60,136,0.06)'
  const border= isHigh ? 'rgba(39,174,96,0.3)' : 'rgba(31,60,136,0.2)'

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', padding: '0.6rem 1rem', borderRadius: 10, background: bg, border: `0.5px solid ${border}`, minWidth: 90 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '18px', fontWeight: 500, color, lineHeight: 1.2 }}>
        <CountUp end={num} decimals={type === 'cgpa' ? 2 : 2} suffix="" trigger={true} duration={1400} />
      </span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--ink3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>
        {type === 'cgpa' ? 'CGPA' : 'Score %'}
      </span>
    </div>
  )
}

export default function EducationSection() {
  const [expanded, setExpanded] = useState<string | null>('btech')

  return (
    <div>
      {/* Quant path callout */}
      <Reveal variant="fadeUp" delay={0}>
        <div style={{ border: '0.5px solid rgba(31,60,136,0.2)', borderRadius: 10, background: 'rgba(31,60,136,0.03)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '18px', color: 'var(--blue)', opacity: 0.4, flexShrink: 0 }}>→</span>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>SELF-DIRECTED QUANT PATH</div>
            <p style={{ fontSize: '13px', color: 'var(--ink2)', lineHeight: 1.65, margin: 0 }}>
              Beyond formal education, I&apos;m self-studying the mathematical foundations of quantitative finance —
              Shreve&apos;s <em style={{ fontFamily: 'var(--serif)' }}>Stochastic Calculus for Finance</em>,
              Glasserman&apos;s <em style={{ fontFamily: 'var(--serif)' }}>Monte Carlo Methods</em>, and
              Gatheral&apos;s <em style={{ fontFamily: 'var(--serif)' }}>The Volatility Surface</em>.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '4px', top: 16, bottom: 16, width: 1, background: 'rgba(26,26,24,0.1)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {EDUCATION.map((edu, i) => {
            const isOpen = expanded === edu.id
            return (
              <Reveal key={edu.id} variant="fadeLeft" delay={i * 120}>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  {/* dot */}
                  <div style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, marginTop: 22, background: isOpen ? 'var(--blue)' : 'rgba(26,26,24,0.15)', border: `2px solid ${isOpen ? 'rgba(31,60,136,0.3)' : 'rgba(26,26,24,0.1)'}`, transition: 'all 0.3s' }} />

                  {/* Card */}
                  <GlowCard style={{ flex: 1, overflow: 'hidden', borderRadius: 10 }}>
                    {/* Header */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : edu.id)}
                      style={{
                        width: '100%', padding: '1.1rem 1.25rem', background: isOpen ? 'rgba(31,60,136,0.03)' : 'transparent',
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                        transition: 'background 0.2s',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--coral)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{edu.period}</div>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem', lineHeight: 1.3 }}>{edu.degree}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--ink3)' }}>{edu.institution} · {edu.location}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                        <ScoreBadge score={edu.score} type={edu.scoreType} />
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--ink3)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)', display: 'inline-block' }}>↓</span>
                      </div>
                    </button>

                    {/* Expanded */}
                    <div style={{
                      maxHeight: isOpen ? '500px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.45s cubic-bezier(0.22,1,0.36,1)',
                    }}>
                      <div style={{ borderTop: '0.5px solid rgba(26,26,24,0.07)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                        <div style={{ padding: '1rem 1.25rem', borderRight: '0.5px solid rgba(26,26,24,0.07)' }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Highlights</div>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            {edu.highlights.map((h, j) => (
                              <li key={j} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', opacity: 0, animation: isOpen ? `fadeIn 0.4s ease forwards ${j * 60}ms` : 'none' }}>
                                <span style={{ color: 'var(--blue)', flexShrink: 0, marginTop: 1, fontFamily: 'var(--mono)', fontSize: '12px' }}>›</span>
                                <span style={{ fontSize: '12px', color: 'var(--ink2)', lineHeight: 1.55 }}>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Relevant Courses</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {edu.relevantCourses.map((c, j) => (
                              <span key={c} style={{ fontFamily: 'var(--mono)', fontSize: '11px', padding: '0.2rem 0.55rem', borderRadius: 100, background: 'rgba(31,60,136,0.05)', color: 'var(--blue)', border: '0.5px solid rgba(31,60,136,0.18)', opacity: 0, animation: isOpen ? `fadeIn 0.4s ease forwards ${j * 50 + 100}ms` : 'none' }}>
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Certifications row */}
      <Reveal variant="fadeUp" delay={200}>
        <div style={{ marginTop: '1.5rem', border: '0.5px solid rgba(26,26,24,0.1)', borderRadius: 10, background: '#fff', overflow: 'hidden' }}>
          <div style={{ padding: '0.75rem 1.25rem', borderBottom: '0.5px solid rgba(26,26,24,0.06)', background: 'rgba(26,26,24,0.02)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Certifications & Ongoing</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {[
              { label: 'LeetCode', value: 'Active — DSA & Algorithms', link: 'https://leetcode.com/u/nh22/', status: 'active' },
              { label: 'Stochastic Calc', value: 'Self-study — Shreve Vol I & II', link: null, status: 'progress' },
              { label: 'ICCCT 2025', value: 'Springer Nature — Apr 2026', link: 'https://link.springer.com/book/9789819534975', status: 'done' },
            ].map((item, i) => (
              <div key={item.label} style={{ padding: '0.9rem 1.25rem', borderRight: i < 2 ? '0.5px solid rgba(26,26,24,0.07)' : 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(31,60,136,0.02)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{item.label}</div>
                {item.link
                  ? <a href={item.link} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--blue)', textDecoration: 'none', lineHeight: 1.4, display: 'block' }}>{item.value}</a>
                  : <div style={{ fontSize: '12px', color: 'var(--ink2)', lineHeight: 1.4 }}>{item.value}</div>
                }
                <div style={{ marginTop: '0.35rem' }}>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: '9px', padding: '0.15rem 0.45rem', borderRadius: 100,
                    background: item.status === 'active' ? 'rgba(78,205,196,0.1)' : item.status === 'done' ? 'rgba(39,174,96,0.1)' : 'rgba(212,160,23,0.1)',
                    color: item.status === 'active' ? '#2a8a86' : item.status === 'done' ? '#27ae60' : '#b8860b',
                    border: `0.5px solid ${item.status === 'active' ? 'rgba(78,205,196,0.3)' : item.status === 'done' ? 'rgba(39,174,96,0.3)' : 'rgba(212,160,23,0.3)'}`,
                  }}>
                    {item.status === 'active' ? '● active' : item.status === 'done' ? '✓ published' : '⧖ in progress'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
