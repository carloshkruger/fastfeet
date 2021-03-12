import { TypeOrmDeliveryRepository } from '@infra/repositories/typeorm/TypeOrmDeliveryRepository'
import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { UpdateDeliveryUseCase } from '@useCases/UpdateDelivery/UpdateDeliveryUseCase'

class UpdateDeliveryUseCaseFactory {
  static create(): UpdateDeliveryUseCase {
    const userRepository = new TypeOrmUserRepository()
    const deliveryRepository = new TypeOrmDeliveryRepository()

    return new UpdateDeliveryUseCase(userRepository, deliveryRepository)
  }
}

export { UpdateDeliveryUseCaseFactory }
