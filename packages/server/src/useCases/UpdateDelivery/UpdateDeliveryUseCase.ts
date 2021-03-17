import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { UseCase } from '@core/domain/UseCase'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { isEmpty } from '@shared/utils/String'
import { Address } from '@domain/Address'
import { CEP } from '@domain/CEP'
import { ProductName } from '@domain/ProductName'
import { AppError } from '@core/errors/AppError'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { UpdateDeliveryRequest } from './UpdateDeliveryRequest'
import { UpdateDeliveryErrors } from './UpdateDeliveryErrors'
import { DeliveryRecipientName } from '@domain/DeliveryRecipientName'
import { NotFoundError } from '@core/errors'

class UpdateDeliveryUseCase implements UseCase<UpdateDeliveryRequest, void> {
  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository
  ) {}

  async execute({
    deliveryId,
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
  }: UpdateDeliveryRequest): Promise<void> {
    if (isEmpty(deliveryId)) {
      throw new FieldRequiredError('Delivery id')
    }

    if (isEmpty(deliveryManId)) {
      throw new FieldRequiredError('Delivery man id')
    }

    const delivery = await this.deliveryRepository.findById(
      new UniqueEntityId(deliveryId)
    )

    if (!delivery) {
      throw new NotFoundError('Delivery not found.')
    }

    const user = await this.userRepository.findById(deliveryManId)

    if (!user) {
      throw new NotFoundError('Delivery man not found.')
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
    delivery.setRecipientName(
      DeliveryRecipientName.create({ value: recipientName })
    )
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
