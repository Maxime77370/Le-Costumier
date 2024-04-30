import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

type ProvidersProps = {
  children: React.ReactNode
}

function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        retryOnMount: false,
        staleTime: 0,
        gcTime: 0
      },
      mutations: {
        retry: false,
        gcTime: 0
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='system' storageKey='ecommerce-theme'>
        {children}

        <Toaster />

        {/* Devtools for query client and router */}
        {/* <ReactQueryDevtools /> */}
        {/* <TanStackRouterDevtools /> */}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export { Providers }
