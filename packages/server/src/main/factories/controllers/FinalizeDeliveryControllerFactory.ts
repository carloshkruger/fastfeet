import { FinalizeDeliveryController } from '@controllers/FinalizeDeliveryController'
import { FinalizeDeliveryUseCaseFactory } from '../useCases/FinalizeDeliveryUseCaseFactory'

class FinalizeDeliveryControllerFactory {
  static create(): FinalizeDeliveryController {
    const finalizeDeliveryUseCase = FinalizeDeliveryUseCaseFactory.create()

    return new FinalizeDeliveryController(finalizeDeliveryUseCase)
  }
}

export { FinalizeDeliveryControllerFactory }
