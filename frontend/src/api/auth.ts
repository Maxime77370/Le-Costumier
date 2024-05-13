import type {
  LoginInput,
  LoginResult,
  RegisterInput,
  RegisterResult
} from 'types/api/auth'

import { stripe } from '@/lib/stripe'
import { instance } from './instance'

export function login(input: LoginInput) {
  return instance.post<LoginResult>('/login', input)
}

export async function register(input: RegisterInput) {
  const stripeCustomer = await stripe.customers.create({
    email: input.email,
    name: `${input.firstName} ${input.lastName}`
  })

  return instance.post<RegisterResult>('/register', {
    firstname: input.firstName,
    lastname: input.lastName,
    login: input.login,
    email: input.email,
    password: input.password,
    stripeCustomerId: stripeCustomer.id
  })
}
