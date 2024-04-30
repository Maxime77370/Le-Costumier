import { Button, ButtonVariant } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type AddToCartProps = ButtonVariant & {
  productId: number
  className?: string
}

function AddToCart({ productId, variant, size, className }: AddToCartProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    console.log('Add to cart', productId)
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant ?? 'outlineAnimated'}
      size={size}
      className={cn(className)}
    >
      <span>Add to cart</span>
    </Button>
  )
}

export { AddToCart }
