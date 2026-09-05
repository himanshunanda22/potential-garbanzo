// components/DeceptNet/DeceptNetLayout.tsx
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props { children: React.ReactNode; title?: string }

const PAGES = [
  { href: '/deceptnet', label: 'Overview' },
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

      <nav className="deceptnet-nav">
        <Link href="/" className="deceptnet-nav-back">← Portfolio</Link>

        <span className="deceptnet-brand">
          <span className="deceptnet-brand-mark" aria-hidden="true" />
          <span className="deceptnet-brand-code" aria-hidden="true" />
        </span>

        <ul className="deceptnet-subnav">
          {PAGES.map(p => {
            const active = pathname === p.href
            return (
              <li key={p.href} className="deceptnet-subnav-item">
                <Link href={p.href} className={`deceptnet-subnav-link ${active ? 'active' : ''}`}>
                  {p.label}
                  <span className="deceptnet-subnav-indicator" aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <main className="deceptnet-main">
        {children}
      </main>
    </>
  )
}
