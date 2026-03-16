import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  duration?: number   // ms
  decimals?: number
  suffix?: string
  prefix?: string
  trigger?: boolean   // start when true
}

export default function CountUp({ end, duration = 1800, decimals = 0, suffix = '', prefix = '', trigger = true }: CountUpProps) {
  const [value, setValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (!trigger) return
    startTime.current = null

    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const tick = (ts: number) => {
      if (!startTime.current) startTime.current = ts
      const elapsed = ts - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      setValue(parseFloat((ease(progress) * end).toFixed(decimals)))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [end, duration, decimals, trigger])

  return <>{prefix}{value.toFixed(decimals)}{suffix}</>
}
