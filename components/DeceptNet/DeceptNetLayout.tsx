// components/DeceptNet/DeceptNetLayout.tsx
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props { children: React.ReactNode; title?: string }

const PAGES = [
  { href: '/deceptnet',                label: 'Overview'    },
  // { href: '/deceptnet/simulation',     label: 'Simulation'  },
  // { href: '/deceptnet/explainer',      label: 'Mathematics' },
  // { href: '/deceptnet/deep-explainer', label: 'Deep dive'   },
]

export default function DeceptNetLayout({ children, title = 'DeceptNet' }: Props) {
  const { pathname } = useRouter()

  return (
    <>
      <Head>
        <title>{title} — Himanshu Nanda</title>
        <meta name="description" content="DeceptNet — MDP-enhanced neural deception gateway. Interactive playground, live simulations, and deep mathematical explainers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Nav — matches portfolio Nav exactly in height/font/color */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(247,245,242,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '0.5px solid rgba(26,26,24,0.08)',
        padding: '0 2rem', height: '52px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.4s ease',
      }}>
        {/* Back to portfolio */}
        <Link href="/" style={{
          fontFamily: 'var(--mono)', fontSize: '11px',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'var(--ink3)', textDecoration: 'none',
          transition: 'color .2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink3)')}
        >
          ← Portfolio
        </Link>

        {/* Brand */}
        <span style={{
          fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 700,
          color: 'var(--ink)', letterSpacing: '-0.01em',
        }}>
          <span style={{ color: 'var(--coral)' }}></span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '20px', fontWeight: 400, color: 'var(--ink3)', marginLeft: '8px', letterSpacing: '0.04em' }}></span>
        </span>

        {/* Sub-nav */}
        <ul style={{ display: 'flex', gap: '0', listStyle: 'none', margin: 0, padding: 0 }}>
          {PAGES.map(p => {
            const active = pathname === p.href
            return (
              <li key={p.href} style={{ position: 'relative' }}>
                <Link href={p.href} style={{
                  display: 'flex', alignItems: 'center',
                  padding: '0 14px', height: '52px',
                  fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.03em',
                  textDecoration: 'none',
                  color: active ? 'var(--ink)' : 'var(--ink3)',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--ink)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--ink3)' }}
                >
                  {p.label}
                  {/* Active underline — matches portfolio nav */}
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '1px', background: 'var(--coral)',
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
                  }} />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <main style={{ minHeight: 'calc(100vh - 52px)', background: 'var(--bg)' }}>
        {children}
      </main>
    </>
  )
}
