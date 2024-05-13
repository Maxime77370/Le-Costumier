import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { addToCart } from '@/api/cart'
import { Button, ButtonVariant } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Icons } from '../icons'

type AddToCartProps = ButtonVariant & {
  productId: number
  className?: string
}

function AddToCart({ productId, variant, size, className }: AddToCartProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['cart']
      })
      toast.success('Your product has been added to the cart!')
    }
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    mutate({ productId })
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant ?? 'outlineAnimated'}
      size={size}
      className={cn(className, 'gap-x-2')}
    >
      {isPending && <Icons.spinner className='size-4 animate-spin' />}
      <span>Add to cart</span>
    </Button>
  )
}

export { AddToCart }
