import { UpdateUserController } from '@controllers/UpdateUserController'
import { UpdateUserUseCaseFactory } from '../useCases/UpdateUserUseCase'

class UpdateUserControllerFactory {
  static create(): UpdateUserController {
    const updateUserUseCase = UpdateUserUseCaseFactory.create()

    return new UpdateUserController(updateUserUseCase)
  }
}

export { UpdateUserControllerFactory }
