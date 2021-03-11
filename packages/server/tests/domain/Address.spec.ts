import { FieldRequiredError } from '@core/errors'
import { Address } from '@domain/Address'
import { CEP } from '@domain/CEP'

const validAddress = 'valid address'
const validNumber = 9999
const validNeighborhood = 'valid neighborhood'
const validPostalCode = CEP.create({ value: '89186-000' })
const validCity = 'valid city'
const validState = 'SC'
const validComplement = 'valid complement'

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
    ).toThrow(new FieldRequiredError('Address').message)
  })

  it('should not create an Address instance with invalid values (without number info)', () => {
    expect(() =>
      Address.create({
        address: validAddress,
        number: 0,
        neighborhood: validNeighborhood,
        postalCode: validPostalCode,
        city: validCity,
        state: validState
      })
    ).toThrow(new FieldRequiredError('Number').message)
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
    ).toThrow(new FieldRequiredError('Neighborhood').message)
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
    ).toThrow(new FieldRequiredError('City').message)
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
    ).toThrow(new FieldRequiredError('State').message)
  })

  it('should create an Address instance with valid values', () => {
    const address = Address.create({
      address: validAddress,
      number: validNumber,
      neighborhood: validNeighborhood,
      postalCode: validPostalCode,
      city: validCity,
      state: validState,
      complement: validComplement
    })

    expect(address).toBeInstanceOf(Address)
    expect(address.address).toBe(validAddress)
    expect(address.number).toBe(validNumber)
    expect(address.neighborhood).toBe(validNeighborhood)
    expect(address.postalCode).toBeInstanceOf(CEP)
    expect(address.city).toBe(validCity)
    expect(address.state).toBe(validState)
    expect(address.complement).toBe(validComplement)
  })

  it('should return an empty complement string even if not informed on creation', () => {
    const address = Address.create({
      address: validAddress,
      number: validNumber,
      neighborhood: validNeighborhood,
      postalCode: validPostalCode,
      city: validCity,
      state: validState
    })

    expect(address.complement).toBe('')
  })
})
