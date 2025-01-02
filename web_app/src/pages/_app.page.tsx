import { globalStyles } from '@/src/styles/global'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { queryClient } from '../lib/react-query'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
