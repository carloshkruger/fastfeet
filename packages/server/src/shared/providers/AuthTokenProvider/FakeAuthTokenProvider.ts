import { AuthTokenProvider } from './AuthTokenProvider'

class FakeAuthTokenProvider implements AuthTokenProvider {
  generate(userId: string): string {
    return 'auth_token'
  }
}

export { FakeAuthTokenProvider }
