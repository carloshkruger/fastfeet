import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { StartDeliveryUseCase } from '@useCases/StartDelivery/StartDeliveryUseCase'

interface Response {
  startDeliveryUseCase: StartDeliveryUseCase
  inMemoryUserRepository: UserRepository
  inMemoryDeliveryRepository: DeliveryRepository
}

class StartDeliveryUseCaseTestFactory {
  static create(): Response {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    const startDeliveryUseCase = new StartDeliveryUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )

    return {
      startDeliveryUseCase,
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    }
  }
}

export { StartDeliveryUseCaseTestFactory }
