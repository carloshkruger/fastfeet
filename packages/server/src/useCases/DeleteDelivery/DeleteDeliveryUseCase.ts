import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { UseCase } from '@core/domain/UseCase'
import { NotFoundError } from '@core/errors'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { isEmpty } from '@shared/utils/String'
import { DeleteDeliveryRequest } from './DeleteDeliveryRequest'

class DeleteDeliveryUseCase implements UseCase<DeleteDeliveryRequest, void> {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({ deliveryId }: DeleteDeliveryRequest): Promise<void> {
    if (isEmpty(deliveryId)) {
      throw new FieldRequiredError('Delivery id')
    }

    const entityId = new UniqueEntityId(deliveryId)

    const delivery = await this.deliveryRepository.findById(entityId)

    if (!delivery) {
      throw new NotFoundError('Delivery not found.')
    }

    await this.deliveryRepository.deleteById(entityId)
  }
}

export { DeleteDeliveryUseCase }
