// ─── Random Number Generation ────────────────────────────────────────────────

/** Box-Muller transform → standard normal */
export function boxMuller(): number {
  const u1 = Math.random()
  const u2 = Math.random()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

// ─── Path Generators ─────────────────────────────────────────────────────────

/** Geometric Brownian Motion  dS = μS dt + σS dWt */
export function gbmPath(T: number, N: number, mu: number, sigma: number, S0 = 100): number[] {
  const dt = T / N
  const path = [S0]
  for (let i = 1; i <= N; i++) {
    const prev = path[path.length - 1]
    path.push(prev * Math.exp((mu - 0.5 * sigma ** 2) * dt + sigma * Math.sqrt(dt) * boxMuller()))
  }
  return path
}

/** Momentum: buy when recent k-day return is positive */
export function momentumPath(T: number, N: number, mu: number, sigma: number, S0 = 100): number[] {
  const base = gbmPath(T, N, mu, sigma, S0)
  const k = 10
  const equity = [S0]
  let pos = 0
  for (let i = k; i < base.length; i++) {
    const ret = (base[i] - base[i - k]) / base[i - k]
    pos = ret > 0 ? 1 : -1
    equity.push(equity[equity.length - 1] * (1 + pos * ((base[i] - base[i - 1]) / base[i - 1])))
  }
  return equity
}

/** Mean Reversion: fade moves beyond ±1 z-score */
export function meanRevPath(T: number, N: number, mu: number, sigma: number, S0 = 100): number[] {
  const base = gbmPath(T, N, mu * 0.3, sigma, S0)
  const w = 20
  const equity = [S0]
  let pos = 0
  for (let i = w; i < base.length; i++) {
    const slice = base.slice(i - w, i)
    const avg = slice.reduce((a, b) => a + b, 0) / w
    const std = Math.sqrt(slice.reduce((a, b) => a + (b - avg) ** 2, 0) / w) || 1
    const z = (base[i] - avg) / std
    pos = z > 1 ? -1 : z < -1 ? 1 : pos
    equity.push(equity[equity.length - 1] * (1 + pos * ((base[i] - base[i - 1]) / base[i - 1])))
  }
  return equity
}

/** Pairs: trade the spread between two cointegrated assets */
export function pairsPath(T: number, N: number, mu: number, sigma: number, S0 = 100): number[] {
  const a1 = gbmPath(T, N, mu, sigma, S0)
  const beta = 0.85
  const a2 = gbmPath(T, N, mu * beta, sigma * 0.9, S0)
  const equity = [S0]
  const w = 20
  for (let i = w; i < a1.length; i++) {
    const spread = a1.slice(i - w, i).map((v, j) => v - beta * a2[i - w + j])
    const avg = spread.reduce((a, b) => a + b, 0) / w
    const std = Math.sqrt(spread.reduce((a, b) => a + (b - avg) ** 2, 0) / w) || 1
    const z = (a1[i] - beta * a2[i] - avg) / std
    const pos = z > 1.5 ? -1 : z < -1.5 ? 1 : 0
    const r = pos * ((a1[i] - a1[i - 1]) / a1[i - 1] - beta * ((a2[i] - a2[i - 1]) / a2[i - 1]))
    equity.push(equity[equity.length - 1] * (1 + r))
  }
  return equity
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export interface PathStats {
  totalReturn: number
  sharpe: number
  maxDrawdown: number
  annVol: number
}

export function computeStats(path: number[]): PathStats {
  const totalReturn = ((path[path.length - 1] - path[0]) / path[0]) * 100
  const rets = path.slice(1).map((v, i) => (v - path[i]) / path[i])
  const avg = rets.reduce((a, b) => a + b, 0) / rets.length
  const std = Math.sqrt(rets.reduce((a, b) => a + (b - avg) ** 2, 0) / rets.length) || 0.001
  const sharpe = (avg / std) * Math.sqrt(252)
  let maxDrawdown = 0
  let peak = path[0]
  for (const v of path) {
    if (v > peak) peak = v
    const dd = ((peak - v) / peak) * 100
    if (dd > maxDrawdown) maxDrawdown = dd
  }
  return { totalReturn, sharpe, maxDrawdown, annVol: std * Math.sqrt(252) * 100 }
}

/** Gaussian PDF: N(μ, σ) evaluated at x */
export function gaussianPDF(x: number, mu: number, sigma: number): number {
  return Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI))
}
