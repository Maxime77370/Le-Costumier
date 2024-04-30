import { Product } from 'types/product'

import { AddToCart } from '@/components/cart/add-to-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CategoryBadge } from '../categories/category-badge'

type ProductTableProps = {
  products: Product[]
  className?: string
}

function ProductTable({ products, className }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <span className='mt-4 text-center text-gray-500 '>
        No products found.
      </span>
    )
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableCell>Name</TableCell>

        <TableCell className='max-sm:hidden'>Description</TableCell>
        <TableCell className='max-sm:hidden'>Categories</TableCell>

        <TableCell>Price</TableCell>
        <TableCell className='text-center'>Actions</TableCell>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell className='flex items-center'>
              <img
                src={product.photo}
                alt={product.name}
                className='mr-2 size-12'
              />
              {product.name}
            </TableCell>

            <TableCell className='overflow-x-auto max-sm:hidden'>
              {product.description}
            </TableCell>
            <TableCell className='max-sm:hidden'>
              <div className='flex flex-wrap gap-1'>
                {product.categories.map(category => (
                  <CategoryBadge key={category.id} category={category} />
                ))}
              </div>
            </TableCell>

            <TableCell>${product.price}</TableCell>
            <TableCell className='p-2 text-center align-middle'>
              <div className='flex justify-center'>
                <AddToCart productId={product.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { ProductTable }
