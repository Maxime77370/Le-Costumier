import { Product } from 'types/product'

import { AddToCart } from '@/components/cart/add-to-card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ProductCategoriesBadge } from '../product-categories-badge'

type ProductTableProps = {
  products: Product[]
}

function ProductTable({ products }: ProductTableProps) {
  return (
    <Table>
      <TableCaption>Products</TableCaption>
      <TableHeader>
        <TableCell>Name</TableCell>
        <TableCell>Description</TableCell>
        <TableCell className='text-center'>Categories</TableCell>
        <TableCell>Price</TableCell>
        <TableCell className='text-center'>Actions</TableCell>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell className='flex items-center'>
              <img
                src={product.image}
                alt={product.name}
                className='mr-2 size-12'
              />
              {product.name}
            </TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell className='p-2 text-center align-middle'>
              <div className='flex justify-center'>
                <ProductCategoriesBadge product={product} />
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
