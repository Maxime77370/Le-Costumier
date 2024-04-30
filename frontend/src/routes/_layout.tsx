import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

import { getCurrentUser } from '@/api/user'
import { Appbar } from '@/components/appbar/appbar'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_layout')({
  component: Layout
})

function Layout() {
  const { setUser, setIsLogged } = useAuthStore(state => ({
    setUser: state.setUser,
    setIsLogged: state.setIsLogged
  }))

  const { data: result, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  })

  useEffect(() => {
    if (isLoading) return

    if (result?.data) {
      setUser({
        firstName: result.data.firstname,
        lastName: result.data.lastname,
        login: result.data.login,
        email: result.data.email
      })
      setIsLogged(true)
    } else {
      setUser(null)
      setIsLogged(false)
    }
  }, [result, isLoading, setUser, setIsLogged])

  return (
    <>
      <Appbar />

      <div className='container relative mb-4'>
        <Outlet />
      </div>
    </>
  )
}
