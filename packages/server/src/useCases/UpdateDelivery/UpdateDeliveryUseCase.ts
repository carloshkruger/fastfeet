import { UniqueEntityId } from '../../core/domain/UniqueEntityId'
import { UseCase } from '../../core/domain/UseCase'
import { DeliveryRepository } from '../../repositories/DeliveryRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { isEmpty } from '../../shared/utils/String'
import { UpdateDeliveryRequest } from './UpdateDeliveryRequest'
import { Address } from '../../domain/Address'
import { CEP } from '../../domain/CEP'
import { UpdateDeliveryErrors } from './UpdateDeliveryErrors'
import { ProductName } from '../../domain/ProductName'

class UpdateDeliveryUseCase implements UseCase<UpdateDeliveryRequest, void> {
  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository
  ) {}

  async execute({
    deliveryId,
    deliveryManId,
    productName,
    address,
    postalCode,
    neighborhood,
    complement,
    number,
    city,
    state
  }: UpdateDeliveryRequest): Promise<void> {
    if (isEmpty(deliveryId)) {
      throw new Error('Delivery id is required.')
    }

    if (isEmpty(deliveryManId)) {
      throw new Error('Delivery id is required.')
    }

    const delivery = await this.deliveryRepository.findById(
      new UniqueEntityId(deliveryId)
    )

    if (!delivery) {
      throw new Error('Delivery not found.')
    }

    const user = await this.userRepository.findById(deliveryManId)

    if (!user) {
      throw new Error('Delivery man not found.')
    }

    if (delivery.isFinished()) {
      throw new UpdateDeliveryErrors.DeliveryAlreadyFinished()
    }

    if (delivery.isInitialized()) {
      throw new UpdateDeliveryErrors.DeliveryAlreadyInitialized()
    }

    if (delivery.isCanceled()) {
      throw new UpdateDeliveryErrors.DeliveryCanceled()
    }

    delivery.setDeliveryManId(new UniqueEntityId(deliveryManId))
    delivery.setProductName(ProductName.create({ value: productName }))
    delivery.setAddress(
      Address.create({
        address,
        city,
        neighborhood,
        number,
        postalCode: CEP.create({ value: postalCode }),
        state,
        complement
      })
    )

    await this.deliveryRepository.save(delivery)
  }
}

export { UpdateDeliveryUseCase }
