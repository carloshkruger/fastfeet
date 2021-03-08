import { AuthTokenProvider } from './AuthTokenProvider'
import { sign } from 'jsonwebtoken'

class JWTAuthTokenProvider implements AuthTokenProvider {
  generate(userId: string): string {
    const token = sign({ userId }, 'secret')

    return token
  }
}

export { JWTAuthTokenProvider }
