import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { login } from '@/api/auth'
import { cn } from '@/lib/utils'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { InputPassword } from '../ui/input-password'

const schema = z.object({
  login: z.string().min(1, 'Login is required').toLowerCase(),
  password: z.string().min(1, 'Password is required')
})

type SchemaType = z.infer<typeof schema>

type LoginFormProps = {
  className?: string
  onSuccess?: () => void
}

function LoginForm({ className, onSuccess }: LoginFormProps) {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      login: '',
      password: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess,
    onError: err => {
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error('Invalid login or password')
      }
    }
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-y-2', className)}
      >
        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input {...field} placeholder='johndoe' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword
                  {...field}
                  placeholder='Your very ultra secret password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isPending}
          className='mt-2 w-full gap-x-2'
        >
          {isPending && <Icons.spinner className='size-4 animate-spin' />}
          <span>Login</span>
        </Button>
      </form>
    </Form>
  )
}

export { LoginForm }
