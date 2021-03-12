import { TypeOrmDeliveryRepository } from '@infra/repositories/typeorm/TypeOrmDeliveryRepository'
import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { ListDeliveriesToBeMadeByTheUserUseCase } from '@useCases/ListDeliveriesToBeMadeByTheUser/ListDeliveriesToBeMadeByTheUserUseCase'

class ListDeliveriesToBeMadeByTheUserUseCaseFactory {
  static create(): ListDeliveriesToBeMadeByTheUserUseCase {
    const userRepository = new TypeOrmUserRepository()
    const deliveryRepository = new TypeOrmDeliveryRepository()

    return new ListDeliveriesToBeMadeByTheUserUseCase(
      userRepository,
      deliveryRepository
    )
  }
}

export { ListDeliveriesToBeMadeByTheUserUseCaseFactory }
