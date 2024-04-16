import { createFileRoute, Link } from '@tanstack/react-router'

import { LoginForm } from '@/components/auth/login-form'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/login')({
  component: Login
})

function Login() {
  return (
    <div className='relative'>
      <div className='container flex h-screen max-w-2xl flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold sm:text-3xl'>Welcome back!</h1>
        <p className='text-muted-foreground'>
          You provide your credentials and we'll take care of the rest.
        </p>

        <LoginForm className='mb-2 mt-4 w-full' />

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

      <ThemeToggle className='absolute right-2 top-2' />
    </div>
  )
}
