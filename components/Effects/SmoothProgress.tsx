import { useEffect, useRef, useState } from 'react'

interface ProgressBarProps {
  label: string
  value: number      // 0–100
  color?: string
  delay?: number     // ms
}

export function ProgressBar({ label, value, color = 'var(--blue)', delay = 0 }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [filled, setFilled] = useState(0)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered) return
    const t = setTimeout(() => {
      let start: number | null = null
      const dur = 900
      const ease = (t: number) => 1 - Math.pow(1 - t, 3)
      const tick = (ts: number) => {
        if (!start) start = ts
        const p = Math.min((ts - start) / dur, 1)
        setFilled(parseFloat((ease(p) * value).toFixed(1)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [triggered, value, delay])

  return (
    <div ref={ref} style={{ marginBottom: '0.9rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink2)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)' }}>{filled.toFixed(0)}%</span>
      </div>
      <div style={{ height: 3, background: 'rgba(26,26,24,0.08)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${filled}%`,
          background: color,
          borderRadius: 2,
          transition: 'width 0.05s linear',
        }} />
      </div>
    </div>
  )
}
