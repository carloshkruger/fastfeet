import { Controller, ControllerResponse } from '@core/controller'
import { ListDeliveriesAlreadyMadeByTheUserPresenter } from '@presenters/ListDeliveriesAlreadyMadeByTheUserPresenter'
import { ListDeliveriesAlreadyMadeByTheUserUseCase } from '@useCases/ListDeliveriesAlreadyMadeByTheUser/ListDeliveriesAlreadyMadeByTheUserUseCase'

interface HandleParams {
  loggedUserId: string
}

class ListDeliveriesAlreadyMadeByTheUserController extends Controller {
  constructor(
    private useCase: ListDeliveriesAlreadyMadeByTheUserUseCase,
    private presenter: ListDeliveriesAlreadyMadeByTheUserPresenter
  ) {
    super()
  }

  async handle({ loggedUserId }: HandleParams): Promise<ControllerResponse> {
    try {
      const useCaseResponse = await this.useCase.execute({
        deliveryManId: loggedUserId
      })

      const viewModel = this.presenter.transform(useCaseResponse)

      return this.ok(viewModel)
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { ListDeliveriesAlreadyMadeByTheUserController }
