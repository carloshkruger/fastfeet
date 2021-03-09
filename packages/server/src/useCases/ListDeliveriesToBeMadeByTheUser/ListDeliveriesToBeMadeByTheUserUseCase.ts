import { UniqueEntityId } from '../../core/domain/UniqueEntityId'
import { UseCase } from '../../core/domain/UseCase'
import { Delivery } from '../../domain/Delivery'
import { DeliveryRepository } from '../../repositories/DeliveryRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { ListDeliveriesToBeMadeByTheUserRequest } from './ListDeliveriesToBeMadeByTheUserRequest'

class ListDeliveriesToBeMadeByTheUserUseCase
  implements UseCase<ListDeliveriesToBeMadeByTheUserRequest, Delivery[]> {
  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository
  ) {}

  async execute({
    deliveryManId
  }: ListDeliveriesToBeMadeByTheUserRequest): Promise<Delivery[]> {
    if (!deliveryManId) {
      throw new Error('Delivery man not informed.')
    }

    const deliveryMan = await this.userRepository.findById(deliveryManId)

    if (!deliveryMan) {
      throw new Error('Delivery man not found.')
    }

    const deliveries = await this.deliveryRepository.listDeliveriesToBeMadeByUserId(
      new UniqueEntityId(deliveryManId)
    )

    const filteredDeliveries = deliveries.filter(
      delivery => !delivery.isFinished() && !delivery.isCanceled()
    )

    return filteredDeliveries
  }
}

export { ListDeliveriesToBeMadeByTheUserUseCase }
