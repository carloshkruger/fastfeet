import { UpdateDeliveryController } from '@controllers/UpdateDeliveryController'
import { UpdateDeliveryUseCaseFactory } from '../useCases/UpdateDeliveryUseCaseFactory'

class UpdateDeliveryControllerFactory {
  static create(): UpdateDeliveryController {
    const updateDeliveryUseCase = UpdateDeliveryUseCaseFactory.create()

    return new UpdateDeliveryController(updateDeliveryUseCase)
  }
}

export { UpdateDeliveryControllerFactory }
