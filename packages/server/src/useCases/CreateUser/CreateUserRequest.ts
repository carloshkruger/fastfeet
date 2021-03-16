interface CreateUserRequest {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  cpf: string
  isAdmin?: boolean
}

export { CreateUserRequest }
