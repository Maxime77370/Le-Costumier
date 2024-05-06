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
  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    select: res => res.data
  })

  const totalCount = useMemo(() => {
    return data
      ? data.products.reduce((acc, product) => acc + product.price, 0)
      : 0
  }, [data])

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children({ count: data ? data.products.length : 0 })}
      </SheetTrigger>

      <SheetContent className='flex flex-col gap-y-4'>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>

        <div className='flex flex-1 flex-col gap-y-4'>
          {isLoading || !data ? (
            <div>Loading...</div>
          ) : (
            data.products.map(product => (
              <CartItem key={product.id} product={product} />
            ))
          )}
        </div>

        <SheetFooter className='font-semibold text-lg'>
          Total:{' '}
          {totalCount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { CartSheet }
