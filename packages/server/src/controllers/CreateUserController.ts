import { CreateUserPresenter } from '@presenters/CreateUserPresenter'
import { CreateUserUseCase } from '@useCases/CreateUser/CreateUserUseCase'
import { Controller, ControllerResponse } from '../core/controller'

interface HandleParams {
  name: string
  email: string
  cpf: string
  password: string
  passwordConfirmation: string
  isAdmin?: boolean
}

class CreateUserController extends Controller {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private createUserPresenter: CreateUserPresenter
  ) {
    super()
  }

  async handle({
    name,
    email,
    cpf,
    password,
    passwordConfirmation,
    isAdmin
  }: HandleParams): Promise<ControllerResponse> {
    try {
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
