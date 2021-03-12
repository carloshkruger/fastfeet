import { ListDeliveriesAlreadyMadeByTheUserController } from '@controllers/ListDeliveriesAlreadyMadeByTheUserController'
import { ListDeliveriesAlreadyMadeByTheUserPresenter } from '@presenters/ListDeliveriesAlreadyMadeByTheUserPresenter'
import { ListDeliveriesAlreadyMadeByTheUserUseCaseFactory } from '../useCases/ListDeliveriesAlreadyMadeByTheUserUseCaseFactory'

class ListDeliveriesAlreadyMadeByTheUserControllerFactory {
  static create(): ListDeliveriesAlreadyMadeByTheUserController {
    const useCase = ListDeliveriesAlreadyMadeByTheUserUseCaseFactory.create()
    const presenter = new ListDeliveriesAlreadyMadeByTheUserPresenter()

    return new ListDeliveriesAlreadyMadeByTheUserController(useCase, presenter)
  }
}

export { ListDeliveriesAlreadyMadeByTheUserControllerFactory }
