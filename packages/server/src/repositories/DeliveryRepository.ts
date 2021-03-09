import { UniqueEntityId } from '../core/domain/UniqueEntityId'
import { Delivery } from '../domain/Delivery'

interface DeliveryRepository {
  findById(deliveryId: UniqueEntityId): Promise<Delivery | null>
  findByUserIdAndDate(userId: UniqueEntityId, date: Date): Promise<Delivery[]>
  save(delivery: Delivery): Promise<void>
  listDeliveriesToBeMadeByUserId(
    deliveryManId: UniqueEntityId,
    neighborhood?: string
  ): Promise<Delivery[]>
  listDeliveriesAlreadyMadeByUserId(
    deliveryManId: UniqueEntityId,
    neighborhood?: string
  ): Promise<Delivery[]>
  deleteById(deliveryId: UniqueEntityId): Promise<void>
}

export { DeliveryRepository }
