import { UniqueEntityId } from '@core/domain'
import { Address } from '@domain/Address'
import { CEP } from '@domain/CEP'
import { Delivery } from '@domain/Delivery'
import { DeliveryRecipientName } from '@domain/DeliveryRecipientName'
import { ProductName } from '@domain/ProductName'
import { Delivery as TypeOrmDeliveryModel } from '../models/Delivery'

class DeliveryMapper {
  static toDomain(model: TypeOrmDeliveryModel): Delivery {
    return Delivery.create(
      {
        deliveryManId: new UniqueEntityId(model.deliveryManIn),
        productName: ProductName.create({ value: model.productName }),
        recipientName: DeliveryRecipientName.create({
          value: model.recipientName
        }),
        address: Address.create({
          address: model.address,
          city: model.city,
          neighborhood: model.neighborhood,
          number: model.number,
          postalCode: CEP.create({ value: model.postalCode }),
          state: model.state,
          complement: model.complement
        }),
        signatureImage: model.signatureImage,
        canceledAt: model.canceledAt,
        endDate: model.endDate,
        startDate: model.startDate
      },
      new UniqueEntityId(model.id)
    )
  }

  static toRepository(delivery: Delivery): any {
    return {
      id: delivery.id.value,
      deliveryManIn: delivery.deliveryManId.value,
      recipientName: delivery.recipientName.value,
      productName: delivery.productName.value,
      address: delivery.address.address,
      city: delivery.address.city,
      complement: delivery.address.complement,
      neighborhood: delivery.address.neighborhood,
      number: delivery.address.number,
      postalCode: delivery.address.postalCode.value,
      state: delivery.address.state,
      startDate: delivery.startDate,
      endDate: delivery.endDate,
      canceledAt: delivery.canceledAt,
      signatureImage: delivery.signatureImage
    }
  }
}

export { DeliveryMapper }
