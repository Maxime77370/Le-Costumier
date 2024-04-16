import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { Icons } from '../icons'
import { buttonVariants } from '../ui/button'
import { AppbarNavigationMenu } from './navigation-menu'

function Appbar() {
  const isLogged = true

  return (
    <header className='h-14 border-b'>
      <div className='container relative flex h-full items-center gap-x-4'>
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
          <AppbarNavigationMenu />
        </div>

        <Link
          to={isLogged ? '/account' : '/login'}
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
        >
          <Icons.user className='size-5' />
        </Link>
      </div>
    </header>
  )
}

export { Appbar }
