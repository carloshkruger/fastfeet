import { Controller, ControllerResponse } from '@core/controller'
import { FindDeliveryDetailsPresenter } from '@presenters/FindDeliveryDetailsPresenter'
import { FindDeliveryDetailsUseCase } from '@useCases/FindDeliveryDetails/FindDeliveryDetailsUseCase'

interface HandleParams {
  deliveryId: string
}

class FindDeliveryDetailsController extends Controller {
  constructor(
    private useCase: FindDeliveryDetailsUseCase,
    private presenter: FindDeliveryDetailsPresenter
  ) {
    super()
  }

  async handle({ deliveryId }: HandleParams): Promise<ControllerResponse> {
    try {
      const useCaseResponse = await this.useCase.execute({ deliveryId })

      const viewModel = this.presenter.transform(useCaseResponse)

      return this.ok(viewModel)
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { FindDeliveryDetailsController }
