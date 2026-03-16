import { useRef, useState, CSSProperties } from 'react'

interface GlowCardProps {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
  glowColor?: string
}

export default function GlowCard({ children, style, className, glowColor = '31,60,136' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        border: `0.5px solid rgba(${glowColor},${hovered ? 0.3 : 0.1})`,
        borderRadius: 12,
        background: hovered
          ? `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(${glowColor},0.04) 0%, transparent 60%), #fff`
          : '#fff',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
        boxShadow: hovered ? `0 8px 40px rgba(${glowColor},0.1)` : '0 1px 3px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
