import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { ListDeliveriesAlreadyMadeByTheUserPresenter } from '@presenters/ListDeliveriesAlreadyMadeByTheUserPresenter'
import { ListDeliveriesAlreadyMadeByTheUserUseCase } from '@useCases/ListDeliveriesAlreadyMadeByTheUser/ListDeliveriesAlreadyMadeByTheUserUseCase'

class ListDeliveriesAlreadyMadeByTheUserController extends Controller {
  constructor(
    private useCase: ListDeliveriesAlreadyMadeByTheUserUseCase,
    private presenter: ListDeliveriesAlreadyMadeByTheUserPresenter
  ) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { loggedUserId = '' } = request

    const useCaseResponse = await this.useCase.execute({
      deliveryManId: loggedUserId
    })

    const viewModel = this.presenter.transform(useCaseResponse)

    return this.ok(viewModel)
  }
}

export { ListDeliveriesAlreadyMadeByTheUserController }
