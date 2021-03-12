import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { FakeStorageProvider } from '@shared/providers/StorageProvider/FakeStorageProvider'
import { StorageProvider } from '@shared/providers/StorageProvider/StorageProvider'
import { FinalizeDeliveryUseCase } from '@useCases/FinalizeDelivery/FinalizeDeliveryUseCase'

interface Response {
  finalizeDeliveryUseCase: FinalizeDeliveryUseCase
  fakeStorageProvider: StorageProvider
  inMemoryDeliveryRepository: DeliveryRepository
  inMemoryUserRepository: UserRepository
}

class FinalizeDeliveryUseCaseTestFactory {
  static create(): Response {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const finalizeDeliveryUseCase = new FinalizeDeliveryUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository,
      fakeStorageProvider
    )

    return {
      finalizeDeliveryUseCase,
      fakeStorageProvider,
      inMemoryDeliveryRepository,
      inMemoryUserRepository
    }
  }
}

export { FinalizeDeliveryUseCaseTestFactory }
