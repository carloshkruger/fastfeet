import { Entity } from '../core/domain/Entity'
import { UniqueEntityId } from '../core/domain/UniqueEntityId'
import { isEmpty } from '../shared/utils/String'
import { Address } from './Address'

interface DeliveryProps {
  deliveryManId: UniqueEntityId
  productName: string
  address: Address
  signatureImage?: string
  canceledAt?: Date
  startDate?: Date
  endDate?: Date
}

class Delivery extends Entity<DeliveryProps> {
  private constructor(props: DeliveryProps, id?: UniqueEntityId) {
    super(props, id)
  }

  public static create(props: DeliveryProps, id?: UniqueEntityId): Delivery {
    if (isEmpty(props.productName)) {
      throw new Error('Product name is required.')
    }

    return new Delivery(props, id)
  }
}

export { Delivery }