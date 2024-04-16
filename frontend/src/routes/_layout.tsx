import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Appbar } from '@/components/appbar/appbar'

export const Route = createFileRoute('/_layout')({
  component: Layout
})

function Layout() {
  return (
    <>
      <Appbar />

      <div className='container relative'>
        <Outlet />
      </div>
    </>
  )
}
