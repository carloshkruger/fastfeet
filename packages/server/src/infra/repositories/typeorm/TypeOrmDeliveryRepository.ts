import { getRepository, ILike, IsNull, Not, Repository } from 'typeorm'

import { Delivery as TypeOrmDeliveryModel } from '@infra/typeorm/models/Delivery'

import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UniqueEntityId } from '@core/domain'
import { Delivery } from '@domain/Delivery'
import { DeliveryMapper } from '@infra/typeorm/mappers/DeliveryMapper'

class TypeOrmDeliveryRepository implements DeliveryRepository {
  private repository: Repository<TypeOrmDeliveryModel>

  private getRepository(): Repository<TypeOrmDeliveryModel> {
    if (!this.repository) {
      this.repository = getRepository(TypeOrmDeliveryModel)
    }

    return this.repository
  }

  async findById(deliveryId: UniqueEntityId): Promise<Delivery | undefined> {
    const model = await this.getRepository().findOne({
      where: {
        id: deliveryId.value
      }
    })

    if (!model) {
      return undefined
    }

    return DeliveryMapper.toDomain(model)
  }

  async findByUserIdAndDate(
    userId: UniqueEntityId,
    date: Date
  ): Promise<Delivery[]> {
    const models = await this.getRepository().find({
      where: {
        deliveryManId: userId.value,
        startDate: date
      }
    })

    return models.map(model => DeliveryMapper.toDomain(model))
  }

  async save(delivery: Delivery): Promise<void> {
    const model = this.getRepository().create(
      DeliveryMapper.toRepository(delivery)
    )

    await this.getRepository().save(model)
  }

  async listDeliveriesToBeMadeByUserId(
    deliveryManId: UniqueEntityId,
    neighborhood?: string
  ): Promise<Delivery[]> {
    let whereOptions = {
      deliveryManId: deliveryManId.value,
      canceledAt: IsNull(),
      startDate: IsNull()
    }

    if (!!neighborhood) {
      ;(whereOptions as any).neighborhood = ILike(`%${neighborhood}%`)
    }

    const models = await this.getRepository().find({
      where: whereOptions
    })

    return models.map(model => DeliveryMapper.toDomain(model))
  }

  async listDeliveriesAlreadyMadeByUserId(
    deliveryManId: UniqueEntityId,
    neighborhood?: string
  ): Promise<Delivery[]> {
    let whereOptions = {
      deliveryManId: deliveryManId.value,
      endDate: Not(IsNull())
    }

    if (!!neighborhood) {
      ;(whereOptions as any).neighborhood = ILike(`%${neighborhood}%`)
    }

    const models = await this.getRepository().find({
      where: whereOptions
    })

    return models.map(model => DeliveryMapper.toDomain(model))
  }

  async deleteById(deliveryId: UniqueEntityId): Promise<void> {
    await this.getRepository().delete({
      id: deliveryId.value
    })
  }
}

export { TypeOrmDeliveryRepository }
