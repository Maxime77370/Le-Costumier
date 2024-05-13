import { Product } from 'types/product'

import { Button } from '@/components/ui/button'
import { stripe } from '@/lib/stripe'
import { cn } from '@/lib/utils'

// import { useAuthStore } from '@/stores/auth-store'

interface BuyButtonProps {
  products: Product[]
  className?: string
}

function BuyButton({ products, className }: BuyButtonProps) {
  // const user = useAuthStore(state => state.user)

  const handleClick = async () => {
    const session = await stripe.checkout.sessions.create({
      // customer: user.stripeCustomerId,
      mode: 'payment',
      line_items: products.map(product => ({
        price_data: {
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.photo]
          },
          currency: 'usd',
          unit_amount: product.price * 100
        },
        quantity: 1
      })),
      success_url: 'http://localhost:5173',
      cancel_url: 'http://localhost:5173'
    })

    if (session) {
      window.location.href = session.url as string
    }
  }

  return (
    <Button
      variant='outlineAnimated'
      className={cn(className)}
      onClick={handleClick}
    >
      <span>Buy</span>
    </Button>
  )
}

export { BuyButton }
