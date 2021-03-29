import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { AuthenticateUserPresenter } from '@presenters/AuthenticateUserPresenter'
import { AuthenticateUserUseCase } from '@useCases/AuthenticateUser/AuthenticateUserUseCase'

class AuthenticateUserController extends Controller {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private authenticateUserPresenter: AuthenticateUserPresenter
  ) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { cpf, password } = request.data

    const useCaseResponse = await this.authenticateUserUseCase.execute({
      cpf,
      password
    })

    const viewModel = this.authenticateUserPresenter.transform(useCaseResponse)

    return this.ok(viewModel)
  }
}

export { AuthenticateUserController }
