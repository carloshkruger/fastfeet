import { StartDeliveryController } from '@controllers/StartDeliveryController'
import { StartDeliveryUseCaseFactory } from '../useCases/StartDeliveryUseCaseFactory'

class StartDeliveryControllerFactory {
  static create(): StartDeliveryController {
    const startDeliveryUseCase = StartDeliveryUseCaseFactory.create()

    return new StartDeliveryController(startDeliveryUseCase)
  }
}

export { StartDeliveryControllerFactory }
