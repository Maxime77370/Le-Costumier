import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { updateUser } from '@/api/user'
import { cn } from '@/lib/utils'
import { neutralValuesToNull, neutralValuesToUndefined } from '@/lib/zod'
import { useAuthStore } from '@/stores/auth-store'
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
  lastName: neutralValuesToNull(z.string().nullable()),
  firstName: neutralValuesToNull(z.string().nullable()),
  login: z
    .string()
    .min(3, 'Login must be at least 3 characters long')
    .toLowerCase(),
  email: z.string().email('Invalid email'),
  password: neutralValuesToUndefined(
    z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .optional()
  )
})

type SchemaType = z.infer<typeof schema>

type AccountFormProps = {
  user: Omit<SchemaType, 'password'>
  className?: string
  onSuccess?: () => void
}

function AccountForm({ user, className, onSuccess }: AccountFormProps) {
  const setUser = useAuthStore(state => state.setUser)
  const oldUser = useAuthStore(state => state.user)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      lastName: user.lastName,
      firstName: user.firstName,
      login: user.login,
      email: user.email,
      password: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (result, variables) => {
      setUser({
        firstName:
          variables.firstName !== undefined
            ? variables.firstName
            : oldUser?.firstName ?? '',
        lastName:
          variables.lastName !== undefined
            ? variables.lastName
            : oldUser?.lastName ?? '',
        login:
          variables.login !== undefined
            ? variables.login
            : oldUser?.login ?? '',
        email:
          variables.email !== undefined ? variables.email : oldUser?.email ?? ''
      })

      if (onSuccess) {
        onSuccess()
      }
    }
  })

  const onSubmit = (data: SchemaType) => {
    mutate({
      firstName: oldUser
        ? data.firstName !== oldUser?.firstName
          ? data.firstName
          : undefined
        : data.firstName,
      lastName: oldUser
        ? data.lastName !== oldUser?.lastName
          ? data.lastName
          : undefined
        : data.lastName,
      login: oldUser
        ? data.login !== oldUser?.login
          ? data.login
          : undefined
        : data.login,
      email: oldUser
        ? data.email !== oldUser?.email
          ? data.email
          : undefined
        : data.email
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-y-2', className)}
      >
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} placeholder='Doe' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder='John'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name='email'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='email'
                  placeholder='john.doe@email.com'
                />
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
          <span>Update your account</span>
        </Button>
      </form>
    </Form>
  )
}

export { AccountForm }
