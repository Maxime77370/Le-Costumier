import { createFileRoute } from '@tanstack/react-router'

import { ProductCarousel } from '@/components/product/product-carousel'

export const Route = createFileRoute('/home')({
  component: Home
})

function Home() {
  return (
    <>
      <img
        src='https://media.gqmagazine.fr/photos/5b991257479e940011a6f716/4:3/w_808,h_606,c_limit/comment_vous_tailler_un_costard__de_winner_____la_mbapp___8217.jpeg'
        alt='home'
        className='h-96 w-full object-cover'
      />
      <ProductCarousel className='flex flex-col items-center gap-y-4 p-4' />
    </>
  )
}
