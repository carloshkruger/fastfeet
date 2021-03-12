import { TypeOrmDeliveryRepository } from '@infra/repositories/typeorm/TypeOrmDeliveryRepository'
import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { FakeStorageProvider } from '@shared/providers/StorageProvider/FakeStorageProvider'
import { FinalizeDeliveryUseCase } from '@useCases/FinalizeDelivery/FinalizeDeliveryUseCase'

class FinalizeDeliveryUseCaseFactory {
  static create(): FinalizeDeliveryUseCase {
    const userRepository = new TypeOrmUserRepository()
    const deliveryRepository = new TypeOrmDeliveryRepository()
    const storageProvider = new FakeStorageProvider()

    return new FinalizeDeliveryUseCase(
      userRepository,
      deliveryRepository,
      storageProvider
    )
  }
}

export { FinalizeDeliveryUseCaseFactory }
