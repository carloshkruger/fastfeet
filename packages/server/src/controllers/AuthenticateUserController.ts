import { Controller, ControllerResponse } from '@core/controller'
import { AuthenticateUserPresenter } from '@presenters/AuthenticateUserPresenter'
import { AuthenticateUserUseCase } from '@useCases/AuthenticateUser/AuthenticateUserUseCase'

interface HandleParams {
  cpf: string
  password: string
}

class AuthenticateUserController extends Controller {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private authenticateUserPresenter: AuthenticateUserPresenter
  ) {
    super()
  }

  async handle(params: HandleParams): Promise<ControllerResponse> {
    try {
      const useCaseResponse = await this.authenticateUserUseCase.execute(params)

      const viewModel = this.authenticateUserPresenter.transform(
        useCaseResponse
      )

      return this.ok(viewModel)
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { AuthenticateUserController }
