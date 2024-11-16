import { globalStyles } from '@/src/styles/global'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../lib/react-query'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
