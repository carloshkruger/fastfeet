import { UniqueEntityId } from '../core/domain/UniqueEntityId'
import { Address } from './Address'
import { CEP } from './CEP'
import { Delivery } from './Delivery'

const validAddress = Address.create({
  address: 'valid address',
  number: 9999,
  neighborhood: 'valid neighborhood',
  postalCode: CEP.create({ value: '89186-000' }),
  city: 'valid city',
  state: 'SC'
})

describe('Delivery validation', () => {
  it('should not create a Delivery instance with incorrect values (without product name info)', () => {
    expect(() =>
      Delivery.create({
        deliveryManId: new UniqueEntityId(),
        address: validAddress,
        productName: ''
      })
    ).toThrow()
  })

  it('should create a Delivery instance with valid values', () => {
    expect(
      Delivery.create({
        deliveryManId: new UniqueEntityId(),
        address: validAddress,
        productName: 'valid product name'
      })
    ).toBeInstanceOf(Delivery)
  })
})
