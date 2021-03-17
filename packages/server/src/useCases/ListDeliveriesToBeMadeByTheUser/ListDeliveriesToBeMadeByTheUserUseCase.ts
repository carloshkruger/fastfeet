import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { UseCase } from '@core/domain/UseCase'
import { NotFoundError } from '@core/errors'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { isEmpty } from '@shared/utils/String'
import { ListDeliveriesToBeMadeByTheUserRequest } from './ListDeliveriesToBeMadeByTheUserRequest'
import { ListDeliveriesToBeMadeByTheUserResponse } from './ListDeliveriesToBeMadeByTheUserResponse'

class ListDeliveriesToBeMadeByTheUserUseCase
  implements
    UseCase<
      ListDeliveriesToBeMadeByTheUserRequest,
      ListDeliveriesToBeMadeByTheUserResponse
    > {
  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository
  ) {}

  async execute({
    deliveryManId,
    neighborhood
  }: ListDeliveriesToBeMadeByTheUserRequest): Promise<ListDeliveriesToBeMadeByTheUserResponse> {
    if (!deliveryManId) {
      throw new FieldRequiredError('Delivery man id')
    }

    const deliveryMan = await this.userRepository.findById(deliveryManId)

    if (!deliveryMan) {
      throw new NotFoundError('Delivery man not found')
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

    return {
      deliveries: filteredDeliveries
    }
  }
}

export { ListDeliveriesToBeMadeByTheUserUseCase }
