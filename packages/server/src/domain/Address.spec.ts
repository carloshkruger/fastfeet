import { Address } from './Address'
import { CEP } from './CEP'

const validAddress = 'valid address'
const validNumber = 9999
const validNeighborhood = 'valid neighborhood'
const validPostalCode = CEP.create({ value: '89186-000' })
const validCity = 'valid city'
const validState = 'SC'

describe('Address validation', () => {
  it('should not create an Address instance with invalid values (without address info)', () => {
    expect(() =>
      Address.create({
        address: '',
        number: validNumber,
        neighborhood: validNeighborhood,
        postalCode: validPostalCode,
        city: validCity,
        state: validState
      })
    ).toThrow()
  })

  it('should not create an Address instance with invalid values (without number info)', () => {
    expect(() =>
      Address.create({
        address: validAddress,
        number: null,
        neighborhood: validNeighborhood,
        postalCode: validPostalCode,
        city: validCity,
        state: validState
      })
    ).toThrow()
  })

  it('should not create an Address instance with invalid values (without neighborhood info)', () => {
    expect(() =>
      Address.create({
        address: validAddress,
        number: validNumber,
        neighborhood: '',
        postalCode: validPostalCode,
        city: validCity,
        state: validState
      })
    ).toThrow()
  })

  it('should not create an Address instance with invalid values (without postalCode info)', () => {
    expect(() =>
      Address.create({
        address: validAddress,
        number: validNumber,
        neighborhood: validNeighborhood,
        postalCode: null,
        city: validCity,
        state: validState
      })
    ).toThrow()
  })

  it('should not create an Address instance with invalid values (without city info)', () => {
    expect(() =>
      Address.create({
        address: validAddress,
        number: validNumber,
        neighborhood: validNeighborhood,
        postalCode: validPostalCode,
        city: '',
        state: validState
      })
    ).toThrow()
  })

  it('should not create an Address instance with invalid values (without state info)', () => {
    expect(() =>
      Address.create({
        address: validAddress,
        number: validNumber,
        neighborhood: validNeighborhood,
        postalCode: validPostalCode,
        city: validCity,
        state: ''
      })
    ).toThrow()
  })

  it('should create an Address instance with valid values', () => {
    expect(
      Address.create({
        address: validAddress,
        number: validNumber,
        neighborhood: validNeighborhood,
        postalCode: validPostalCode,
        city: validCity,
        state: validState
      })
    ).toBeInstanceOf(Address)
  })
})
