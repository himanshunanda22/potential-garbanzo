import React from 'react'
import Reveal from '../Effects/Reveal'

interface SectionProps {
  id: string
  label: string
  title: string
  sub?: string
  children: React.ReactNode
}

export default function Section({ id, label, title, sub, children }: SectionProps) {
  return (
    <section id={id} style={{ padding: '5rem 2rem 3.5rem', maxWidth: '860px', margin: '0 auto' }}>
      <Reveal variant="fadeLeft" duration={600}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          {label}
        </div>
      </Reveal>
      <Reveal variant="fadeUp" delay={60} duration={650}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: sub ? '0.3rem' : '2rem', color: 'var(--ink)' }}>
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal variant="fadeUp" delay={120} duration={600}>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--ink2)', marginBottom: '2rem' }}>
            {sub}
          </p>
        </Reveal>
      )}
      {children}
    </section>
  )
}

export function Divider() {
  return <hr style={{ border: 'none', borderTop: '0.5px solid rgba(26,26,24,0.08)', margin: '0 2rem' }} />
}
