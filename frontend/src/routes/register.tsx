import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { RegisterForm } from '@/components/auth/register-form'
import { Icons } from '@/components/icons'
import { useTheme } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/register')({
  component: Register
})

function Register() {
  const { resolvedTheme } = useTheme()

  const navigate = useNavigate({ from: '/register' })

  return (
    <div className='relative'>
      <div className='container flex h-screen max-w-2xl flex-col items-center justify-center'>
        <h1 className='mb-1 font-bold text-2xl sm:text-3xl'>
          Welcome, you're almost there!
        </h1>
        <p className='text-muted-foreground'>
          Thanks to register, you can access to commands history and more.
        </p>

        <RegisterForm
          className='mb-2 mt-4 w-full'
          onSuccess={() => {
            toast.success('Account created successfully!')
            navigate({ to: '/login' })
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError={(error: any) => toast.error(error.response.data.error)}
        />

        <p className='text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link
            to='/login'
            className={cn(buttonVariants({ variant: 'link', size: 'none' }))}
          >
            Login
          </Link>
        </p>
      </div>

      <ThemeToggle>
        <Button
          variant='outline'
          size='sm'
          className='absolute right-2 top-2 flex gap-x-1'
        >
          <Icons.sun className='size-4 dark:hidden' />
          <Icons.moon className='hidden size-4 dark:block' />
          <span className='capitalize'>{resolvedTheme}</span>
        </Button>
      </ThemeToggle>
    </div>
  )
}
