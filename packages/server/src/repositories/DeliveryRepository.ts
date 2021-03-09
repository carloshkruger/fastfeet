import { Delivery } from '../domain/Delivery'

interface DeliveryRepository {
  save(delivery: Delivery): Promise<void>
}

export { DeliveryRepository }
