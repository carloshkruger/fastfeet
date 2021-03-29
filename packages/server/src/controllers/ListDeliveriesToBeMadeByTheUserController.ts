import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { ListDeliveriesToBeMadeByTheUserPresenter } from '@presenters/ListDeliveriesToBeMadeByTheUserPresenter'
import { ListDeliveriesToBeMadeByTheUserUseCase } from '@useCases/ListDeliveriesToBeMadeByTheUser/ListDeliveriesToBeMadeByTheUserUseCase'

class ListDeliveriesToBeMadeByTheUserController extends Controller {
  constructor(
    private useCase: ListDeliveriesToBeMadeByTheUserUseCase,
    private presenter: ListDeliveriesToBeMadeByTheUserPresenter
  ) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    try {
      const { neighborhood } = request.data
      const { loggedUserId = '' } = request

      const useCaseResponse = await this.useCase.execute({
        deliveryManId: loggedUserId,
        neighborhood
      })

      const viewModel = this.presenter.transform(useCaseResponse)

      return this.ok(viewModel)
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { ListDeliveriesToBeMadeByTheUserController }
