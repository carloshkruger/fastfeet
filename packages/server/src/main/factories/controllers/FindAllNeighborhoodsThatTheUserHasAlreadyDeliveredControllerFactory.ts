import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController } from '@controllers/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCaseFactory } from '../useCases/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCaseFactory'

class FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredControllerFactory {
  static create(): FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController {
    const useCase = FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCaseFactory.create()

    return new FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController(
      useCase
    )
  }
}

export { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredControllerFactory }
