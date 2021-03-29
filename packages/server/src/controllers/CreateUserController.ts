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
    const {
      name,
      email,
      cpf,
      password,
      passwordConfirmation,
      isAdmin
    } = request.data

    const useCaseResponse = await this.createUserUseCase.execute({
      name,
      email,
      cpf,
      password,
      passwordConfirmation,
      isAdmin
    })

    const viewModel = this.createUserPresenter.transform(useCaseResponse)

    return this.created(viewModel)
  }
}

export { CreateUserController }
