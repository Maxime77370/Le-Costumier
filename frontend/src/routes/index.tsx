import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-y-4'>
      <h1 className='text-2xl font-bold'>Welcome Home!</h1>

      <Button>Click me</Button>
    </div>
  )
}
