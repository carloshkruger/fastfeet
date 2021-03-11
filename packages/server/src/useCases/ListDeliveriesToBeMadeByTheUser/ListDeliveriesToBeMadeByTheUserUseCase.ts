import { UniqueEntityId } from '../../core/domain/UniqueEntityId'
import { UseCase } from '../../core/domain/UseCase'
import { AppError } from '../../core/errors/AppError'
import { FieldRequiredError } from '../../core/errors/FieldRequiredError'
import { Delivery } from '../../domain/Delivery'
import { DeliveryRepository } from '../../repositories/DeliveryRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { isEmpty } from '../../shared/utils/String'
import { ListDeliveriesToBeMadeByTheUserRequest } from './ListDeliveriesToBeMadeByTheUserRequest'

class ListDeliveriesToBeMadeByTheUserUseCase
  implements UseCase<ListDeliveriesToBeMadeByTheUserRequest, Delivery[]> {
  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository
  ) {}

  async execute({
    deliveryManId,
    neighborhood
  }: ListDeliveriesToBeMadeByTheUserRequest): Promise<Delivery[]> {
    if (!deliveryManId) {
      throw new FieldRequiredError('Delivery man id')
    }

    const deliveryMan = await this.userRepository.findById(deliveryManId)

    if (!deliveryMan) {
      throw new AppError('Delivery man not found')
    }

    const deliveries = await this.deliveryRepository.listDeliveriesToBeMadeByUserId(
      new UniqueEntityId(deliveryManId),
      neighborhood
    )

    let filteredDeliveries = deliveries.filter(
      delivery => !delivery.isFinished() && !delivery.isCanceled()
    )

    if (!isEmpty(neighborhood)) {
      neighborhood = String(neighborhood).trim().toLowerCase()

      filteredDeliveries = filteredDeliveries.filter(
        delivery =>
          delivery.address.neighborhood.trim().toLowerCase() === neighborhood
      )
    }

    return filteredDeliveries
  }
}

export { ListDeliveriesToBeMadeByTheUserUseCase }
