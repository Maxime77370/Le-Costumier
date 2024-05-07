import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import { getCart } from '@/api/cart'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../ui/sheet'
import { BuyButton } from './buy-button'
import { CartItem } from './cart-item'

interface CartSheetChildrenProps {
  count: number
}

interface CartSheetProps {
  children: (props: CartSheetChildrenProps) => React.ReactNode
}

function CartSheet({ children }: CartSheetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    select: res => res.data,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    retryOnMount: false
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                onClick={() => setIsOpen(false)}
                className='transition-all duration-300 hover:bg-secondary'
              >
                <CartItem key={product.id} product={product} />
              </Link>
            ))
          )}
        </div>

        <div>
          <p className='text-end font-semibold text-lg'>
            Total:{' '}
            {priceCount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </p>

          {cart && <BuyButton products={cart.products} className='w-full' />}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { CartSheet }
