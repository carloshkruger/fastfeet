import { UniqueEntityId } from '@core/domain'
import { Address } from '@domain/Address'
import { CEP } from '@domain/CEP'
import { Delivery } from '@domain/Delivery'
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
      productName: ProductName.create({ value: 'valid product name' })
    })

    expect(delivery).toBeInstanceOf(Delivery)
    expect(delivery.productName).toBeInstanceOf(ProductName)
    expect(delivery.address).toBeInstanceOf(Address)
    expect(delivery.startDate).toBeFalsy()
    expect(delivery.endDate).toBeFalsy()
    expect(delivery.canceledAt).toBeFalsy()
  })
})
