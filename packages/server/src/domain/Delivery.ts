import { Entity } from '../core/domain/Entity'
import { UniqueEntityId } from '../core/domain/UniqueEntityId'
import { Address } from './Address'
import { ProductName } from './ProductName'

interface DeliveryProps {
  deliveryManId: UniqueEntityId
  productName: ProductName
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
    return new Delivery(props, id)
  }

  public isFinished(): boolean {
    return !!this.endDate
  }

  public isCanceled(): boolean {
    return !!this.canceledAt
  }

  public isInitialized(): boolean {
    return !!this.props.startDate
  }

  public defineStartDateAsNow(): void {
    this.props.startDate = new Date()
  }

  public defineEndDateAsNow(): void {
    this.props.endDate = new Date()
  }

  public setDeliveryManId(deliveryManId: UniqueEntityId): void {
    this.props.deliveryManId = deliveryManId
  }

  public setProductName(productName: ProductName): void {
    this.props.productName = productName
  }

  public setAddress(address: Address): void {
    this.props.address = address
  }

  public setSignatureImage(signatureImage: string): void {
    this.props.signatureImage = signatureImage
  }

  get deliveryManId(): UniqueEntityId {
    return this.props.deliveryManId
  }

  get productName(): ProductName {
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
