import { UseCase } from '@core/domain'
import { FieldRequiredError } from '@core/errors'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { isEmpty } from '@shared/utils/String'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredRequest } from './FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredRequest'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredResponse } from './FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredResponse'

class FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase
  implements
    UseCase<
      FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredRequest,
      FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredResponse
    > {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    userId,
    neighborhood
  }: FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredRequest): Promise<FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredResponse> {
    if (isEmpty(userId)) {
      throw new FieldRequiredError('User id')
    }

    const neighborhoods = await this.deliveryRepository.findAllNeighborhoodsLinkedToDeliveryMan(
      {
        deliveryManId: userId,
        neighborhood
      }
    )

    return {
      neighborhoods
    }
  }
}

export { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase }
