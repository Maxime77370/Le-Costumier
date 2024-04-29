import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
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
  className?: string
}

function ProductTable({ products, className }: ProductTableProps) {
  const [hideDescription, setHideDescription] = useState(false)

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      setHideDescription(true)
    } else {
      setHideDescription(false)
    }
  })
  const navigate = useNavigate({ from: '/products/$productId' })
  const handleRowClick = (productId: string) => {
    navigate({
      to: `/products/$productId`,
      params: { productId }
    })
  }

  if (!products) {
    return <div>No products found</div>
  }

  return (
    <Table className={className}>
      <TableCaption>Products</TableCaption>
      <TableHeader>
        <TableCell>Name</TableCell>
        {!hideDescription && (
          <>
            <TableCell>Description</TableCell>
            <TableCell className='text-center'>Categories</TableCell>
          </>
        )}
        <TableCell>Price</TableCell>
        <TableCell className='text-center'>Actions</TableCell>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id} onClick={() => handleRowClick(product.id)}>
            <TableCell className='flex items-center'>
              <img
                src={product.image}
                alt={product.name}
                className='mr-2 size-12'
              />
              {product.name}
            </TableCell>
            {!hideDescription && (
              <>
                <TableCell className='overflow-x-auto '>
                  {product.description}
                </TableCell>
                <TableCell className='p-2 text-center align-middle'>
                  <div className='flex justify-center'>
                    <ProductCategoriesBadge product={product} />
                  </div>
                </TableCell>
              </>
            )}
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
