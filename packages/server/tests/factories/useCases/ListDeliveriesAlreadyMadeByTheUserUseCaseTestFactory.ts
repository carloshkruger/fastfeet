import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { ListDeliveriesAlreadyMadeByTheUserUseCase } from '@useCases/ListDeliveriesAlreadyMadeByTheUser/ListDeliveriesAlreadyMadeByTheUserUseCase'

interface Response {
  listDeliveriesAlreadyMadeByTheUserUseCase: ListDeliveriesAlreadyMadeByTheUserUseCase
  inMemoryDeliveryRepository: DeliveryRepository
  inMemoryUserRepository: UserRepository
}

class ListDeliveriesAlreadyMadeByTheUserUseCaseTestFactory {
  static create(): Response {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    const listDeliveriesAlreadyMadeByTheUserUseCase = new ListDeliveriesAlreadyMadeByTheUserUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )

    return {
      listDeliveriesAlreadyMadeByTheUserUseCase,
      inMemoryDeliveryRepository,
      inMemoryUserRepository
    }
  }
}

export { ListDeliveriesAlreadyMadeByTheUserUseCaseTestFactory }
