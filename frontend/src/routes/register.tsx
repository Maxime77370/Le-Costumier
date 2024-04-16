import { createFileRoute, Link } from '@tanstack/react-router'

import { RegisterForm } from '@/components/auth/register-form'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/register')({
  component: Register
})

function Register() {
  return (
    <div className='relative'>
      <div className='container flex h-screen max-w-2xl flex-col items-center justify-center'>
        <h1 className='mb-1 font-bold text-2xl sm:text-3xl'>
          Welcome, you're almost there!
        </h1>
        <p className='text-muted-foreground'>
          Thanks to register, you can access to commands history and more.
        </p>

        <RegisterForm className='mb-2 mt-4 w-full' />

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

      <ThemeToggle className='absolute right-2 top-2' />
    </div>
  )
}
