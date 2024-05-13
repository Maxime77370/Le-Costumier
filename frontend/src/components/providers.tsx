import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

type ProvidersProps = {
  children: React.ReactNode
}

function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme='system' storageKey='ecommerce-theme'>
      {children}

      <Toaster />

      {/* Devtools for query client and router */}
      {/* <ReactQueryDevtools /> */}
      {/* <TanStackRouterDevtools /> */}
    </ThemeProvider>
  )
}

export { Providers }
