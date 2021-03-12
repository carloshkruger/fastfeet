import { UniqueEntityId } from '@core/domain'
import { Address } from '@domain/Address'
import { CEP } from '@domain/CEP'
import { Delivery } from '@domain/Delivery'
import { DeliveryRecipientName } from '@domain/DeliveryRecipientName'
import { ProductName } from '@domain/ProductName'

class DeliveryTestFactory {
  static create(): Delivery {
    return Delivery.create({
      deliveryManId: new UniqueEntityId(),
      recipientName: DeliveryRecipientName.create({
        value: 'valid recipient name'
      }),
      productName: ProductName.create({ value: 'valid product name' }),
      address: Address.create({
        address: 'valid address',
        postalCode: CEP.create({ value: '89186000' }),
        number: 9999,
        neighborhood: 'valid neighborhood',
        city: 'valid city',
        state: 'valid state'
      })
    })
  }
}

export { DeliveryTestFactory }
