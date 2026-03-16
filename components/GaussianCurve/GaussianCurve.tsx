import { useRef, useEffect, useState } from 'react'
import { gaussianPDF } from '../../lib/math'

export default function GaussianCurve() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mu, setMu] = useState(0)
  const [sigma, setSigma] = useState(1)

  useEffect(() => { draw() }, [mu, sigma])

  function draw() {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.offsetWidth, h = canvas.offsetHeight
    if (!w || !h) return
    canvas.width = w * dpr; canvas.height = h * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, w, h)

    const pad = 24
    const xMin = -4, xMax = 4
    const toX = (v: number) => pad + ((v - xMin) / (xMax - xMin)) * (w - 2 * pad)
    const peak = gaussianPDF(mu, mu, sigma)
    const toY = (v: number) => h - pad - (v / (peak * 1.25)) * (h - 2 * pad)

    // Subtle grid
    ctx.strokeStyle = 'rgba(26,26,24,0.05)'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= 4; i++) {
      const y = pad + (i / 4) * (h - 2 * pad)
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke()
    }

    // Gradient fill
    const grad = ctx.createLinearGradient(0, pad, 0, h)
    grad.addColorStop(0, 'rgba(31,60,136,0.11)')
    grad.addColorStop(1, 'rgba(31,60,136,0.01)')
    ctx.beginPath()
    ctx.moveTo(toX(xMin), h - pad)
    for (let x = xMin; x <= xMax; x += 0.02) ctx.lineTo(toX(x), toY(gaussianPDF(x, mu, sigma)))
    ctx.lineTo(toX(xMax), h - pad)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // Curve
    ctx.beginPath()
    let first = true
    for (let x = xMin; x <= xMax; x += 0.02) {
      const px = toX(x), py = toY(gaussianPDF(x, mu, sigma))
      first ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      first = false
    }
    ctx.strokeStyle = '#1F3C88'; ctx.lineWidth = 2; ctx.stroke()

    // Mean dashed line
    ctx.beginPath(); ctx.setLineDash([4, 4])
    ctx.moveTo(toX(mu), h - pad); ctx.lineTo(toX(mu), toY(peak))
    ctx.strokeStyle = 'rgba(255,107,107,0.5)'; ctx.lineWidth = 1.5; ctx.stroke()
    ctx.setLineDash([])

    // Label
    ctx.font = `9px 'JetBrains Mono', monospace`
    ctx.fillStyle = 'rgba(26,26,24,0.3)'; ctx.textAlign = 'center'
    ctx.fillText('μ = ' + mu.toFixed(1), toX(mu), h - 6)
  }

  return (
    <div style={{ border: '0.5px solid var(--border)', borderRadius: 12, background: '#fff', overflow: 'hidden' }}>
      <div style={{ background: 'var(--blue)', padding: '0.7rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em' }}>GAUSSIAN_DIST.LIVE</span>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
      </div>
      <div style={{ padding: '0.75rem 1.25rem', background: '#fafaf8' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '130px', display: 'block' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '0.5px solid var(--border2)' }}>
        {[
          { label: 'Mean (μ)', val: mu, set: setMu, min: -2, max: 2, step: 0.1 },
          { label: 'Std Dev (σ)', val: sigma, set: setSigma, min: 0.2, max: 2.5, step: 0.1 },
        ].map((ctrl, i) => (
          <div key={ctrl.label} style={{ padding: '0.75rem 1.25rem', borderRight: i === 0 ? '0.5px solid var(--border2)' : 'none' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{ctrl.label}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 500, marginBottom: '0.3rem' }}>{ctrl.val.toFixed(2)}</div>
            <input type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val} onChange={e => ctrl.set(parseFloat(e.target.value))} />
          </div>
        ))}
      </div>
    </div>
  )
}
