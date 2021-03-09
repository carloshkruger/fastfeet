import { UniqueEntityId } from '../../core/domain/UniqueEntityId'
import { UseCase } from '../../core/domain/UseCase'
import { Address } from '../../domain/Address'
import { CEP } from '../../domain/CEP'
import { Delivery } from '../../domain/Delivery'
import { DeliveryRepository } from '../../repositories/DeliveryRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { CreateDeliveryRequest } from './CreateDeliveryRequest'

class CreateDeliveryUseCase
  implements UseCase<CreateDeliveryRequest, Delivery> {
  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository
  ) {}

  async execute({
    deliveryManId,
    productName,
    address,
    postalCode,
    neighborhood,
    complement,
    number,
    city,
    state
  }: CreateDeliveryRequest): Promise<Delivery> {
    const delivery = Delivery.create({
      deliveryManId: new UniqueEntityId(deliveryManId),
      productName,
      address: Address.create({
        address,
        postalCode: CEP.create({ value: postalCode }),
        number,
        neighborhood,
        complement,
        city,
        state
      })
    })

    const deliveryMan = await this.userRepository.findById(deliveryManId)

    if (!deliveryMan) {
      throw new Error('Delivery man not found.')
    }

    await this.deliveryRepository.save(delivery)

    return delivery
  }
}

export { CreateDeliveryUseCase }