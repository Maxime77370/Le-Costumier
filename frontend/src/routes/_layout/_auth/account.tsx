import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

import { getProducts } from '@/api/products'
import { AccountForm } from '@/components/account/account-form'
import { CartOrderHistoryTable } from '@/components/cart/cart-order-history-table'
import { Icons } from '@/components/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_layout/_auth/account')({
  component: Account
})

const options = queryOptions({
  queryKey: ['products', 'last-10'],
  queryFn: () => getProducts({ limit: 10, sort: 'name', order: 'desc' }),
  select: res => res.data
})

export function Account() {
  const user = useAuthStore(state => state.user)

  const productsQuery = useSuspenseQuery(options)
  const products = productsQuery.data

  return (
    <div className='mt-4'>
      {user ? (
        <>
          <div className='font-bold text-3xl'>{user.login}</div>
          <Accordion type='single' collapsible>
            <AccordionItem value='setting'>
              <AccordionTrigger className='mt-4 text-xl'>
                Account setting
              </AccordionTrigger>
              <AccordionContent>
                <AccountForm
                  user={user}
                  className='mt-2'
                  onSuccess={() => {
                    toast.success('Account updated successfully!')
                  }}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='order-history'>
              <AccordionTrigger className='mt-4 text-xl'>
                Order history
              </AccordionTrigger>
              <AccordionContent>
                <div className='mt-2'>Order history</div>
                <CartOrderHistoryTable orders={products} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <Icons.spinner className='size-6 animate-spin' />
      )}
    </div>
  )
}
