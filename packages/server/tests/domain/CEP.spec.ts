import { FieldRequiredError } from '@core/errors'
import { CEP } from '@domain/CEP'
import { InvalidCEPError } from '@domain/errors/InvalidCEPError'

describe('CEP validation', () => {
  it('should not create a CEP instance with invalid values (less characters than needed)', () => {
    const cep = '123'
    expect(() => CEP.create({ value: cep })).toThrow(new InvalidCEPError(cep))
  })

  it('should not create a CEP instance with invalid values (more characters than allowed)', () => {
    const cep = '123456789123456789'
    expect(() => CEP.create({ value: cep })).toThrow(new InvalidCEPError(cep))
  })

  it('should not create a CEP instance with invalid values (with letters)', () => {
    const cep = '89186-aaa'
    expect(() => CEP.create({ value: cep })).toThrow(new InvalidCEPError(cep))
  })

  it('should not create a CEP instance with invalid values (with empty string)', () => {
    const cep = ''
    expect(() => CEP.create({ value: cep })).toThrow(
      new FieldRequiredError('CEP')
    )
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
