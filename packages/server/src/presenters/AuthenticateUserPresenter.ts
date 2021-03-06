import { AuthenticateUserResponse } from '@useCases/AuthenticateUser/AuthenticateUserResponse'

interface AuthenticateUserPresenterResponse {
  accessToken: string
  user: {
    id: string
    name: string
  }
}

class AuthenticateUserPresenter {
  transform(
    authenticateUserResponse: AuthenticateUserResponse
  ): AuthenticateUserPresenterResponse {
    return {
      accessToken: authenticateUserResponse.accessToken,
      user: {
        id: authenticateUserResponse.user.id.value,
        name: authenticateUserResponse.user.name.value
      }
    }
  }
}

export { AuthenticateUserPresenter }
