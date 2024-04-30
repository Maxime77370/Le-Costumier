import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import { Icons } from '../icons'
import { SearchBar } from '../searchbar/searchbar'
import { ThemeToggle } from '../theme-toggle'
import { Button, buttonVariants } from '../ui/button'

function Appbar() {
  const user = useAuthStore(state => state.user)

  return (
    <header className='h-14 border-b'>
      <div className='container relative flex h-full items-center gap-x-2'>
        <Link
          to='/'
          className={cn(
            buttonVariants({ variant: 'none', size: 'none' }),
            'font-bold text-lg sm:text-xl'
          )}
        >
          Le Costumier
        </Link>

        <div className='flex-1' />

        <SearchBar />

        <ThemeToggle>
          <Button variant='ghost' size='icon'>
            <Icons.sun className='size-5 dark:hidden' />
            <Icons.moon className='hidden size-5 dark:block' />
          </Button>
        </ThemeToggle>

        <Link
          to={user ? '/account' : '/login'}
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
        >
          <Icons.user className='size-5' />
        </Link>

        <Link
          to='/'
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
        >
          <Icons.cart className='size-5' />
        </Link>
      </div>
    </header>
  )
}

export { Appbar }
