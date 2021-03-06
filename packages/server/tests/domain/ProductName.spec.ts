import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { ProductName } from '@domain/ProductName'

describe('ProductName validation', () => {
  it('should throw if empty value is provided', () => {
    expect(() => ProductName.create({ value: '' })).toThrow(
      new FieldRequiredError('Product name')
    )
  })

  it('should throw if blank string is provided', () => {
    expect(() => ProductName.create({ value: '   ' })).toThrow(
      new FieldRequiredError('Product name')
    )
  })

  it('should create an instance of ProductName if valid value is provided', () => {
    const validName = 'valid product name'

    const productName = ProductName.create({ value: validName })

    expect(productName).toBeInstanceOf(ProductName)
    expect(productName.value).toBe(validName)
  })
})
