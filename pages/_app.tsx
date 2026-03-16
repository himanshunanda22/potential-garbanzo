import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import '../styles/globals.css'

const CustomCursor = dynamic(() => import('../components/Effects/CustomCursor'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomCursor />
      <Component {...pageProps} />
    </>
  )
}
