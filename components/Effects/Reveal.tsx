import { useEffect, useRef, useState, CSSProperties } from 'react'

type Variant = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'slideUp'

interface RevealProps {
  children: React.ReactNode
  variant?: Variant
  delay?: number        // ms
  duration?: number     // ms
  threshold?: number
  style?: CSSProperties
  className?: string
}

const HIDDEN: Record<Variant, CSSProperties> = {
  fadeUp:    { opacity: 0, transform: 'translateY(32px)' },
  fadeIn:    { opacity: 0 },
  fadeLeft:  { opacity: 0, transform: 'translateX(-32px)' },
  fadeRight: { opacity: 0, transform: 'translateX(32px)' },
  scaleIn:   { opacity: 0, transform: 'scale(0.94)' },
  slideUp:   { opacity: 0, transform: 'translateY(48px)' },
}

const VISIBLE: CSSProperties = { opacity: 1, transform: 'none' }

export default function Reveal({
  children, variant = 'fadeUp', delay = 0, duration = 600, threshold = 0.1, style, className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...( visible ? VISIBLE : HIDDEN[variant] ),
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Stagger wrapper — wraps children and applies incremental delays */
export function StaggerReveal({
  children,
  stagger = 80,
  variant = 'fadeUp',
  baseDuration = 550,
  baseDelay = 0,
}: {
  children: React.ReactNode[]
  stagger?: number
  variant?: Variant
  baseDuration?: number
  baseDelay?: number
}) {
  return (
    <>
      {children.map((child, i) => (
        <Reveal key={i} variant={variant} delay={baseDelay + i * stagger} duration={baseDuration}>
          {child}
        </Reveal>
      ))}
    </>
  )
}
