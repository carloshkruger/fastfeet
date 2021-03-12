import { Controller, ControllerResponse } from '@core/controller'
import { StartDeliveryUseCase } from '@useCases/StartDelivery/StartDeliveryUseCase'

interface HandleParams {
  deliveryId: string
  loggedUserId: string
}

class StartDeliveryController extends Controller {
  constructor(private startDeliveryUseCase: StartDeliveryUseCase) {
    super()
  }

  async handle({
    deliveryId,
    loggedUserId
  }: HandleParams): Promise<ControllerResponse> {
    try {
      await this.startDeliveryUseCase.execute({
        deliveryId,
        deliveryManId: loggedUserId
      })

      return this.noContent()
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { StartDeliveryController }
