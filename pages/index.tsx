import Head from 'next/head'
import dynamic from 'next/dynamic'
import Nav from '../components/Nav/Nav'
import Hero from '../components/Hero/Hero'
import Section, { Divider } from '../components/Section/Section'
import Articles from '../components/Articles/Articles'
import Contact from '../components/Contact/Contact'
import { PERSON } from '../lib/constants'

const ResearchSection = dynamic(() => import('../components/Research/ResearchSection'), { ssr: false })

// Disable SSR for canvas/interactive components
const About        = dynamic(() => import('../components/About/About'),               { ssr: false })
const QuantPlayground = dynamic(() => import('../components/Playground/QuantPlayground'), { ssr: false })
const AgenticSection  = dynamic(() => import('../components/Agentic/AgenticSection'),     { ssr: false })
const EducationSection = dynamic(() => import('../components/Education/EducationSection'), { ssr: false })

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Home() {
  return (
    <>
      <Head>
        <title>{PERSON.name} — Data Scientist · Aspiring Quant Researcher</title>
        <meta name="description" content="Portfolio of Himanshu Nanda — data scientist at AT&T, building toward quantitative research. Interactive math simulations, LangGraph agentic AI projects, writing." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Himanshu Nanda — Aspiring Quant Researcher" />
        <meta property="og:description" content="Data Scientist building toward quant research. Interactive strategy simulations, agentic AI projects, and mathematical writing." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      {/* ── HERO ── */}
      <Hero
        onPlayground={() => scrollTo('playground')}
        onResearch={() => scrollTo('research')}
      />

      <Divider />

      {/* ── ABOUT ── */}
      <Section id="about" label="Background" title="About Me" sub="A data scientist learning to think like a quant.">
        <About />
      </Section>

      <Divider />

      {/* ── QUANT PLAYGROUND ── */}
      <Section
        id="playground"
        label="Interactive Simulation"
        title="Quant Playground"
        sub="Simulate trading strategies. Adjust drift and volatility. Watch mathematics in motion."
      >
        <QuantPlayground />
        <p style={{
          marginTop: '0.75rem',
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          color: 'var(--ink3)',
        }}>
          Educational simulations only — not investment advice. All paths are synthetic under GBM assumptions.
        </p>
      </Section>

      <Divider />

      {/* ── AGENTIC AI ── */}
      <Section
        id="agentic"
        label="AI Engineering"
        title="Agentic AI & LangGraph"
        sub="Building multi-agent systems that reason, act, and self-improve."
      >
        <AgenticSection />
      </Section>

      <Divider />

      {/* ── EDUCATION ── */}
      <Section
        id="education"
        label="Academic Background"
        title="Education"
        sub="The foundation — and the road still being built."
      >
        <EducationSection />
      </Section>

      <Divider />

      {/* ── RESEARCH ── */}
      <Section id="research" label="Academic Work" title="Research" sub="A paper under publication — with more to come.">
        <ResearchSection />
      </Section>

      <Divider />

      {/* ── ARTICLES ── */}
      <Section id="articles" label="Writing" title="Articles" sub="Translating mathematical intuition into prose.">
        <Articles />
      </Section>

      <Divider />

      {/* ── CONTACT ── */}
      <Section id="contact" label="Get in Touch" title="Contact" sub="Open to conversations about quant research, ML, agentic AI, and mathematics.">
        <Contact />
      </Section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '0.5px solid rgba(26,26,24,0.08)',
        padding: '1.5rem 2rem',
        maxWidth: '860px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)' }}>
          {PERSON.name} · {new Date().getFullYear()}
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink3)' }}>
          Next.js · TypeScript · Vercel
        </span>
      </footer>
    </>
  )
}
