import { Controller, ControllerResponse } from '@core/controller'
import { CreateDeliveryUseCase } from '@useCases/CreateDelivery/CreateDeliveryUseCase'

interface HandleParams {
  deliveryManId: string
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
  constructor(private createDeliveryUseCase: CreateDeliveryUseCase) {
    super()
  }

  async handle({
    deliveryManId,
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
      await this.createDeliveryUseCase.execute({
        deliveryManId,
        productName,
        address,
        postalCode,
        neighborhood,
        complement,
        number,
        city,
        state
      })

      return this.created()
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { CreateDeliveryController }
