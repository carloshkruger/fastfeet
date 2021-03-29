import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { DeleteDeliveryUseCase } from '@useCases/DeleteDelivery/DeleteDeliveryUseCase'

class DeleteDeliveryController extends Controller {
  constructor(private deleteDeliveryUseCase: DeleteDeliveryUseCase) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { deliveryId } = request.data

    await this.deleteDeliveryUseCase.execute({ deliveryId })

    return this.noContent()
  }
}

export { DeleteDeliveryController }
