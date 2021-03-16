import {
  AuthTokenProvider,
  AuthTokenProviderDecrypterResponse
} from './AuthTokenProvider'

class FakeAuthTokenProvider implements AuthTokenProvider {
  generate(userId: string): string {
    return 'auth_token'
  }

  decrypt(token: string): AuthTokenProviderDecrypterResponse {
    return {
      userId: 'user_id'
    }
  }
}

export { FakeAuthTokenProvider }
