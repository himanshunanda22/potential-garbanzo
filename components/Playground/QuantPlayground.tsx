import { useRef, useEffect, useState } from 'react'
import Reveal from '../Effects/Reveal'
import { gbmPath, momentumPath, meanRevPath, pairsPath, computeStats } from '../../lib/math'

type Strategy = 'momentum' | 'meanrev' | 'montecarlo' | 'pairs'

const STRATEGIES: { id: Strategy; name: string; formula: string; desc: string }[] = [
  { id: 'momentum',   name: '01. Momentum',       formula: 'signal = sign(E[r_{t-k:t}])',    desc: 'Buy recent winners, short recent losers.' },
  { id: 'meanrev',    name: '02. Mean Reversion',  formula: 'signal = -(P_t - μ_w) / σ_w',   desc: 'Fade extreme z-score moves.' },
  { id: 'montecarlo', name: '03. Monte Carlo GBM', formula: 'dS = μS dt + σS dWt',           desc: 'Simulate paths under geometric Brownian motion.' },
  { id: 'pairs',      name: '04. Pairs Trading',   formula: 'z = (S₁ - βS₂ - μ) / σ_spread', desc: 'Exploit cointegration between two assets.' },
]

const PALETTE = ['#1F3C88','#4ECDC4','#FF6B6B','#D4A017','#7B61FF','#2ecc71']

export default function QuantPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [strategy, setStrategy] = useState<Strategy>('montecarlo')
  const [mu,     setMu]     = useState(0.08)
  const [sigma,  setSigma]  = useState(0.2)
  const [nPaths, setNPaths] = useState(6)
  const [stats,  setStats]  = useState({ totalReturn: 0, sharpe: 0, maxDrawdown: 0, annVol: 0 })
  const [prevStats, setPrevStats] = useState({ totalReturn: 0, sharpe: 0, maxDrawdown: 0, annVol: 0 })
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => { setTimeout(runSim, 50) }, [strategy, mu, sigma, nPaths])

  function runSim() {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.offsetWidth, h = canvas.offsetHeight
    if (!w || !h) return
    canvas.width = w * dpr; canvas.height = h * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr); ctx.clearRect(0, 0, w, h)

    const N = 252
    const paths: number[][] = []
    for (let p = 0; p < nPaths; p++) {
      if (strategy === 'momentum')   paths.push(momentumPath(1, N, mu, sigma))
      else if (strategy === 'meanrev') paths.push(meanRevPath(1, N, mu, sigma))
      else if (strategy === 'pairs')   paths.push(pairsPath(1, N, mu, sigma))
      else                             paths.push(gbmPath(1, N, mu, sigma))
    }

    const all = paths.flat()
    const yMin = Math.min(...all) * 0.97, yMax = Math.max(...all) * 1.03
    const toX = (i: number, len: number) => 46 + (i / (len - 1)) * (w - 58)
    const toY = (v: number) => h - 20 - ((v - yMin) / (yMax - yMin)) * (h - 32)

    // Grid
    ctx.strokeStyle = 'rgba(26,26,24,0.06)'; ctx.lineWidth = 0.5
    for (let g = 0; g <= 4; g++) {
      const y = 10 + g * (h - 30) / 4
      ctx.beginPath(); ctx.moveTo(46, y); ctx.lineTo(w - 12, y); ctx.stroke()
      ctx.fillStyle = 'rgba(26,26,24,0.28)'; ctx.font = `9px 'JetBrains Mono',monospace`
      ctx.textAlign = 'right'
      ctx.fillText((yMax - g * (yMax - yMin) / 4).toFixed(0), 42, y + 3)
    }

    // Baseline 100
    ctx.beginPath(); ctx.setLineDash([3, 4])
    ctx.moveTo(46, toY(100)); ctx.lineTo(w - 12, toY(100))
    ctx.strokeStyle = 'rgba(31,60,136,0.2)'; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([])

    // Animate paths in sequentially
    paths.forEach((path, idx) => {
      const isMain = idx === paths.length - 1
      let step = 0
      const draw = () => {
        if (step >= path.length) return
        step += 4
        ctx.beginPath()
        path.slice(0, step).forEach((v, i) => {
          i === 0 ? ctx.moveTo(toX(i, path.length), toY(v)) : ctx.lineTo(toX(i, path.length), toY(v))
        })
        ctx.strokeStyle = PALETTE[idx % PALETTE.length]
        ctx.lineWidth = isMain ? 2 : 1
        ctx.globalAlpha = isMain ? 0.92 : 0.45
        ctx.stroke(); ctx.globalAlpha = 1
        if (step < path.length) requestAnimationFrame(draw)
      }
      setTimeout(draw, idx * 40)
    })

    setPrevStats(stats)
    setStats(computeStats(paths[paths.length - 1]))
    setAnimKey(k => k + 1)
  }

  const current = STRATEGIES.find(s => s.id === strategy)!

  return (
    <div style={{ border: '0.5px solid rgba(26,26,24,0.1)', borderRadius: 12, background: '#fff', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'var(--blue)', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em', flexShrink: 0 }}>STRATEGY_SIMULATOR</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'rgba(255,255,255,0.35)', flex: 1, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current.formula}</span>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', flexShrink: 0, animation: 'pulse 2s ease-in-out infinite' }} />
      </div>

      {/* Strategy picker */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '0.5px solid rgba(26,26,24,0.07)' }}>
        {STRATEGIES.map((s, idx) => (
          <button key={s.id} onClick={() => setStrategy(s.id)} style={{
            padding: '0.85rem 1.25rem', textAlign: 'left', cursor: 'pointer',
            background: strategy === s.id ? 'rgba(31,60,136,0.05)' : 'transparent',
            borderRight: idx % 2 === 0 ? '0.5px solid rgba(26,26,24,0.07)' : 'none',
            borderBottom: idx < 2 ? '0.5px solid rgba(26,26,24,0.07)' : 'none',
            border: 'none', transition: 'background 0.2s',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: strategy === s.id ? 'var(--blue)' : 'var(--ink3)', marginBottom: '0.2rem', transition: 'color 0.2s' }}>{s.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--ink3)', lineHeight: 1.4 }}>{s.desc}</div>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '0.5px solid rgba(26,26,24,0.07)' }}>
        {[
          { label: 'Annual Drift (μ)', val: mu,     set: setMu,                              min: -0.3, max: 0.3, step: 0.01, fmt: (v:number)=>v.toFixed(2) },
          { label: 'Volatility (σ)',   val: sigma,  set: setSigma,                           min: 0.05, max: 0.8, step: 0.01, fmt: (v:number)=>v.toFixed(2) },
          { label: 'Paths (n)',        val: nPaths, set: (v:number)=>setNPaths(Math.round(v)), min: 1,   max: 20, step: 1,    fmt: (v:number)=>String(Math.round(v)) },
        ].map((ctrl, i) => (
          <div key={ctrl.label} style={{ padding: '0.75rem 1.25rem', borderRight: i < 2 ? '0.5px solid rgba(26,26,24,0.07)' : 'none' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{ctrl.label}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 500, marginBottom: '0.3rem' }}>{ctrl.fmt(ctrl.val)}</div>
            <input type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val} onChange={e => ctrl.set(parseFloat(e.target.value))} />
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div style={{ padding: '1rem 1.25rem', background: '#fafaf8' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '230px', display: 'block', borderRadius: 4 }} />
      </div>

      {/* Stats with animation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '0.5px solid rgba(26,26,24,0.07)' }}>
        {[
          { label: 'Total Return',   val: (stats.totalReturn >= 0 ? '+' : '') + stats.totalReturn.toFixed(2) + '%', color: stats.totalReturn >= 0 ? '#27ae60' : 'var(--coral)' },
          { label: 'Sharpe Ratio',   val: stats.sharpe.toFixed(2),                                                  color: stats.sharpe > 1 ? '#27ae60' : stats.sharpe < 0 ? 'var(--coral)' : 'var(--ink)' },
          { label: 'Max Drawdown',   val: '−' + stats.maxDrawdown.toFixed(2) + '%',                                 color: 'var(--coral)' },
          { label: 'Ann. Volatility',val: stats.annVol.toFixed(1) + '%',                                            color: 'var(--ink)' },
        ].map((s, i) => (
          <div key={s.label} style={{ padding: '0.75rem 1.25rem', borderRight: i < 3 ? '0.5px solid rgba(26,26,24,0.07)' : 'none' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{s.label}</div>
            <div key={`${s.label}-${animKey}`} style={{ fontFamily: 'var(--mono)', fontSize: '16px', fontWeight: 500, color: s.color, animation: 'fadeIn 0.4s ease' }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0.75rem 1.25rem', borderTop: '0.5px solid rgba(26,26,24,0.07)', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        <button onClick={runSim} style={{
          fontFamily: 'var(--mono)', fontSize: '12px', padding: '0.45rem 1rem',
          background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(31,60,136,0.3)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
        >↺ Resample</button>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)' }}>252 trading days · geometric Brownian motion</span>
      </div>
    </div>
  )
}
