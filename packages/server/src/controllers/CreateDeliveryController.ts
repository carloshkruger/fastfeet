import { Controller, ControllerResponse } from '@core/controller'
import { CreateDeliveryPresenter } from '@presenters/CreateDeliveryPresenter'
import { CreateDeliveryUseCase } from '@useCases/CreateDelivery/CreateDeliveryUseCase'

interface HandleParams {
  deliveryManId: string
  recipientName: string
  productName: string
  address: string
  postalCode: string
  neighborhood: string
  complement: string
  number: number
  city: string
  state: string
}

class CreateDeliveryController extends Controller {
  constructor(
    private createDeliveryUseCase: CreateDeliveryUseCase,
    private presenter: CreateDeliveryPresenter
  ) {
    super()
  }

  async handle({
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
  }: HandleParams): Promise<ControllerResponse> {
    try {
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
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { CreateDeliveryController }
