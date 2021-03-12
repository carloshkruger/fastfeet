import { AuthenticateUserController } from '@controllers/AuthenticateUserController'
import { AuthenticateUserPresenter } from '@presenters/AuthenticateUserPresenter'
import { AuthenticateUserUseCaseFactory } from '../useCases/AuthenticateUserUseCaseFactory'

class AuthenticateUserControllerFactory {
  static create(): AuthenticateUserController {
    const authenticateUserUseCase = AuthenticateUserUseCaseFactory.create()
    const authenticateUserPresenter = new AuthenticateUserPresenter()

    return new AuthenticateUserController(
      authenticateUserUseCase,
      authenticateUserPresenter
    )
  }
}

export { AuthenticateUserControllerFactory }
