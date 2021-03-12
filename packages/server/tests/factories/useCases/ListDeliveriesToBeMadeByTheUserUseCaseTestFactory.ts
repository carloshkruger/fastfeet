import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { ListDeliveriesToBeMadeByTheUserUseCase } from '@useCases/ListDeliveriesToBeMadeByTheUser/ListDeliveriesToBeMadeByTheUserUseCase'

interface Response {
  listDeliveriesToBeMadeByTheUserUseCase: ListDeliveriesToBeMadeByTheUserUseCase
  inMemoryDeliveryRepository: DeliveryRepository
  inMemoryUserRepository: UserRepository
}

class ListDeliveriesToBeMadeByTheUserUseCaseTestFactory {
  static create(): Response {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    const listDeliveriesToBeMadeByTheUserUseCase = new ListDeliveriesToBeMadeByTheUserUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )

    return {
      listDeliveriesToBeMadeByTheUserUseCase,
      inMemoryDeliveryRepository,
      inMemoryUserRepository
    }
  }
}

export { ListDeliveriesToBeMadeByTheUserUseCaseTestFactory }
