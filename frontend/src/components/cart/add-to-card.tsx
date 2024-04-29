import { Button } from '@/components/ui/button'

type AddToCartProps = {
  productId: string
}

function AddToCart({ productId }: AddToCartProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    console.log('Add to cart', productId)
  }

  return (
    <Button onClick={handleClick} variant='secondary'>
      Add to cart
    </Button>
  )
}

export { AddToCart }
