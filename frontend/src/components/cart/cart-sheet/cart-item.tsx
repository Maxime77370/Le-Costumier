import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from 'types/product'

import { removeFromCart } from '@/api/cart'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface CartItemProps {
  product: Omit<Product, 'categories'>
}

function CartItem({ product }: CartItemProps) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['cart']
      })
    }
  })

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    mutate({ productId: product.id })
  }

  return (
    <div className='flex gap-x-2'>
      <img src={product.photo} alt={product.name} className='size-20' />

      <div className='flex flex-1 flex-col justify-between py-2 text-sm'>
        <h3>{product.name}</h3>
        <p>
          {product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </p>
      </div>

      <Button
        variant='ghost'
        size='icon'
        className='self-center'
        onClick={handleRemove}
      >
        <Icons.trash className='size-4' />
      </Button>
    </div>
  )
}

export { CartItem }
