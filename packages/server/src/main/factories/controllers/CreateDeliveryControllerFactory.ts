import { CreateDeliveryController } from '@controllers/CreateDeliveryController'
import { CreateDeliveryUseCaseFactory } from '../useCases/CreateDeliveryUseCaseFactory'

class CreateDeliveryControllerFactory {
  static create(): CreateDeliveryController {
    const createDeliveryUseCase = CreateDeliveryUseCaseFactory.create()

    return new CreateDeliveryController(createDeliveryUseCase)
  }
}

export { CreateDeliveryControllerFactory }
