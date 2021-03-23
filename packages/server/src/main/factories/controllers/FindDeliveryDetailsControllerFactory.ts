import { FindDeliveryDetailsController } from '@controllers/FindDeliveryDetailsController'
import { FindDeliveryDetailsPresenter } from '@presenters/FindDeliveryDetailsPresenter'
import { FindDeliveryDetailsUseCaseFactory } from '../useCases/FindDeliveryDetailsUseCaseFactory'

class FindDeliveryDetailsControllerFactory {
  static create(): FindDeliveryDetailsController {
    const useCase = FindDeliveryDetailsUseCaseFactory.create()
    const presenter = new FindDeliveryDetailsPresenter()

    return new FindDeliveryDetailsController(useCase, presenter)
  }
}

export { FindDeliveryDetailsControllerFactory }
