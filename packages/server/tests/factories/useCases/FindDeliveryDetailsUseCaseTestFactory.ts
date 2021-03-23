import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { FindDeliveryDetailsUseCase } from '@useCases/FindDeliveryDetails/FindDeliveryDetailsUseCase'

interface Response {
  inMemoryDeliveryRepository: DeliveryRepository
  findDeliveryDetailsUseCase: FindDeliveryDetailsUseCase
}

class FindDeliveryDetailsUseCaseTestFactory {
  static create(): Response {
    const inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    const findDeliveryDetailsUseCase = new FindDeliveryDetailsUseCase(
      inMemoryDeliveryRepository
    )

    return {
      inMemoryDeliveryRepository,
      findDeliveryDetailsUseCase
    }
  }
}

export { FindDeliveryDetailsUseCaseTestFactory }
