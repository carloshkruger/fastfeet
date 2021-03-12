import { CreateUserController } from '@controllers/CreateUserController'
import { CreateUserPresenter } from '@presenters/CreateUserPresenter'
import { CreateUserUseCaseFactory } from '../useCases/CreateUserUseCaseFactory'

class CreateUserControllerFactory {
  static create(): CreateUserController {
    const createUserUseCase = CreateUserUseCaseFactory.create()
    const createUserPresenter = new CreateUserPresenter()

    return new CreateUserController(createUserUseCase, createUserPresenter)
  }
}

export { CreateUserControllerFactory }
