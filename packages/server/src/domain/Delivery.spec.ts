import { UniqueEntityId } from '../core/domain/UniqueEntityId'
import { Address } from './Address'
import { CEP } from './CEP'
import { Delivery } from './Delivery'
import { ProductName } from './ProductName'

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
