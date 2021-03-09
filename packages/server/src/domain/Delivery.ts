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

  public isFinished(): boolean {
    return !!this.endDate
  }

  public isCanceled(): boolean {
    return !!this.canceledAt
  }

  public defineStartDateAsNow(): void {
    this.props.startDate = new Date()
  }

  get deliveryManId(): UniqueEntityId {
    return this.props.deliveryManId
  }

  get productName(): string {
    return this.props.productName
  }

  get address(): Address {
    return this.props.address
  }

  get signatureImage(): string | undefined {
    return this.props.signatureImage
  }

  get canceledAt(): Date | undefined {
    return this.props.canceledAt
  }

  get startDate(): Date | undefined {
    return this.props.startDate
  }

  get endDate(): Date | undefined {
    return this.props.endDate
  }
}

export { Delivery }
