import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

import { getCurrentUser } from '@/api/user'
import { Appbar } from '@/components/appbar/appbar'
import { useAuthStore } from '@/stores/auth-store'

const options = queryOptions({
  queryKey: ['user'],
  queryFn: getCurrentUser,
  select: res => res.data,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchInterval: false,
  refetchIntervalInBackground: false,
  retryOnMount: false
})

export const Route = createFileRoute('/_layout')({
  component: Layout
})

function Layout() {
  const { data: user, isLoading } = useQuery(options)

  const { setUser, setIsLogged } = useAuthStore(state => ({
    setUser: state.setUser,
    setIsLogged: state.setIsLogged
  }))

  useEffect(() => {
    if (isLoading) return

    if (user) {
      setUser({
        firstName: user.firstname,
        lastName: user.lastname,
        login: user.login,
        email: user.email
      })
      setIsLogged(true)
    } else {
      setUser(null)
      setIsLogged(false)
    }
  }, [isLoading, user, setUser, setIsLogged])

  return (
    <>
      <Appbar />

      <div className='container relative mb-4'>
        <Outlet />
      </div>
    </>
  )
}
