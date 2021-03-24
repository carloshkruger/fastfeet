import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { UseCase } from '@core/domain/UseCase'
import { NotFoundError } from '@core/errors'
import { Address } from '@domain/Address'
import { CEP } from '@domain/CEP'
import { Delivery } from '@domain/Delivery'
import { DeliveryRecipientName } from '@domain/DeliveryRecipientName'
import { ProductName } from '@domain/ProductName'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { CreateDeliveryRequest } from './CreateDeliveryRequest'
import { CreateDeliveryResponse } from './CreateDeliveryResponse'

class CreateDeliveryUseCase
  implements UseCase<CreateDeliveryRequest, CreateDeliveryResponse> {
  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository
  ) {}

  async execute({
    deliveryManId,
    recipientName,
    productName,
    address,
    postalCode,
    neighborhood,
    complement,
    number,
    city,
    state
  }: CreateDeliveryRequest): Promise<CreateDeliveryResponse> {
    const delivery = Delivery.create({
      deliveryManId: new UniqueEntityId(deliveryManId),
      recipientName: DeliveryRecipientName.create({ value: recipientName }),
      productName: ProductName.create({ value: productName }),
      address: Address.create({
        address,
        postalCode: CEP.create({ value: postalCode }),
        number,
        neighborhood,
        complement,
        city,
        state
      }),
      createdAt: new Date()
    })

    const deliveryMan = await this.userRepository.findById(deliveryManId)

    if (!deliveryMan) {
      throw new NotFoundError('Delivery man not found.')
    }

    await this.deliveryRepository.save(delivery)

    return {
      delivery
    }
  }
}

export { CreateDeliveryUseCase }
