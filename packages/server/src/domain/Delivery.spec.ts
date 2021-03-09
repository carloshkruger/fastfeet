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
    expect(
      Delivery.create({
        deliveryManId: new UniqueEntityId(),
        address: validAddress,
        productName: ProductName.create({ value: 'valid product name' })
      })
    ).toBeInstanceOf(Delivery)
  })
})
