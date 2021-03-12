import { Controller, ControllerResponse } from '@core/controller'
import { UpdateDeliveryUseCase } from '@useCases/UpdateDelivery/UpdateDeliveryUseCase'

interface HandleParams {
  deliveryId: string
  loggedUserId: string
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

class UpdateDeliveryController extends Controller {
  constructor(private updateDeliveryUseCase: UpdateDeliveryUseCase) {
    super()
  }

  async handle({
    deliveryId,
    loggedUserId,
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
      await this.updateDeliveryUseCase.execute({
        deliveryId,
        deliveryManId: loggedUserId,
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

      return this.noContent()
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { UpdateDeliveryController }
