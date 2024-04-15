import { createRootRoute, Outlet } from '@tanstack/react-router'

import { Providers } from '@/components/providers'

function Root() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}

export const Route = createRootRoute({
  component: Root
})
