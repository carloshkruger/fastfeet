import { TypeOrmDeliveryRepository } from '@infra/repositories/typeorm/TypeOrmDeliveryRepository'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase } from '@useCases/FindAllNeighborhoodsThatTheUserHasAlreadyDelivered/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase'

class FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCaseFactory {
  static create(): FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase {
    const deliveryRepository = new TypeOrmDeliveryRepository()

    return new FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase(
      deliveryRepository
    )
  }
}

export { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCaseFactory }
