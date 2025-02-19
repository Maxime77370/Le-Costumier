import { Product } from 'types/product'

import { ProductCard } from '@/components/products/product-card'

type ProductsCardGridProps = {
  products: Product[]
  className?: string
}

function ProductsCardGrid({ products, className }: ProductsCardGridProps) {
  if (products.length === 0) {
    return (
      <span className='mt-4 text-center text-gray-500'>No products found</span>
    )
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {products.map(product => (
        <div key={product.id} className='w-auto'>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

export { ProductsCardGrid }
