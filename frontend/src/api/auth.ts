import type {
  LoginInput,
  LoginResult,
  RegisterInput,
  RegisterResult
} from 'types/api/auth'

import { instance } from './instance'

export function login(input: LoginInput) {
  return instance.post<LoginResult>('/login', input)
}

export function register(input: RegisterInput) {
  return instance.post<RegisterResult>('/register', {
    firstname: input.firstName,
    lastname: input.lastName,
    login: input.login,
    email: input.email,
    password: input.password
  })
}
