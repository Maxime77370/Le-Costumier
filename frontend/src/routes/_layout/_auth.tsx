import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

import { router } from '@/router'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_layout/_auth')({
  component: RequireAuth
})

function RequireAuth() {
  const isLogged = useAuthStore(state => state.isLogged)

  useEffect(() => {
    if (isLogged === false) {
      router.history.replace('/login')
    }
  }, [isLogged])

  return <Outlet />
}
