import { CreateDeliveryController } from '@controllers/CreateDeliveryController'
import { CreateDeliveryPresenter } from '@presenters/CreateDeliveryPresenter'
import { CreateDeliveryUseCaseFactory } from '../useCases/CreateDeliveryUseCaseFactory'

class CreateDeliveryControllerFactory {
  static create(): CreateDeliveryController {
    const createDeliveryUseCase = CreateDeliveryUseCaseFactory.create()
    const createDeliveryPresenter = new CreateDeliveryPresenter()

    return new CreateDeliveryController(
      createDeliveryUseCase,
      createDeliveryPresenter
    )
  }
}

export { CreateDeliveryControllerFactory }
