import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

import { AccountForm } from '@/components/account/account-form'
import { Icons } from '@/components/icons'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_layout/_auth/account')({
  component: Account
})

export function Account() {
  const user = useAuthStore(state => state.user)

  return (
    <div className='mt-4'>
      <h1 className='font-bold text-3xl'>Account settings</h1>

      {user ? (
        <AccountForm
          user={user}
          className='mt-2'
          onSuccess={() => {
            toast.success('Account updated successfully!')
          }}
        />
      ) : (
        <Icons.spinner className='size-6 animate-spin' />
      )}
    </div>
  )
}
