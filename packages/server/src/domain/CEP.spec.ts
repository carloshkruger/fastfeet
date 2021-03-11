import { FieldRequiredError } from '../core/errors/FieldRequiredError'
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
    expect(() => CEP.create({ value: '' })).toThrow(FieldRequiredError)
  })

  it('should create a CEP instance with valid values and save the value with numbers only', () => {
    const cep = CEP.create({ value: '89186-000' })
    expect(cep).toBeInstanceOf(CEP)
    expect(cep.value).toBe('89186000')
  })

  it('should create a CEP instance with valid values and be possible to return a formatting value', () => {
    const cep = CEP.create({ value: '89186000' })
    expect(cep).toBeInstanceOf(CEP)
    expect(cep.getFormattedCEP()).toBe('89186-000')
  })
})
