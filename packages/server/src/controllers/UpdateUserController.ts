import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { UpdateUserUseCase } from '@useCases/UpdateUser/UpdateUserUseCase'

class UpdateUserController extends Controller {
  constructor(private updateUserUseCase: UpdateUserUseCase) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    try {
      const { name, email, cpf } = request.data
      const { loggedUserId = '' } = request

      await this.updateUserUseCase.execute({
        name,
        email,
        cpf,
        userId: loggedUserId
      })

      return this.noContent()
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { UpdateUserController }
