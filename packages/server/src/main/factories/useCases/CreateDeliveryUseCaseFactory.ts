import { TypeOrmDeliveryRepository } from '@infra/repositories/typeorm/TypeOrmDeliveryRepository'
import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { CreateDeliveryUseCase } from '@useCases/CreateDelivery/CreateDeliveryUseCase'

class CreateDeliveryUseCaseFactory {
  static create(): CreateDeliveryUseCase {
    const userRepository = new TypeOrmUserRepository()
    const deliveryRepository = new TypeOrmDeliveryRepository()

    return new CreateDeliveryUseCase(userRepository, deliveryRepository)
  }
}

export { CreateDeliveryUseCaseFactory }
