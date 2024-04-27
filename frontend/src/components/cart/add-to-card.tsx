import { Button } from '@/components/ui/button'

type AddToCartProps = {
  productId: string
}

function AddToCart({ productId }: AddToCartProps) {
  return (
    <Button
      onClick={() => console.log('Add to cart', productId)}
      variant='secondary'
    >
      Add to cart
    </Button>
  )
}

export { AddToCart }
