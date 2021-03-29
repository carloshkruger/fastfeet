import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { CreateDeliveryPresenter } from '@presenters/CreateDeliveryPresenter'
import { CreateDeliveryUseCase } from '@useCases/CreateDelivery/CreateDeliveryUseCase'

class CreateDeliveryController extends Controller {
  constructor(
    private createDeliveryUseCase: CreateDeliveryUseCase,
    private presenter: CreateDeliveryPresenter
  ) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const {
      deliveryManId,
      recipientName,
      productName,
      address,
      postalCode,
      neighborhood,
      complement,
      number,
      city,
      state
    } = request.data

    const useCaseResponse = await this.createDeliveryUseCase.execute({
      deliveryManId,
      recipientName,
      productName,
      address,
      postalCode,
      neighborhood,
      complement,
      number,
      city,
      state
    })

    const viewModel = this.presenter.transform(useCaseResponse)

    return this.created(viewModel)
  }
}

export { CreateDeliveryController }
