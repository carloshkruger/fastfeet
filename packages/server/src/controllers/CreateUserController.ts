import { CreateUserPresenter } from '@presenters/CreateUserPresenter'
import { CreateUserUseCase } from '@useCases/CreateUser/CreateUserUseCase'
import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '../core/controller'

class CreateUserController extends Controller {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private createUserPresenter: CreateUserPresenter
  ) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    try {
      const {
        name,
        email,
        cpf,
        password,
        passwordConfirmation,
        isAdmin
      } = request.body

      const useCaseResponse = await this.createUserUseCase.execute({
        name,
        email,
        cpf,
        password,
        passwordConfirmation,
        isAdmin
      })

      const viewModel = this.createUserPresenter.transform(useCaseResponse)

      return this.ok(viewModel)
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { CreateUserController }
