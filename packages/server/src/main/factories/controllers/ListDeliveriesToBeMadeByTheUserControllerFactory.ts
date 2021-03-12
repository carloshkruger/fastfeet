import { ListDeliveriesToBeMadeByTheUserController } from '@controllers/ListDeliveriesToBeMadeByTheUserController'
import { ListDeliveriesToBeMadeByTheUserPresenter } from '@presenters/ListDeliveriesToBeMadeByTheUserPresenter'
import { ListDeliveriesToBeMadeByTheUserUseCaseFactory } from '../useCases/ListDeliveriesToBeMadeByTheUserUseCaseFactory'

class ListDeliveriesToBeMadeByTheUserControllerFactory {
  static create(): ListDeliveriesToBeMadeByTheUserController {
    const useCase = ListDeliveriesToBeMadeByTheUserUseCaseFactory.create()
    const presenter = new ListDeliveriesToBeMadeByTheUserPresenter()

    return new ListDeliveriesToBeMadeByTheUserController(useCase, presenter)
  }
}

export { ListDeliveriesToBeMadeByTheUserControllerFactory }
