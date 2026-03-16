import Reveal from '../Effects/Reveal'
import { PERSON } from '../../lib/constants'

const links = [
  { label: 'Email',    value: PERSON.email,                     href: `mailto:${PERSON.email}`,  icon: '✉' },
  { label: 'LinkedIn', value: 'linkedin.com/in/himanshu-nanda', href: PERSON.linkedin,           icon: 'in' },
  { label: 'LeetCode', value: 'leetcode.com/u/nh22',            href: PERSON.leetcode,           icon: '{}' },
  { label: 'GitHub',   value: 'github.com/himanshu-nanda',      href: PERSON.github,             icon: '⌥' },
]

export default function Contact() {
  return (
    <div style={{ border: '0.5px solid rgba(26,26,24,0.1)', borderRadius: 12, background: '#fff', overflow: 'hidden' }}>
      <div style={{ background: 'var(--blue)', padding: '0.7rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em' }}>CONTACT.DIRECT</span>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
      </div>
      {links.map((l, i) => (
        <Reveal key={l.label} variant="fadeLeft" delay={i * 80}>
          <a
            href={l.href}
            target={l.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '1rem 1.25rem',
              borderBottom: i < links.length - 1 ? '0.5px solid rgba(26,26,24,0.06)' : 'none',
              textDecoration: 'none',
              transition: 'background 0.2s',
              background: 'transparent',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(31,60,136,0.03)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--ink3)', width: 28, textAlign: 'center' }}>{l.icon}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)', width: 76, flexShrink: 0 }}>{l.label}</span>
            <span style={{ fontSize: '14px', color: 'var(--blue)' }}>{l.value}</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)' }}>→</span>
          </a>
        </Reveal>
      ))}
    </div>
  )
}
