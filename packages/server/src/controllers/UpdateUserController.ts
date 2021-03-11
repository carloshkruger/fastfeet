import { Controller, ControllerResponse } from '@core/controller'
import { UpdateUserUseCase } from '@useCases/UpdateUser/UpdateUserUseCase'

interface HandleParams {
  name: string
  email: string
  cpf: string
  loggedUserId: string
}

class UpdateUserController extends Controller {
  constructor(private updateUserUseCase: UpdateUserUseCase) {
    super()
  }

  async handle({
    name,
    email,
    cpf,
    loggedUserId
  }: HandleParams): Promise<ControllerResponse> {
    try {
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
