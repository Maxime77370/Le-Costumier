import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { Icons } from '../icons'
import { SearchBar } from '../searchbar/searchbar'
import { ThemeToggle } from '../theme-toggle'
import { Button, buttonVariants } from '../ui/button'
import { AppbarNavigationMenu } from './navigation-menu'

function Appbar() {
  const isLogged = true

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

        <div className='flex-1'>
          <AppbarNavigationMenu className='hidden sm:block' />
        </div>

        <SearchBar />

        <ThemeToggle>
          <Button variant='ghost' size='icon'>
            <Icons.sun className='size-5 dark:hidden' />
            <Icons.moon className='hidden size-5 dark:block' />
          </Button>
        </ThemeToggle>

        <Link
          to={isLogged ? '/account' : '/login'}
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
