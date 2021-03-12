import { DeleteDeliveryController } from '@controllers/DeleteDeliveryController'
import { DeleteDeliveryUseCaseFactory } from '../useCases/DeleteDeliveryUseCaseFactory'

class DeleteDeliveryControllerFactory {
  static create(): DeleteDeliveryController {
    const deleteDeliveryUseCase = DeleteDeliveryUseCaseFactory.create()

    return new DeleteDeliveryController(deleteDeliveryUseCase)
  }
}

export { DeleteDeliveryControllerFactory }
