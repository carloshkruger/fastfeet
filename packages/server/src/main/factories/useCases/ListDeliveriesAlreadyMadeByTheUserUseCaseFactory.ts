import { TypeOrmDeliveryRepository } from '@infra/repositories/typeorm/TypeOrmDeliveryRepository'
import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { ListDeliveriesAlreadyMadeByTheUserUseCase } from '@useCases/ListDeliveriesAlreadyMadeByTheUser/ListDeliveriesAlreadyMadeByTheUserUseCase'

class ListDeliveriesAlreadyMadeByTheUserUseCaseFactory {
  static create(): ListDeliveriesAlreadyMadeByTheUserUseCase {
    const userRepository = new TypeOrmUserRepository()
    const deliveryRepository = new TypeOrmDeliveryRepository()

    return new ListDeliveriesAlreadyMadeByTheUserUseCase(
      userRepository,
      deliveryRepository
    )
  }
}

export { ListDeliveriesAlreadyMadeByTheUserUseCaseFactory }
