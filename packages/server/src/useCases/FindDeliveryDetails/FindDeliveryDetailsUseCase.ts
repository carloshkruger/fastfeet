import { UniqueEntityId, UseCase } from '@core/domain'
import { FieldRequiredError, NotFoundError } from '@core/errors'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { isEmpty } from '@shared/utils/String'
import { FindDeliveryDetailsRequest } from './FindDeliveryDetailsRequest'
import { FindDeliveryDetailsResponse } from './FindDeliveryDetailsResponse'

class FindDeliveryDetailsUseCase
  implements UseCase<FindDeliveryDetailsRequest, FindDeliveryDetailsResponse> {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId
  }: FindDeliveryDetailsRequest): Promise<FindDeliveryDetailsResponse> {
    if (isEmpty(deliveryId)) {
      throw new FieldRequiredError('Delivery id')
    }

    const delivery = await this.deliveryRepository.findById(
      new UniqueEntityId(deliveryId)
    )

    if (!delivery) {
      throw new NotFoundError('Delivery not found.')
    }

    return {
      delivery
    }
  }
}

export { FindDeliveryDetailsUseCase }
