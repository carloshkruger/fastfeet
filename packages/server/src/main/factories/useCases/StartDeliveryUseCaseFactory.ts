import { TypeOrmDeliveryRepository } from '@infra/repositories/typeorm/TypeOrmDeliveryRepository'
import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { StartDeliveryUseCase } from '@useCases/StartDelivery/StartDeliveryUseCase'

class StartDeliveryUseCaseFactory {
  static create(): StartDeliveryUseCase {
    const userRepository = new TypeOrmUserRepository()
    const deliveryRepository = new TypeOrmDeliveryRepository()

    return new StartDeliveryUseCase(userRepository, deliveryRepository)
  }
}

export { StartDeliveryUseCaseFactory }
