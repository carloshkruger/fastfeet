import { UniqueEntityId } from '../core/domain/UniqueEntityId'
import { Delivery } from '../domain/Delivery'

interface DeliveryRepository {
  save(delivery: Delivery): Promise<void>
  listDeliveriesToBeMadeByUserId(
    deliveryManId: UniqueEntityId
  ): Promise<Delivery[]>
}

export { DeliveryRepository }
