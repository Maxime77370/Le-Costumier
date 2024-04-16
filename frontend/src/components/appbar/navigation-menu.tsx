import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../ui/navigation-menu'

type AppbarNavigationMenuProps = {
  className?: string
}

function AppbarNavigationMenu({ className }: AppbarNavigationMenuProps) {
  return (
    <NavigationMenu className={cn(className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='w-[500px] px-2 py-1'>PRODUCTS</div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Last collection</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='w-[500px] px-2 py-1'>LAST COLLECTION</div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { AppbarNavigationMenu }
