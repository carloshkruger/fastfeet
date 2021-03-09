import { UniqueEntityId } from '../../../core/domain/UniqueEntityId'
import { Delivery } from '../../../domain/Delivery'
import { DeliveryRepository } from '../../../repositories/DeliveryRepository'
import { isEmpty } from '../../../shared/utils/String'

class InMemoryDeliveryRepository implements DeliveryRepository {
  private data: Delivery[] = []

  async findById(deliveryId: UniqueEntityId): Promise<Delivery | null> {
    return this.data.find(delivery => delivery.id.value === deliveryId.value)
  }

  async findByUserIdAndDate(
    userId: UniqueEntityId,
    date: Date
  ): Promise<Delivery[]> {
    return this.data.filter(
      delivery =>
        delivery.deliveryManId.value === userId.value &&
        delivery.startDate &&
        delivery.startDate.getDate() === date.getDate() &&
        delivery.startDate.getMonth() === date.getMonth() &&
        delivery.startDate.getFullYear() === date.getFullYear()
    )
  }

  async save(delivery: Delivery): Promise<void> {
    this.data.push(delivery)
  }

  async listDeliveriesToBeMadeByUserId(
    deliveryManId: UniqueEntityId,
    neighborhood?: string
  ): Promise<Delivery[]> {
    let deliveries = this.data
      .filter(delivery => delivery.deliveryManId.value === deliveryManId.value)
      .filter(delivery => !delivery.isCanceled() && !delivery.isFinished())

    if (!isEmpty(neighborhood)) {
      deliveries = deliveries.filter(
        delivery =>
          delivery.address.neighborhood.trim().toLowerCase() ===
          neighborhood.trim().toLowerCase()
      )
    }

    return deliveries
  }

  async listDeliveriesAlreadyMadeByUserId(
    deliveryManId: UniqueEntityId
  ): Promise<Delivery[]> {
    const deliveries = this.data
      .filter(delivery => delivery.deliveryManId.value === deliveryManId.value)
      .filter(delivery => delivery.isFinished())

    return deliveries
  }
}

export { InMemoryDeliveryRepository }
