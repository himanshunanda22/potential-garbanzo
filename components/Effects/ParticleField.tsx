import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  symbol: string; size: number; opacity: number
}

const SYMBOLS = ['∇', '∫', 'σ', 'μ', 'π', 'Σ', 'Δ', 'λ', 'ω', '∂', '∞', 'ℝ', 'P', 'E', 'β', 'α']

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1)
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = () => {
      if (particles.length > 28) return
      const maxLife = 180 + Math.random() * 200
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.3 + Math.random() * 0.5),
        life: 0, maxLife,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        size: 11 + Math.random() * 10,
        opacity: 0,
      })
    }

    let frame = 0
    const tick = () => {
      frame++
      if (frame % 18 === 0) spawn()

      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy

        // Fade in / out
        const t = p.life / p.maxLife
        p.opacity = t < 0.15 ? t / 0.15 : t > 0.75 ? (1 - t) / 0.25 : 1

        ctx.globalAlpha = p.opacity * 0.13
        ctx.font = `${p.size}px 'JetBrains Mono', monospace`
        ctx.fillStyle = '#1F3C88'
        ctx.fillText(p.symbol, p.x, p.y)

        if (p.life >= p.maxLife || p.y < -30) particles.splice(i, 1)
      }

      ctx.restore()
      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}
