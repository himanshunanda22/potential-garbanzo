import { useRef, useState } from 'react'
import { CSSProperties } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  style?: CSSProperties
  strength?: number
}

export default function MagneticButton({ children, onClick, href, style, strength = 0.35 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength })
  }

  const onLeave = () => {
    setOffset({ x: 0, y: 0 })
  }

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        cursor: 'pointer',
        ...style,
      }}
    >
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0
          ? 'transform 0.5s cubic-bezier(0.22,1,0.36,1)'
          : 'transform 0.1s linear',
        pointerEvents: 'none',
      }}>
        {children}
      </span>
    </div>
  )

  if (href) {
    return <a href={href} style={{ textDecoration: 'none' }}>{inner}</a>
  }
  return inner
}
