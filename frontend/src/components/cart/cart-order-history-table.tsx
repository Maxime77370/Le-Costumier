import { Product } from 'types/product'

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '../ui/button'

type CartOrderHistoryTableProps = {
  orders: Product[]
  className?: string
}

function CartOrderHistoryTable({
  orders,
  className
}: CartOrderHistoryTableProps) {
  const handleRowClick = () => {
    console.log('redirect to product')
  }

  if (orders.length === 0) {
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

        <TableCell className='max-sm:hidden'>Date</TableCell>
        <TableCell>Price</TableCell>
        <TableCell className='text-center'>Actions</TableCell>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order.id} onClick={() => handleRowClick()}>
            <TableCell className='flex items-center'>
              <img
                src={order.photo}
                alt={order.name}
                className='mr-2 size-12'
              />
              {order.name}
            </TableCell>

            <TableCell className='overflow-x-auto max-sm:hidden'>
              01/01/2000
            </TableCell>

            <TableCell>${order.price}</TableCell>
            <TableCell className='p-2 text-center align-middle'>
              <div className='flex justify-center'>
                <Button variant='outline' size='sm' className='mr-2'>
                  Details
                </Button>
                <Button variant='outline' size='sm'>
                  Rate
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { CartOrderHistoryTable }
