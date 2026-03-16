import { useState, useEffect } from 'react'
import { NAV_ITEMS, PERSON } from '../../lib/constants'

export default function Nav() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setScrolled(scrollTop > 30)
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id)
        if (el && scrollTop >= el.offsetTop - 120) { setActive(item.id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(247,245,242,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '0.5px solid rgba(26,26,24,0.08)' : 'none',
      padding: '0 2rem', height: '52px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
    }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: 'var(--blue)', width: `${progress}%`, transition: 'width 0.1s linear', opacity: scrolled ? 1 : 0 }} />

      <button onClick={() => scrollTo('hero')} style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--blue)', letterSpacing: '0.06em', background: 'none', border: 'none', cursor: 'pointer' }}>
        {PERSON.name.split(' ')[0].toUpperCase()}.{PERSON.name.split(' ')[1][0]}
      </button>

      <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {NAV_ITEMS.filter(i => i.id !== 'hero').map(item => (
          <li key={item.id} style={{ position: 'relative' }}>
            <button onClick={() => scrollTo(item.id)} style={{
              fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.03em',
              color: active === item.id ? 'var(--ink)' : 'var(--ink3)',
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 2px',
              transition: 'color 0.2s',
            }}>
              {item.label}
              <span style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'var(--coral)',
                transform: active === item.id ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
                transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
              }} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
