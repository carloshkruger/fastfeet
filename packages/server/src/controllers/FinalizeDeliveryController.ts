import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { removeTempFile } from '@shared/utils/removeTempFile'
import { FinalizeDeliveryUseCase } from '@useCases/FinalizeDelivery/FinalizeDeliveryUseCase'

class FinalizeDeliveryController extends Controller {
  constructor(private finalizeDeliveryUseCase: FinalizeDeliveryUseCase) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const fileName = request.files ? request.files[0]?.filename : ''

    try {
      const { deliveryId } = request.data
      const { loggedUserId = '' } = request

      await this.finalizeDeliveryUseCase.execute({
        deliveryId,
        deliveryManId: loggedUserId,
        signatureImage: fileName
      })

      return this.noContent()
    } catch (error) {
      await removeTempFile(fileName)

      return this.fail(error)
    }
  }
}

export { FinalizeDeliveryController }
