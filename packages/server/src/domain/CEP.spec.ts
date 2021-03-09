import { CEP } from './CEP'
import { InvalidCEPError } from './errors/InvalidCEPError'

describe('CEP validation', () => {
  it('should not create a CEP instance with invalid values (less characters than needed)', () => {
    expect(() => CEP.create({ value: '123' })).toThrow(InvalidCEPError)
  })

  it('should not create a CEP instance with invalid values (more characters than allowed)', () => {
    expect(() => CEP.create({ value: '123456789123456789' })).toThrow(
      InvalidCEPError
    )
  })

  it('should not create a CEP instance with invalid values (with letters)', () => {
    expect(() => CEP.create({ value: '89186-aaa' })).toThrow(InvalidCEPError)
  })

  it('should not create a CEP instance with invalid values (with empty string)', () => {
    expect(() => CEP.create({ value: '' })).toThrow(InvalidCEPError)
  })

  it('should create a CEP instance with valid values', () => {
    expect(CEP.create({ value: '89186-000' })).toBeInstanceOf(CEP)
  })
})
