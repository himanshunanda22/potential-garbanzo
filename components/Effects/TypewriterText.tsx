import { useEffect, useState } from 'react'

interface TypewriterProps {
  words: string[]
  speed?: number       // ms per char
  pauseTime?: number   // ms between words
  style?: React.CSSProperties
}

export default function Typewriter({ words, speed = 65, pauseTime = 1800, style }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true) }, pauseTime)
      return () => clearTimeout(t)
    }

    const current = words[wordIdx]

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      }, speed + Math.random() * 20)
      return () => clearTimeout(t)
    }

    if (!deleting && charIdx === current.length) {
      setPaused(true)
      return
    }

    if (deleting && charIdx > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      }, speed * 0.45)
      return () => clearTimeout(t)
    }

    if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }
  }, [charIdx, deleting, paused, wordIdx, words, speed, pauseTime])

  return (
    <span style={{ position: 'relative', ...style }}>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '1em',
        background: 'var(--coral)',
        marginLeft: '2px',
        verticalAlign: 'text-bottom',
        animation: 'blink 1s step-end infinite',
      }} />
    </span>
  )
}
