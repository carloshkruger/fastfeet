import { UniqueEntityId } from '../../../core/domain/UniqueEntityId'
import { Delivery } from '../../../domain/Delivery'
import { DeliveryRepository } from '../../../repositories/DeliveryRepository'

class InMemoryDeliveryRepository implements DeliveryRepository {
  private data: Delivery[] = []

  async save(delivery: Delivery): Promise<void> {
    this.data.push(delivery)
  }

  async listDeliveriesToBeMadeByUserId(
    deliveryManId: UniqueEntityId
  ): Promise<Delivery[]> {
    const deliveries = this.data
      .filter(delivery => delivery.deliveryManId.value === deliveryManId.value)
      .filter(delivery => !delivery.isCanceled() && !delivery.isFinished())

    return deliveries
  }
}

export { InMemoryDeliveryRepository }
