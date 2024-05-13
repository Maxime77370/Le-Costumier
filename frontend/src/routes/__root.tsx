import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import { Providers } from '@/components/providers'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Root
})

function Root() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}
