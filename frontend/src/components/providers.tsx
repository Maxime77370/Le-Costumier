import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

type ProvidersProps = {
  children: React.ReactNode
}

function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* Devtools for query client and router */}
      {/* <ReactQueryDevtools /> */}
      {/* <TanStackRouterDevtools /> */}
    </QueryClientProvider>
  )
}

export { Providers }
