import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase } from '@useCases/FindAllNeighborhoodsThatTheUserHasAlreadyDelivered/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase'

interface Response {
  inMemoryDeliveryRepository: DeliveryRepository
  findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase: FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase
}

class FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCaseTestFactory {
  static create(): Response {
    const inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    const findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase = new FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase(
      inMemoryDeliveryRepository
    )

    return {
      inMemoryDeliveryRepository,
      findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase
    }
  }
}

export { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCaseTestFactory }
