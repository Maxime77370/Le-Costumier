import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

import { LoginForm } from '@/components/auth/login-form'
import { Icons } from '@/components/icons'
import { useTheme } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/login')({
  component: Login
})

function Login() {
  const { resolvedTheme } = useTheme()

  const navigate = useNavigate({ from: '/login' })

  return (
    <div className='relative'>
      <div className='container flex h-screen max-w-2xl flex-col items-center justify-center'>
        <h1 className='mb-1 font-bold text-2xl sm:text-3xl'>Welcome back!</h1>
        <p className='text-muted-foreground'>
          You provide your credentials and we'll take care of the rest.
        </p>

        <LoginForm
          className='mb-2 mt-4 w-full'
          onSuccess={() => navigate({ to: '/' })}
        />

        <p className='text-sm text-muted-foreground'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className={cn(buttonVariants({ variant: 'link', size: 'none' }))}
          >
            Register
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
