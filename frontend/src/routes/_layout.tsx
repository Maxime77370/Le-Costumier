import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

import { getCurrentUser } from '@/api/user'
import { Appbar } from '@/components/appbar/appbar'
import { useAuthStore } from '@/stores/auth-store'

const options = queryOptions({
  queryKey: ['user'],
  queryFn: getCurrentUser,
  select: res => res.data
})

export const Route = createFileRoute('/_layout')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(options),
  component: Layout
})

function Layout() {
  const userQuery = useSuspenseQuery(options)
  const user = userQuery.data

  const { setUser, setIsLogged } = useAuthStore(state => ({
    setUser: state.setUser,
    setIsLogged: state.setIsLogged
  }))

  useEffect(() => {
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
  }, [user, setUser, setIsLogged])

  return (
    <>
      <Appbar />

      <div className='container relative mb-4'>
        <Outlet />
      </div>
    </>
  )
}
