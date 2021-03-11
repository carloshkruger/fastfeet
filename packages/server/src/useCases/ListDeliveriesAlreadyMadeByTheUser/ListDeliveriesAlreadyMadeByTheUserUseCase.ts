import { UniqueEntityId } from '../../core/domain/UniqueEntityId'
import { UseCase } from '../../core/domain/UseCase'
import { AppError } from '../../core/errors/AppError'
import { FieldRequiredError } from '../../core/errors/FieldRequiredError'
import { Delivery } from '../../domain/Delivery'
import { DeliveryRepository } from '../../repositories/DeliveryRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { ListDeliveriesAlreadyMadeByTheUserRequest } from './ListDeliveriesAlreadyMadeByTheUserRequest'

class ListDeliveriesAlreadyMadeByTheUserUseCase
  implements UseCase<ListDeliveriesAlreadyMadeByTheUserRequest, Delivery[]> {
  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository
  ) {}

  async execute({
    deliveryManId
  }: ListDeliveriesAlreadyMadeByTheUserRequest): Promise<Delivery[]> {
    if (!deliveryManId) {
      throw new FieldRequiredError('Delivery man id')
    }

    const deliveryMan = await this.userRepository.findById(deliveryManId)

    if (!deliveryMan) {
      throw new AppError('Delivery man not found.')
    }

    const deliveries = await this.deliveryRepository.listDeliveriesAlreadyMadeByUserId(
      new UniqueEntityId(deliveryManId)
    )

    const filteredDeliveries = deliveries.filter(delivery =>
      delivery.isFinished()
    )

    return filteredDeliveries
  }
}

export { ListDeliveriesAlreadyMadeByTheUserUseCase }
