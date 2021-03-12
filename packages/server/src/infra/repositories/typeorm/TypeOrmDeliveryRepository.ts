import { getRepository, ILike, IsNull, Not } from 'typeorm'

import { Delivery as TypeOrmDeliveryModel } from '@infra/typeorm/models/Delivery'

import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UniqueEntityId } from '@core/domain'
import { Delivery } from '@domain/Delivery'
import { ProductName } from '@domain/ProductName'
import { DeliveryRecipientName } from '@domain/DeliveryRecipientName'
import { Address } from '@domain/Address'
import { CEP } from '@domain/CEP'

class TypeOrmDeliveryRepository implements DeliveryRepository {
  private repository = getRepository(TypeOrmDeliveryModel)

  async findById(deliveryId: UniqueEntityId): Promise<Delivery | undefined> {
    const model = await this.repository.findOne({
      where: {
        id: deliveryId.value
      }
    })

    if (!model) {
      return undefined
    }

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

  async findByUserIdAndDate(
    userId: UniqueEntityId,
    date: Date
  ): Promise<Delivery[]> {
    const models = await this.repository.find({
      where: {
        deliveryManIn: userId.value,
        startDate: date
      }
    })

    return models.map(model =>
      Delivery.create(
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
    )
  }

  async save(delivery: Delivery): Promise<void> {
    const model = this.repository.create({
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
    })

    await this.repository.save(model)
  }

  async listDeliveriesToBeMadeByUserId(
    deliveryManId: UniqueEntityId,
    neighborhood?: string
  ): Promise<Delivery[]> {
    let whereOptions = {
      deliveryManIn: deliveryManId.value,
      canceledAt: IsNull(),
      startDate: IsNull()
    }

    if (!!neighborhood) {
      ;(whereOptions as any).neighborhood = ILike(`%${neighborhood}%`)
    }

    const models = await this.repository.find({
      where: whereOptions
    })

    return models.map(model =>
      Delivery.create(
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
    )
  }

  async listDeliveriesAlreadyMadeByUserId(
    deliveryManId: UniqueEntityId,
    neighborhood?: string
  ): Promise<Delivery[]> {
    let whereOptions = {
      deliveryManIn: deliveryManId.value,
      endDate: Not(IsNull())
    }

    if (!!neighborhood) {
      ;(whereOptions as any).neighborhood = ILike(`%${neighborhood}%`)
    }

    const models = await this.repository.find({
      where: whereOptions
    })

    return models.map(model =>
      Delivery.create(
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
    )
  }

  async deleteById(deliveryId: UniqueEntityId): Promise<void> {
    await this.repository.delete({
      id: deliveryId.value
    })
  }
}

export { TypeOrmDeliveryRepository }
