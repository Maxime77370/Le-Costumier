import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_layout/_auth')({
  component: RequireAuth
})

function RequireAuth() {
  const isLogged = useAuthStore(state => state.isLogged)

  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged === false) {
      navigate({ to: '/login', replace: true })
    }
  }, [isLogged, navigate])

  return <Outlet />
}
