import { Delivery } from '../../../domain/Delivery'
import { DeliveryRepository } from '../../../repositories/DeliveryRepository'

class InMemoryDeliveryRepository implements DeliveryRepository {
  private data: Delivery[] = []

  async save(delivery: Delivery): Promise<void> {
    this.data.push(delivery)
  }
}

export { InMemoryDeliveryRepository }
