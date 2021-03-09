import { UniqueEntityId } from '../../core/domain/UniqueEntityId'
import { UseCase } from '../../core/domain/UseCase'
import { DeliveryRepository } from '../../repositories/DeliveryRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { isEmpty } from '../../shared/utils/String'
import { FinalizeDeliveryErrors } from './FinalizeDeliveryErrors'
import { FinalizeDeliveryRequest } from './FinalizeDeliveryRequest'

class FinalizeDeliveryUseCase
  implements UseCase<FinalizeDeliveryRequest, void> {
  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository
  ) {}

  async execute({
    deliveryManId,
    deliveryId
  }: FinalizeDeliveryRequest): Promise<void> {
    if (isEmpty(deliveryManId)) {
      throw new Error('Delivery man id not provided.')
    }

    if (isEmpty(deliveryId)) {
      throw new Error('Delivery id not provided.')
    }

    const deliveryMan = await this.userRepository.findById(deliveryManId)

    if (!deliveryMan) {
      throw new Error('Delivery man was not found.')
    }

    const delivery = await this.deliveryRepository.findById(
      new UniqueEntityId(deliveryId)
    )

    if (!delivery) {
      throw new Error('Delivery not found.')
    }

    if (delivery.deliveryManId.value !== deliveryMan.id.value) {
      throw new FinalizeDeliveryErrors.DeliveryNotLinkedToUser()
    }

    if (!delivery.isInitialized()) {
      throw new FinalizeDeliveryErrors.DeliveryNotInitialized()
    }

    delivery.defineEndDateAsNow()

    await this.deliveryRepository.save(delivery)
  }
}

export { FinalizeDeliveryUseCase }
