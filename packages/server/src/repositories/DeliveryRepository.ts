import { UniqueEntityId } from '../core/domain/UniqueEntityId'
import { Delivery } from '../domain/Delivery'

interface FindAllNeighborhoodsLinkedToDeliveryManProps {
  deliveryManId: string
  neighborhood: string
}

interface DeliveryRepository {
  findById(deliveryId: UniqueEntityId): Promise<Delivery | undefined>
  findByUserIdAndStartDeliveryDate(
    userId: UniqueEntityId,
    startDeliveryDate: Date
  ): Promise<Delivery[]>
  save(delivery: Delivery): Promise<void>
  listDeliveriesToBeMadeByUserId(
    deliveryManId: UniqueEntityId,
    neighborhood?: string
  ): Promise<Delivery[]>
  listDeliveriesAlreadyMadeByUserId(
    deliveryManId: UniqueEntityId,
    neighborhood?: string
  ): Promise<Delivery[]>
  findAllNeighborhoodsLinkedToDeliveryMan(
    props: FindAllNeighborhoodsLinkedToDeliveryManProps
  ): Promise<string[]>
  deleteById(deliveryId: UniqueEntityId): Promise<void>
}

export { DeliveryRepository, FindAllNeighborhoodsLinkedToDeliveryManProps }
