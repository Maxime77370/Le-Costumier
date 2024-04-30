export type LoginInput = {
  login: string
  password: string
}

export type LoginResult = {
  token: string
}

export type RegisterInput = {
  login: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export type RegisterResult = {
  token: string
}
