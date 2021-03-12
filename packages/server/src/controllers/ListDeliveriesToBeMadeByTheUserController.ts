import { Controller, ControllerResponse } from '@core/controller'
import { ListDeliveriesToBeMadeByTheUserPresenter } from '@presenters/ListDeliveriesToBeMadeByTheUserPresenter'
import { ListDeliveriesToBeMadeByTheUserUseCase } from '@useCases/ListDeliveriesToBeMadeByTheUser/ListDeliveriesToBeMadeByTheUserUseCase'

interface HandleParams {
  loggedUserId: string
}

class ListDeliveriesToBeMadeByTheUserController extends Controller {
  constructor(
    private useCase: ListDeliveriesToBeMadeByTheUserUseCase,
    private presenter: ListDeliveriesToBeMadeByTheUserPresenter
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

export { ListDeliveriesToBeMadeByTheUserController }