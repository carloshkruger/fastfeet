import { Controller, ControllerResponse } from '@core/controller'
import { DeleteDeliveryUseCase } from '@useCases/DeleteDelivery/DeleteDeliveryUseCase'

interface HandleParams {
  deliveryId: string
}

class DeleteDeliveryController extends Controller {
  constructor(private deleteDeliveryUseCase: DeleteDeliveryUseCase) {
    super()
  }

  async handle({ deliveryId }: HandleParams): Promise<ControllerResponse> {
    try {
      await this.deleteDeliveryUseCase.execute({ deliveryId })

      return this.noContent()
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { DeleteDeliveryController }
