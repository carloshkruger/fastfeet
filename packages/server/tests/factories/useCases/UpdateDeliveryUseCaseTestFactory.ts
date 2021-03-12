import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { UpdateDeliveryUseCase } from '@useCases/UpdateDelivery/UpdateDeliveryUseCase'

interface Response {
  updateDeliveryUseCase: UpdateDeliveryUseCase
  inMemoryDeliveryRepository: DeliveryRepository
  inMemoryUserRepository: UserRepository
}

class UpdateDeliveryUseCaseTestFactory {
  static create(): Response {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    const updateDeliveryUseCase = new UpdateDeliveryUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )

    return {
      updateDeliveryUseCase,
      inMemoryDeliveryRepository,
      inMemoryUserRepository
    }
  }
}

export { UpdateDeliveryUseCaseTestFactory }
