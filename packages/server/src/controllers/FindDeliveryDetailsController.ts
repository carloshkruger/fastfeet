import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { FindDeliveryDetailsPresenter } from '@presenters/FindDeliveryDetailsPresenter'
import { FindDeliveryDetailsUseCase } from '@useCases/FindDeliveryDetails/FindDeliveryDetailsUseCase'

class FindDeliveryDetailsController extends Controller {
  constructor(
    private useCase: FindDeliveryDetailsUseCase,
    private presenter: FindDeliveryDetailsPresenter
  ) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    try {
      const { deliveryId } = request.data

      const useCaseResponse = await this.useCase.execute({ deliveryId })

      const viewModel = this.presenter.transform(useCaseResponse)

      return this.ok(viewModel)
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { FindDeliveryDetailsController }
