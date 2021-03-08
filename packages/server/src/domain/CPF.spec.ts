import { CPF } from './CPF'
import { InvalidCPFError } from './errors/InvalidCPFError'

describe('CPF validation', () => {
  it('should not create a CPF instance with invalid value (incorrect number length)', () => {
    const incorrectCPF = '999.999.999'
    expect(() => CPF.create({ value: incorrectCPF })).toThrow(InvalidCPFError)
  })

  it('should not create a CPF instance with invalid value (with letters)', () => {
    const incorrectCPF = '999.999.999-aa'
    expect(() => CPF.create({ value: incorrectCPF })).toThrow(InvalidCPFError)
  })

  it('should not create a CPF instance with invalid value (with blank string)', () => {
    const incorrectCPF = ''
    expect(() => CPF.create({ value: incorrectCPF })).toThrow(InvalidCPFError)
  })

  it('should create a CPF instance with valid value', () => {
    const validCPFWithNonNumericCharacters = '397.824.490-08'
    expect(
      CPF.create({ value: validCPFWithNonNumericCharacters })
    ).toBeInstanceOf(CPF)

    const validCPFWithOnlyNumbers = '39782449008'
    expect(CPF.create({ value: validCPFWithOnlyNumbers })).toBeInstanceOf(CPF)
  })
})
