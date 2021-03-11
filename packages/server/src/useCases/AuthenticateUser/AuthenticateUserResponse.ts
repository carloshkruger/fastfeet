import { User } from '@domain/User'

interface AuthenticateUserResponse {
  user: User
  accessToken: string
}

export { AuthenticateUserResponse }
