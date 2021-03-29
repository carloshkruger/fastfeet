import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { UpdateDeliveryUseCase } from '@useCases/UpdateDelivery/UpdateDeliveryUseCase'

class UpdateDeliveryController extends Controller {
  constructor(private updateDeliveryUseCase: UpdateDeliveryUseCase) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    try {
      const {
        deliveryId,
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

      await this.updateDeliveryUseCase.execute({
        deliveryId,
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

      return this.noContent()
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { UpdateDeliveryController }
