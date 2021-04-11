import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { FinalizeDeliveryUseCase } from '@useCases/FinalizeDelivery/FinalizeDeliveryUseCase'

class FinalizeDeliveryController extends Controller {
  constructor(private finalizeDeliveryUseCase: FinalizeDeliveryUseCase) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const fileName = request.files ? request.files[0]?.filename : ''

    const { deliveryId } = request.data
    const { loggedUserId = '' } = request

    await this.finalizeDeliveryUseCase.execute({
      deliveryId,
      deliveryManId: loggedUserId,
      signatureImage: fileName
    })

    return this.noContent()
  }
}

export { FinalizeDeliveryController }
