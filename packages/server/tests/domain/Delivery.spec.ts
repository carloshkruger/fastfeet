import { UniqueEntityId } from '@core/domain'
import { Address } from '@domain/Address'
import { CEP } from '@domain/CEP'
import { Delivery } from '@domain/Delivery'
import { DeliveryRecipientName } from '@domain/DeliveryRecipientName'
import { ProductName } from '@domain/ProductName'

const validAddress = Address.create({
  address: 'valid address',
  number: 9999,
  neighborhood: 'valid neighborhood',
  postalCode: CEP.create({ value: '89186-000' }),
  city: 'valid city',
  state: 'SC'
})

describe('Delivery validation', () => {
  it('should create a Delivery instance with valid values', () => {
    const delivery = Delivery.create({
      deliveryManId: new UniqueEntityId(),
      address: validAddress,
      recipientName: DeliveryRecipientName.create({
        value: 'valid recipient name'
      }),
      productName: ProductName.create({ value: 'valid product name' })
    })

    expect(delivery).toBeInstanceOf(Delivery)
    expect(delivery.productName).toBeInstanceOf(ProductName)
    expect(delivery.address).toBeInstanceOf(Address)
    expect(delivery.startDate).toBeFalsy()
    expect(delivery.endDate).toBeFalsy()
    expect(delivery.canceledAt).toBeFalsy()
  })

  it('should return correct values on getStatusDescription method', () => {
    const delivery = Delivery.create({
      deliveryManId: new UniqueEntityId(),
      address: validAddress,
      recipientName: DeliveryRecipientName.create({
        value: 'valid recipient name'
      }),
      productName: ProductName.create({ value: 'valid product name' })
    })

    expect(delivery.getStatusDescription()).toBe('Aguardando')

    const delivery2 = Delivery.create({
      deliveryManId: new UniqueEntityId(),
      address: validAddress,
      recipientName: DeliveryRecipientName.create({
        value: 'valid recipient name'
      }),
      productName: ProductName.create({ value: 'valid product name' })
    })
    delivery2.defineStartDateAsNow()

    expect(delivery2.getStatusDescription()).toBe('Inicializado')

    const delivery3 = Delivery.create({
      deliveryManId: new UniqueEntityId(),
      address: validAddress,
      recipientName: DeliveryRecipientName.create({
        value: 'valid recipient name'
      }),
      productName: ProductName.create({ value: 'valid product name' })
    })
    delivery3.defineStartDateAsNow()
    delivery3.defineEndDateAsNow()

    expect(delivery3.getStatusDescription()).toBe('Finalizado')

    const delivery4 = Delivery.create({
      deliveryManId: new UniqueEntityId(),
      address: validAddress,
      recipientName: DeliveryRecipientName.create({
        value: 'valid recipient name'
      }),
      productName: ProductName.create({ value: 'valid product name' })
    })
    delivery4.defineCanceledAtAsNow()

    expect(delivery4.getStatusDescription()).toBe('Cancelado')
  })
})
