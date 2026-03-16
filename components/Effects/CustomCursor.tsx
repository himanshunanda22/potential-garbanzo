import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const pos      = useRef({ x: -100, y: -100 })
  const ring     = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const tick = () => {
      // Dot snaps instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      // Ring follows with lerp
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    // Hover scaling
    const onEnter = () => {
      if (ringRef.current) ringRef.current.style.transform += ' scale(1.8)'
      if (ringRef.current) ringRef.current.style.borderColor = 'var(--coral)'
    }
    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.borderColor = 'var(--blue)'
    }
    document.querySelectorAll('a, button, [role=button]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        width: 8, height: 8, borderRadius: '50%',
        background: 'var(--blue)', pointerEvents: 'none',
        mixBlendMode: 'multiply',
        transition: 'background 0.2s',
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9998,
        width: 32, height: 32, borderRadius: '50%',
        border: '1.5px solid var(--blue)', pointerEvents: 'none',
        opacity: 0.5,
        transition: 'border-color 0.2s, opacity 0.2s',
      }} />
    </>
  )
}
