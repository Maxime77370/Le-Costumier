import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: Index
})

function Index() {
  return <h1 className='font-bold text-2xl'>Welcome Home!</h1>
}
