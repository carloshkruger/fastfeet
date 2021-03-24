import { Controller, ControllerResponse } from '@core/controller'
import { FinalizeDeliveryUseCase } from '@useCases/FinalizeDelivery/FinalizeDeliveryUseCase'

interface HandleParams {
  deliveryId: string
  loggedUserId: string
  file: {
    filename: string
  }
}

class FinalizeDeliveryController extends Controller {
  constructor(private finalizeDeliveryUseCase: FinalizeDeliveryUseCase) {
    super()
  }

  async handle({
    deliveryId,
    loggedUserId,
    file
  }: HandleParams): Promise<ControllerResponse> {
    try {
      await this.finalizeDeliveryUseCase.execute({
        deliveryId,
        deliveryManId: loggedUserId,
        signatureImage: file.filename
      })

      return this.noContent()
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { FinalizeDeliveryController }
