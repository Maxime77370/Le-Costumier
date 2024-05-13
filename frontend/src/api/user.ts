import type {
  GetCurrentUserResult,
  UpdateUserInput,
  UpdateUserResult
} from 'types/api/users'

import { instance } from './instance'

export async function getCurrentUser() {
  return instance.get<GetCurrentUserResult>('/users')
}

export async function updateUser(input: UpdateUserInput) {
  return instance.put<UpdateUserResult>('/users', {
    ...input
  })
}
