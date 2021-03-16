import { AuthTokenProvider, AuthTokenProviderDecrypterResponse } from './AuthTokenProvider'
import { sign, verify } from 'jsonwebtoken'

class JWTAuthTokenProvider implements AuthTokenProvider {
  generate(userId: string): string {
    const token = sign({ userId }, 'secret')

    return token
  }

  decrypt(token: string): AuthTokenProviderDecrypterResponse {
    const { userId } = verify(token, 'secret') as any
    
    return {
      userId
    }
  }
}

export { JWTAuthTokenProvider }
