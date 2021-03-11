import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { CreateDeliveryUseCase } from '@useCases/CreateDelivery/CreateDeliveryUseCase'

interface Response {
  inMemoryUserRepository: UserRepository
  inMemoryDeliveryRepository: DeliveryRepository
  createDeliveryUseCase: CreateDeliveryUseCase
}

class CreateDeliveryUseCaseTestFactory {
  static create(): Response {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    const createDeliveryUseCase = new CreateDeliveryUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )

    return {
      inMemoryUserRepository,
      inMemoryDeliveryRepository,
      createDeliveryUseCase
    }
  }
}

export { CreateDeliveryUseCaseTestFactory }
