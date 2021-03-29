import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { StartDeliveryUseCase } from '@useCases/StartDelivery/StartDeliveryUseCase'

class StartDeliveryController extends Controller {
  constructor(private startDeliveryUseCase: StartDeliveryUseCase) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { deliveryId } = request.data
    const { loggedUserId = '' } = request

    await this.startDeliveryUseCase.execute({
      deliveryId,
      deliveryManId: loggedUserId
    })

    return this.noContent()
  }
}

export { StartDeliveryController }
