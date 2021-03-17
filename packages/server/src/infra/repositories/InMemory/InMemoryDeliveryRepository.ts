import { UniqueEntityId } from '../../../core/domain/UniqueEntityId'
import { Delivery } from '../../../domain/Delivery'
import { DeliveryRepository } from '../../../repositories/DeliveryRepository'
import { isEmpty } from '../../../shared/utils/String'

class InMemoryDeliveryRepository implements DeliveryRepository {
  private data: Delivery[] = []

  async findById(deliveryId: UniqueEntityId): Promise<Delivery | undefined> {
    return this.data.find(delivery => delivery.id.value === deliveryId.value)
  }

  async findByUserIdAndStartDeliveryDate(
    userId: UniqueEntityId,
    startDeliveryDate: Date
  ): Promise<Delivery[]> {
    return this.data.filter(
      delivery =>
        delivery.deliveryManId.value === userId.value &&
        delivery.startDate &&
        delivery.startDate.getDate() === startDeliveryDate.getDate() &&
        delivery.startDate.getMonth() === startDeliveryDate.getMonth() &&
        delivery.startDate.getFullYear() === startDeliveryDate.getFullYear()
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

    if (neighborhood) {
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

  async deleteById(deliveryId: UniqueEntityId): Promise<void> {
    this.data = this.data.filter(
      delivery => delivery.id.value !== deliveryId.value
    )
  }
}

export { InMemoryDeliveryRepository }
