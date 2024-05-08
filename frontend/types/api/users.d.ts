type UserDatabase = {
  firstname: string | null
  lastname: string | null
  email: string
  login: string
}

export type GetCurrentUserResult = UserDatabase

export type UpdateUserInput = {
  firstName?: string | null
  lastName?: string | null
  email?: string
  login?: string
  password?: string
}

export type UpdateUserResult = UserDatabase
