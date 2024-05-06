import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getCart } from '@/api/cart'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../ui/sheet'
import { CartItem } from './cart-item'

interface CartSheetChildrenProps {
  count: number
}

interface CartSheetProps {
  children: (props: CartSheetChildrenProps) => React.ReactNode
}

function CartSheet({ children }: CartSheetProps) {
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    select: res => res.data
  })

  const productsCount = useMemo(() => {
    return cart ? cart.products.length : 0
  }, [cart])

  const priceCount = useMemo(() => {
    return cart
      ? cart.products.reduce((acc, product) => acc + product.price, 0)
      : 0
  }, [cart])

  return (
    <Sheet>
      <SheetTrigger asChild>{children({ count: productsCount })}</SheetTrigger>

      <SheetContent className='flex flex-col gap-y-4'>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>

        <div className='flex flex-1 flex-col gap-y-4'>
          {isLoading || !cart ? (
            <div>Loading...</div>
          ) : (
            cart.products.map(product => (
              <CartItem key={product.id} product={product} />
            ))
          )}
        </div>

        <SheetFooter className='font-semibold text-lg'>
          Total:{' '}
          {priceCount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { CartSheet }
